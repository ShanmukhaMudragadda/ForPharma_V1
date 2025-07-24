import { PrismaClient as SharedPrismaClient } from '../generated/prisma-shared/index.js';
import { PrismaClient as TenantPrismaClient } from '../generated/prisma-tenant/index.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

class SchemaManagementService {
  constructor() {
    this.sharedDb = new SharedPrismaClient();
    this.tenantConnections = new Map();
  }

  async createOrganizationSchema(organizationId, organizationName) {
    try {
      const timestamp = Date.now();
      const schemaName = `org_${organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${timestamp}`;
      
      console.log(`Creating schema: ${schemaName}`);
      
      // 1. Create the schema
      await this.sharedDb.$executeRawUnsafe(
        `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`
      );
      
      // 2. Grant permissions
      const dbUser = process.env.DB_USER || 'postgres';
      await this.sharedDb.$executeRawUnsafe(
        `GRANT ALL ON SCHEMA "${schemaName}" TO ${dbUser}`
      );
      
      // 3. Run migrations for the new schema
      await this.runMigrationsForSchema(schemaName);
      
      // 4. Update organization record
      await this.sharedDb.organization.update({
        where: { organization_id: organizationId },
        data: { schemaName: schemaName }
      });
      
      console.log(`Schema ${schemaName} created successfully`);
      return schemaName;
      
    } catch (error) {
      console.error('Error creating schema:', error);
      throw error;
    }
  }

  /**
   * Run Prisma migrations for a specific schema
   */
  async runMigrationsForSchema(schemaName) {
    try {
      // Option 1: Use Prisma Migrate Deploy (Recommended for production)
      await this.runPrismaMigrations(schemaName);
      
    } catch (error) {
      console.error(`Error running migrations for schema ${schemaName}:`, error);
      throw error;
    }
  }



  /**
   * Generate SQL from Prisma schema and execute it
   */
  async runPrismaGeneratedSQL(schemaName) {
    const tenantDb = await this.getTenantClient(schemaName);
    
    try {
      // First, generate the SQL from Prisma schema
      const { stdout } = await execAsync(
        `npx prisma migrate diff \
        --from-empty \
        --to-schema-datamodel ./prisma/schema.tenant.prisma \
        --script`
      );
      
      // Replace any public schema references with the tenant schema
      const modifiedSql = stdout.replace(/public\./g, `"${schemaName}".`);
      
      // Execute the generated SQL
      await tenantDb.$executeRawUnsafe(modifiedSql);
      
      console.log(`Schema ${schemaName} initialized with Prisma models`);
    } finally {
      await tenantDb.$disconnect();
    }
  }

  /**
   * Get a Prisma client for a specific tenant
   */
  async getTenantClient(schemaNameOrOrgId) {
    let schemaName;
    
    // If number provided, look up schema name
    if (typeof schemaNameOrOrgId === 'number') {
      const org = await this.sharedDb.organization.findUnique({
        where: { organization_id: schemaNameOrOrgId },
        select: { schemaName: true }
      });
      
      if (!org?.schemaName) {
        throw new Error('Organization schema not found');
      }
      
      schemaName = org.schemaName;
    } else {
      schemaName = schemaNameOrOrgId;
    }
    
    // Check cache
    if (this.tenantConnections.has(schemaName)) {
      return this.tenantConnections.get(schemaName);
    }
    
    // Create new connection
    const databaseUrl = process.env.DATABASE_URL.replace(
      'schema=public',
      `schema=${schemaName}`
    );
    
    const tenantClient = new TenantPrismaClient({
      datasources: {
        db: { url: databaseUrl }
      }
    });
    
    // Set search path
    await tenantClient.$executeRawUnsafe(
      `SET search_path TO "${schemaName}"`
    );
    
    // Cache connection
    this.tenantConnections.set(schemaName, tenantClient);
    
    return tenantClient;
  }

  /**
   * Close all connections
   */
  async closeAllConnections() {
    for (const [schema, client] of this.tenantConnections) {
      await client.$disconnect();
    }
    this.tenantConnections.clear();
    await this.sharedDb.$disconnect();
  }
}

export default SchemaManagementService;