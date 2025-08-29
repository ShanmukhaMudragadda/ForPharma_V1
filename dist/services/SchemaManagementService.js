import { PrismaClient as SharedPrismaClient } from '../../generated/prisma-shared/index.js';
import { PrismaClient as TenantPrismaClient } from '../../generated/prisma-tenant/index.js';
import fs from 'fs/promises';
import path from 'path';
class SchemaManagementService {
    // Singleton instance
    static instance = null;
    // Instance properties
    sharedDb;
    tenantConnections;
    loadedMigrations = [];
    initialized = false;
    // Private constructor prevents direct instantiation
    constructor() {
        this.sharedDb = new SharedPrismaClient();
        this.tenantConnections = new Map();
        console.log("constructor called");
        console.log('🏗️ SchemaManagementService singleton instance created');
    }
    /**
     * Gets the singleton instance of SchemaManagementService
     * @returns The singleton instance
     */
    static getInstance() {
        console.log("getInstance called");
        if (!SchemaManagementService.instance) {
            SchemaManagementService.instance = new SchemaManagementService();
        }
        return SchemaManagementService.instance;
    }
    /**
     * Checks if the service has been initialized
     * @returns true if initialized, false otherwise
     */
    isInitialized() {
        return this.initialized;
    }
    /**
     * Initializes and loads all tenant migration files from the 'tenant-migrations' directory.
     * This should be called once when the application starts.
     */
    async initializeMigrations() {
        // Prevent multiple initializations
        if (this.initialized) {
            console.log('⚡ SchemaManagementService already initialized, skipping...');
            return;
        }
        console.log('📚 Loading tenant migration files...');
        const migrationsDir = path.join(process.cwd(), 'tenant-migrations');
        try {
            const migrationFiles = await fs.readdir(migrationsDir);
            // Filter and sort SQL migration files (e.g., V001_..., V002_...)
            const sortedMigrationFiles = migrationFiles
                .filter(file => file.endsWith('.sql'))
                .sort();
            this.loadedMigrations = await Promise.all(sortedMigrationFiles.map(async (file) => {
                const filePath = path.join(migrationsDir, file);
                const sqlContent = await fs.readFile(filePath, 'utf8');
                // In a real-world scenario, you'd generate a proper checksum of the content here
                const checksum = 'placeholder_checksum'; // Replace with actual checksum generation
                return {
                    name: file.replace('.sql', ''),
                    filePath,
                    sqlContent,
                    checksum
                };
            }));
            console.log(`✅ Loaded ${this.loadedMigrations.length} tenant migration files.`);
            this.initialized = true;
        }
        catch (error) {
            console.error('❌ Error loading tenant migration files:', error);
            throw new Error('Failed to initialize tenant migrations.');
        }
    }
    /**
     * Ensures the service is initialized before executing any operations
     * @throws Error if not initialized
     */
    async ensureInitialized() {
        if (!this.initialized) {
            await this.initializeMigrations();
        }
    }
    async createOrganizationSchema(organizationId, organizationName) {
        this.ensureInitialized();
        let schemaName = null;
        try {
            const timestamp = Date.now();
            schemaName = `org_${organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${timestamp}`;
            console.log(`Creating schema: ${schemaName}`);
            // 1. Create the schema
            await this.sharedDb.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
            // 2. Grant permissions
            const dbUser = process.env.DB_USER || 'postgres';
            await this.sharedDb.$executeRawUnsafe(`GRANT ALL ON SCHEMA "${schemaName}" TO "${dbUser}"`);
            // 3. Run migrations for the new schema
            // This will apply ALL loaded migrations as it's a new schema
            await this.applyRequiredMigrationsToSchema(schemaName);
            // 4. Verify schema was created properly
            const isValid = await this.verifySchemaCreation(schemaName);
            if (!isValid) {
                throw new Error('Schema creation verification failed');
            }
            // 5. Update organization record
            await this.sharedDb.organization.update({
                where: { id: organizationId },
                data: { schemaName: schemaName }
            });
            console.log(`✅ Schema ${schemaName} created successfully`);
            return schemaName;
        }
        catch (error) {
            console.error('❌ Error creating schema:', error);
            // Cleanup on error
            if (schemaName) {
                try {
                    await this.sharedDb.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
                    console.log(`🧹 Cleaned up failed schema ${schemaName}`);
                }
                catch (cleanupError) {
                    console.error('Failed to cleanup schema:', cleanupError);
                }
            }
            throw error;
        }
    }
    /**
     * Applies all required (unapplied) migrations to a single specified schema.
     * This is the core migration logic used by other functions.
     */
    async applyRequiredMigrationsToSchema(schemaName) {
        this.ensureInitialized();
        if (this.loadedMigrations.length === 0) {
            console.warn('⚠️ No tenant migration files loaded.');
            return;
        }
        const tenantDb = await this.getTenantClient(schemaName);
        try {
            console.log(`🔄 Running required migrations for schema ${schemaName}...`);
            // Ensure the migrations table exists
            await tenantDb.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "${schemaName}"."_prisma_migrations" (
          id                      VARCHAR(36) PRIMARY KEY,
          checksum                VARCHAR(64) NOT NULL,
          finished_at             TIMESTAMPTZ,
          migration_name          VARCHAR(255) NOT NULL,
          logs                    TEXT,
          rolled_back_at          TIMESTAMPTZ,
          started_at              TIMESTAMPTZ DEFAULT now() NOT NULL,
          applied_steps_count     INTEGER DEFAULT 0 NOT NULL
        );
      `);
            // Get list of applied migrations for this schema
            const appliedMigrationsResult = await tenantDb.$queryRawUnsafe(`
        SELECT migration_name FROM "${schemaName}"."_prisma_migrations" ORDER BY started_at ASC;
      `);
            const appliedMigrations = new Set(appliedMigrationsResult.map(row => row.migration_name));
            let totalStatementsApplied = 0;
            for (const migration of this.loadedMigrations) {
                if (appliedMigrations.has(migration.name)) {
                    console.log(`⏩ Skipping already applied migration: ${migration.name} for schema ${schemaName}`);
                    continue;
                }
                console.log(`🚀 Applying migration: ${migration.name} for schema ${schemaName}`);
                let tenantSql = migration.sqlContent
                    .replace(/public\./g, `"${schemaName}".`)
                    .replace(/CREATE TABLE/g, 'CREATE TABLE IF NOT EXISTS')
                    .replace(/CREATE INDEX/g, 'CREATE INDEX IF NOT EXISTS')
                    .replace(/CREATE UNIQUE INDEX/g, 'CREATE UNIQUE INDEX IF NOT EXISTS');
                // Split SQL statements carefully to handle DO blocks
                const statements = [];
                let currentStatement = '';
                const lines = tenantSql.split('\n');
                for (const line of lines) {
                    currentStatement += line + '\n';
                    if (line.trim().endsWith(';') && !currentStatement.includes('DO $') || (currentStatement.includes('DO $') && line.trim().endsWith('END $;'))) {
                        statements.push(currentStatement.trim());
                        currentStatement = '';
                    }
                }
                const filteredStatements = statements.filter(stmt => stmt.trim().length > 0);
                let migrationSuccessCount = 0;
                for (const statement of filteredStatements) {
                    if (statement.length > 1) {
                        try {
                            await tenantDb.$executeRawUnsafe(statement);
                            migrationSuccessCount++;
                        }
                        catch (error) {
                            if (error.message.includes('already exists') ||
                                error.message.includes('duplicate_object') ||
                                (error.meta && (error.meta.code === '42P07' || error.meta.code === '42710'))) {
                                console.warn(`Skipping existing object in ${migration.name}: ${statement.substring(0, 100).replace(/\n/g, ' ')}...`);
                            }
                            else {
                                console.error(`❌ Failed statement in ${migration.name}:`, statement.substring(0, 100) + '...');
                                throw error;
                            }
                        }
                    }
                }
                // Record this migration as applied
                const migrationId = `${migration.name}_${Date.now()}`;
                await tenantDb.$executeRawUnsafe(`
          INSERT INTO "${schemaName}"."_prisma_migrations"
          (id, checksum, finished_at, migration_name, applied_steps_count)
          VALUES ('${migrationId}', '${migration.checksum}', NOW(), '${migration.name}', ${migrationSuccessCount})
        `);
                totalStatementsApplied += migrationSuccessCount;
                console.log(`✅ Migration ${migration.name} completed for schema ${schemaName}`);
            }
            console.log(`✅ All required migrations completed for schema ${schemaName}. Total statements applied: ${totalStatementsApplied}`);
        }
        finally {
            await tenantDb.$disconnect();
            this.tenantConnections.delete(schemaName);
        }
    }
    /**
     * Applies all required (unapplied) migrations to all existing tenant schemas.
     * This function should be run as a separate script during deployment.
     */
    async applyMigrationsToAllExistingTenants() {
        this.ensureInitialized();
        console.log('Starting migration application for all existing tenants...');
        let successCount = 0;
        let failureCount = 0;
        try {
            const organizations = await this.sharedDb.organization.findMany({
                select: {
                    id: true,
                    name: true,
                    schemaName: true
                }
            });
            for (const org of organizations) {
                if (org.schemaName) {
                    console.log(`Processing schema for organization: ${org.name} (${org.id}) - Schema: ${org.schemaName}`);
                    try {
                        await this.applyRequiredMigrationsToSchema(org.schemaName);
                        console.log(`✅ Successfully applied migrations for schema: ${org.schemaName}`);
                        successCount++;
                    }
                    catch (error) {
                        console.error(`❌ Failed to apply migrations for schema: ${org.schemaName}`, error);
                        failureCount++;
                        // Continue processing other schemas even if one fails
                    }
                }
                else {
                    console.warn(`Organization ${org.name} (${org.id}) does not have a schemaName. Skipping.`);
                }
            }
            console.log(`Migration sweep complete. Successful: ${successCount}, Failed: ${failureCount}`);
        }
        catch (error) {
            console.error('Error during mass tenant migration:', error);
            throw error;
        }
        finally {
            // Ensure all connections are closed after the sweep
            await this.closeAllConnections();
        }
    }
    /**
     * Applies all required (unapplied) migrations to a specific list of tenant schemas.
     * @param schemaNames An array of schema names to apply migrations to.
     */
    async applyMigrationsToSpecificTenants(schemaNames) {
        this.ensureInitialized();
        console.log(`Starting migration application for specific tenants: ${schemaNames.join(', ')}...`);
        let successCount = 0;
        let failureCount = 0;
        try {
            for (const schemaName of schemaNames) {
                console.log(`Processing specified schema: ${schemaName}`);
                try {
                    await this.applyRequiredMigrationsToSchema(schemaName);
                    console.log(`✅ Successfully applied migrations for schema: ${schemaName}`);
                    successCount++;
                }
                catch (error) {
                    console.error(`❌ Failed to apply migrations for schema: ${schemaName}`, error);
                    failureCount++;
                    // Continue processing other schemas even if one fails
                }
            }
            console.log(`Specific tenant migration complete. Successful: ${successCount}, Failed: ${failureCount}`);
        }
        catch (error) {
            console.error('Error during specific tenant migration:', error);
            throw error;
        }
        finally {
            await this.closeAllConnections();
        }
    }
    async verifySchemaCreation(schemaName) {
        this.ensureInitialized();
        const tenantDb = await this.getTenantClient(schemaName);
        try {
            // Check if tables exist in the schema
            const result = await tenantDb.$queryRaw `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = ${schemaName}
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `;
            const tables = result.map(row => row.table_name);
            console.log(`📊 Tables created in schema ${schemaName}: ${tables.length} tables`);
            // Check for essential tables
            const essentialTables = ['employees', 'doctors', 'chemists', 'drugs'];
            const missingTables = essentialTables.filter(table => !tables.includes(table));
            if (missingTables.length > 0) {
                console.error(`❌ Missing essential tables: ${missingTables.join(', ')}`);
                return false;
            }
            // Check if we have enough tables (adjust this number based on your actual initial schema)
            if (tables.length < 30) {
                console.error(`❌ Only ${tables.length} tables found, expected at least 30`);
                return false;
            }
            console.log(`✅ Schema ${schemaName} verified successfully with ${tables.length} tables`);
            return true;
        }
        catch (error) {
            console.error('Schema verification error:', error);
            return false;
        }
        finally {
            // Ensure tenantDb connection is closed after verification
            await tenantDb.$disconnect();
            this.tenantConnections.delete(schemaName);
        }
    }
    async getTenantClient(schemaName) {
        console.log(`Getting tenant client for schema: ${schemaName}`);
        // this.ensureInitialized();
        // Check cache
        if (this.tenantConnections.has(schemaName)) {
            return this.tenantConnections.get(schemaName);
        }
        // Create new connection
        const baseUrl = process.env.DATABASE_URL;
        if (!baseUrl) {
            throw new Error('DATABASE_URL environment variable is not set.');
        }
        const url = new URL(baseUrl);
        url.searchParams.set('schema', schemaName);
        const tenantClient = new TenantPrismaClient({
            datasources: {
                db: { url: url.toString() }
            }
        });
        // Set search path
        await tenantClient.$executeRawUnsafe(`SET search_path TO "${schemaName}", public`);
        // Cache the connection
        this.tenantConnections.set(schemaName, tenantClient);
        return tenantClient;
    }
    async closeAllConnections() {
        console.log('🔌 Closing all database connections...');
        // Close all tenant connections
        for (const [schema, client] of this.tenantConnections) {
            try {
                await client.$disconnect();
                console.log(`✅ Closed connection for schema: ${schema}`);
            }
            catch (error) {
                console.error(`❌ Error closing connection for schema ${schema}:`, error);
            }
        }
        this.tenantConnections.clear();
        // Close shared connection
        try {
            await this.sharedDb.$disconnect();
            console.log('✅ Closed shared database connection');
        }
        catch (error) {
            console.error('❌ Error closing shared connection:', error);
        }
    }
    /**
     * Gets the shared database client
     * @returns The shared Prisma client
     */
    getSharedDb() {
        this.ensureInitialized();
        return this.sharedDb;
    }
    /**
     * Gets all loaded migrations
     * @returns Array of loaded migrations
     */
    getLoadedMigrations() {
        return [...this.loadedMigrations];
    }
    /**
     * Resets the singleton instance (mainly for testing purposes)
     * WARNING: This should only be used in test environments
     */
    static async resetInstance() {
        if (SchemaManagementService.instance) {
            await SchemaManagementService.instance.closeAllConnections();
            SchemaManagementService.instance = null;
            console.log('🔄 SchemaManagementService instance reset');
        }
    }
}
export default SchemaManagementService;
