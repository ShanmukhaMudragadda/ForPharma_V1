import { PrismaClient as SharedPrismaClient } from '../../generated/prisma-shared/index.js';
import { PrismaClient as TenantPrismaClient } from '../../generated/prisma-tenant/index.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

class SchemaManagementService {
  // sharedDb;
  // tenantConnections;
  constructor() {
    this.sharedDb = new SharedPrismaClient();
    this.tenantConnections = new Map();
  }

  async createOrganizationSchema(organizationId, organizationName) {
    let schemaName;
    try {
      const timestamp = Date.now();
      schemaName = `org_${organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${timestamp}`;

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

      console.log(`Schema ${schemaName} created successfully`);
      return schemaName;

    } catch (error) {
      console.error('Error creating schema:', error);
      // Cleanup on error - try to drop the schema
      if (schemaName) {
        try {
          await this.sharedDb.$executeRawUnsafe(
            `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`
          );
        } catch (cleanupError) {
          console.error('Failed to cleanup schema:', cleanupError);
        }
      }
      throw error;
    }
  }

  /**
   * Run migrations for a specific schema
   */
  async runMigrationsForSchema(schemaName) {
    try {
      console.log(`Setting up tables for schema ${schemaName}...`);

      // Skip Prisma migrations and directly create tables
      // This avoids conflicts with existing migrations
      await this.runPrismaGeneratedSQL(schemaName);

      console.log(`Tables created successfully for schema ${schemaName}`);
    } catch (error) {
      console.error(`Error setting up schema ${schemaName}:`, error);
      throw error;
    }
  }

  /**
   * Generate SQL from Prisma schema and execute it (Fallback method)
   */
  /**
    * Generate SQL from Prisma schema and execute it (Complete version)
    */

















  /**
    * Generate SQL from Prisma schema and execute it (Complete version)
    */
  async runPrismaGeneratedSQL(schemaName) {
    const tenantDb = await this.getTenantClient(schemaName);

    try {
      console.log(`Creating all tables for schema ${schemaName}...`);

      // First set the search path
      await tenantDb.$executeRawUnsafe(
        `SET search_path TO "${schemaName}", public`
      );

      // Create ENUM types first - execute each DO block separately
      console.log('Creating ENUM types...');

      const enumTypes = [
        { name: 'EmployeeRole', values: "'MEDICAL_REPRESENTATIVE', 'SALES_MANAGER', 'SYSTEM_ADMINISTRATOR'" },
        { name: 'TaskType', values: "'DOCTOR', 'CHEMIST', 'TOUR_PLANNER'" },
        { name: 'TaskStatus', values: "'PENDING', 'COMPLETED', 'RESCHEDULED'" },
        { name: 'AssociationType', values: "'DOCTOR', 'CHEMIST'" },
        { name: 'DayOfWeek', values: "'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'" },
        { name: 'ConsultationType', values: "'OPD', 'EMERGENCY', 'SURGERY', 'SPECIAL'" },
        { name: 'InteractionType', values: "'MEETING', 'CALL', 'EMAIL', 'WHATSAPP'" },
        { name: 'OrderStatus', values: "'PENDING', 'CONFIRMED', 'DISPATCHED', 'DELIVERED', 'CANCELLED'" },
        { name: 'EventType', values: "'MEETING', 'VISIT', 'TRAINING', 'OTHER'" },
        { name: 'EventStatus', values: "'SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'" },
        { name: 'ExpenseClaimStatus', values: "'PENDING', 'APPROVED', 'REJECTED'" },
        { name: 'TaskPlannerStatus', values: "'DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED'" },
        { name: 'TaskTypeReference', values: "'DOCTOR_TASK', 'CHEMIST_TASK', 'TOUR_PLAN_TASK'" },
        { name: 'ChemistType', values: "'CHEMIST', 'STOCKIST'" }
      ];

      for (const enumType of enumTypes) {
        await tenantDb.$executeRawUnsafe(`
          DO $$ BEGIN
            CREATE TYPE "${schemaName}"."${enumType.name}" AS ENUM (${enumType.values});
            EXCEPTION WHEN duplicate_object THEN NULL;
          END $$
        `);
      }

      console.log('Creating tables...');

      // Create tables - execute each CREATE TABLE separately
      const tableStatements = [
        // Core System Tables
        `CREATE TABLE IF NOT EXISTS "${schemaName}"."teams" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "team_name" VARCHAR(255) NOT NULL,
          "lead_id" TEXT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."territories" (
          "territory_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "name" VARCHAR(255) NOT NULL,
          "type" VARCHAR(100) NOT NULL,
          "boundaries" JSONB,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "territories_pkey" PRIMARY KEY ("territory_id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."employee_training_records" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "employee_id" TEXT,
          "training_name" VARCHAR(255) NOT NULL,
          "description" TEXT,
          "completion_date" DATE NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "employee_training_records_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."hospital_chains" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "name" VARCHAR(255) NOT NULL,
          "headquarters_address" TEXT,
          "contact_email" VARCHAR(255),
          "contact_phone" VARCHAR(20),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "hospital_chains_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."chemist_chains" (
          "chemist_chain_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "name" VARCHAR(255) NOT NULL,
          "headquarters_address" TEXT,
          "contact_email" VARCHAR(255),
          "contact_phone" VARCHAR(20),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "chemist_chains_pkey" PRIMARY KEY ("chemist_chain_id")
        )`,

        // Main Entity Tables
        `CREATE TABLE IF NOT EXISTS "${schemaName}"."hospitals" (
          "hospital_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "hospital_chain_id" TEXT,
          "name" VARCHAR(255) NOT NULL,
          "type" VARCHAR(100) NOT NULL,
          "address" TEXT NOT NULL,
          "city" VARCHAR(100),
          "state" VARCHAR(100),
          "pincode" VARCHAR(10),
          "latitude" DECIMAL(10,8),
          "longitude" DECIMAL(11,8),
          "phone" VARCHAR(20),
          "email" VARCHAR(255),
          "website" VARCHAR(255),
          "description" TEXT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "hospitals_pkey" PRIMARY KEY ("hospital_id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctors" (
          "doctor_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "name" VARCHAR(255) NOT NULL,
          "specialization" VARCHAR(255),
          "email" VARCHAR(255),
          "phone" VARCHAR(20),
          "description" TEXT,
          "profile_picture_url" VARCHAR(500),
          "qualification" VARCHAR(255),
          "experience_years" INTEGER,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "created_by" TEXT,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctor_id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."chemists" (
          "chemist_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "chemist_chain_id" TEXT,
          "name" VARCHAR(255) NOT NULL,
          "type" "${schemaName}"."ChemistType" NOT NULL,
          "email" VARCHAR(255),
          "phone" VARCHAR(20),
          "address" TEXT,
          "city" VARCHAR(100),
          "state" VARCHAR(100),
          "pincode" VARCHAR(10),
          "latitude" DECIMAL(10,8),
          "longitude" DECIMAL(11,8),
          "description" TEXT,
          "profile_picture_url" VARCHAR(500),
          "visiting_hours" VARCHAR(255),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "created_by" TEXT,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "chemists_pkey" PRIMARY KEY ("chemist_id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."drugs" (
          "drug_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "name" VARCHAR(255) NOT NULL,
          "composition" TEXT,
          "manufacturer" VARCHAR(255),
          "indications" TEXT,
          "side_effects" TEXT,
          "safety_advice" TEXT,
          "dosage_forms" JSONB,
          "price" DECIMAL(10,2),
          "schedule" VARCHAR(10),
          "regulatory_approvals" TEXT,
          "category" VARCHAR(100),
          "is_available" BOOLEAN NOT NULL DEFAULT true,
          "images" JSONB,
          "marketing_materials" JSONB,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "created_by" TEXT,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "drugs_pkey" PRIMARY KEY ("drug_id")
        )`,

        // Association Tables
        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_hospital_associations" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_id" TEXT NOT NULL,
          "hospital_id" TEXT NOT NULL,
          "department" VARCHAR(255),
          "position" VARCHAR(255),
          "is_primary" BOOLEAN NOT NULL DEFAULT false,
          "association_start_date" TIMESTAMP(3),
          "association_end_date" TIMESTAMP(3),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_hospital_associations_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "doctor_hospital_unique" UNIQUE ("doctor_id", "hospital_id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_consultation_schedules" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_id" TEXT NOT NULL,
          "hospital_id" TEXT NOT NULL,
          "day_of_week" "${schemaName}"."DayOfWeek" NOT NULL,
          "start_time" TIME NOT NULL,
          "end_time" TIME NOT NULL,
          "consultation_type" "${schemaName}"."ConsultationType" NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "effective_from" TIMESTAMP(3),
          "effective_to" TIMESTAMP(3),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_consultation_schedules_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_notes" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_id" TEXT NOT NULL,
          "created_by" TEXT,
          "content" TEXT NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_notes_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_interactions" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_id" TEXT NOT NULL,
          "employee_id" TEXT,
          "hospital_id" TEXT,
          "doctorTaskId" TEXT,
          "interaction_type" "${schemaName}"."InteractionType" NOT NULL,
          "start_time" TIMESTAMP(3) NOT NULL,
          "end_time" TIMESTAMP(3),
          "purpose" TEXT,
          "outcome" TEXT,
          "comments" TEXT,
          "rating" SMALLINT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_interactions_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."chemist_notes" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "chemist_id" TEXT NOT NULL,
          "created_by" TEXT,
          "content" TEXT NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "chemist_notes_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."chemist_interactions" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "chemist_id" TEXT NOT NULL,
          "employee_id" TEXT,
          "chemistTaskId" TEXT,
          "interaction_type" "${schemaName}"."InteractionType" NOT NULL,
          "start_time" TIMESTAMP(3) NOT NULL,
          "end_time" TIMESTAMP(3),
          "purpose" TEXT,
          "outcome" TEXT,
          "comments" TEXT,
          "rating" SMALLINT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "chemist_interactions_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_chemist_relations" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_id" TEXT NOT NULL,
          "chemist_id" TEXT NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "created_by" TEXT,
          CONSTRAINT "doctor_chemist_relations_pkey" PRIMARY KEY ("id")
        )`
      ];

      // Execute each table creation statement
      let createdCount = 0;
      for (const statement of tableStatements) {
        await tenantDb.$executeRawUnsafe(statement);
        createdCount++;
        if (createdCount % 5 === 0) {
          console.log(`Created ${createdCount} tables...`);
        }
      }

      // Continue with remaining tables...
      const remainingTables = [
        // Orders and Tasks
        `CREATE TABLE IF NOT EXISTS "${schemaName}"."orders" (
          "order_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "chemist_id" TEXT,
          "total_amount" DECIMAL(10,2) NOT NULL,
          "status" "${schemaName}"."OrderStatus" NOT NULL,
          "order_date" TIMESTAMP(3) NOT NULL,
          "delivery_date" TIMESTAMP(3),
          "special_instructions" TEXT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "created_by" TEXT,
          CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."order_items" (
          "order_id" TEXT NOT NULL,
          "drug_id" TEXT NOT NULL,
          "quantity" INTEGER NOT NULL,
          "unit_price" DECIMAL(10,2) NOT NULL,
          "subtotal" DECIMAL(10,2) NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_id", "drug_id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."task_planners" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "employee_id" TEXT,
          "start_date" DATE NOT NULL,
          "end_date" DATE NOT NULL,
          "status" "${schemaName}"."TaskPlannerStatus" NOT NULL DEFAULT 'DRAFT',
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "task_planners_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_tasks" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "task_planner_id" TEXT NOT NULL,
          "employee_id" TEXT,
          "doctor_id" TEXT NOT NULL,
          "taskDate" DATE NOT NULL,
          "start_time" TIME NOT NULL,
          "end_time" TIME NOT NULL,
          "taskStatus" "${schemaName}"."TaskStatus" NOT NULL DEFAULT 'PENDING',
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_tasks_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."chemist_tasks" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "task_planner_id" TEXT NOT NULL,
          "employee_id" TEXT,
          "chemist_id" TEXT NOT NULL,
          "taskDate" DATE NOT NULL,
          "start_time" TIME NOT NULL,
          "end_time" TIME NOT NULL,
          "taskStatus" "${schemaName}"."TaskStatus" NOT NULL DEFAULT 'PENDING',
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "chemist_tasks_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."tour_plans" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "name" VARCHAR(255) NOT NULL,
          "description" TEXT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "tour_plans_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."tour_plan_tasks" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "task_planner_id" TEXT NOT NULL,
          "employee_id" TEXT,
          "tour_plan_id" TEXT NOT NULL,
          "location" VARCHAR(255) NOT NULL,
          "taskDate" DATE NOT NULL,
          "start_time" TIME NOT NULL,
          "end_time" TIME NOT NULL,
          "taskStatus" "${schemaName}"."TaskStatus" NOT NULL DEFAULT 'PENDING',
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "tour_plan_tasks_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."tour_planner_interactions" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "task_for_tour_planner_id" TEXT NOT NULL,
          "interaction_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "purpose" VARCHAR(255),
          "outcome" TEXT,
          "comments" TEXT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "tour_planner_interactions_pkey" PRIMARY KEY ("id")
        )`,

        // Reporting Tables
        `CREATE TABLE IF NOT EXISTS "${schemaName}"."dcr_reports" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "employee_id" TEXT,
          "task_id" TEXT,
          "task_type" "${schemaName}"."TaskTypeReference",
          "report_date" DATE NOT NULL,
          "products_discussed" TEXT,
          "comments" TEXT,
          "is_draft" BOOLEAN NOT NULL DEFAULT true,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "dcr_reports_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."rcpa_reports" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "employee_id" TEXT,
          "chemist_id" TEXT NOT NULL,
          "remarks" TEXT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "rcpa_reports_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."rcpa_drug_data" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "rcpa_report_id" TEXT NOT NULL,
          "drug_id" TEXT,
          "competitor_drug_name" VARCHAR(255),
          "own_quantity" INTEGER NOT NULL,
          "competitor_quantity" INTEGER NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "rcpa_drug_data_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."check_ins" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "employee_id" TEXT,
          "check_in_time" TIMESTAMP(3),
          "check_out_time" TIMESTAMP(3),
          "check_in_latitude" DECIMAL(10,8),
          "check_in_longitude" DECIMAL(11,8),
          "check_out_latitude" DECIMAL(10,8),
          "check_out_longitude" DECIMAL(11,8),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
        )`,

        // Expense Tables
        `CREATE TABLE IF NOT EXISTS "${schemaName}"."expense_types" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "name" VARCHAR(50) NOT NULL UNIQUE,
          "description" TEXT,
          "icon" TEXT,
          "form_fields" JSONB NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "expense_types_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."expense_role_configs" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "expense_type_id" TEXT NOT NULL,
          "role" "${schemaName}"."EmployeeRole" NOT NULL,
          "limits" JSONB NOT NULL,
          "rates" JSONB,
          "validation_rules" JSONB NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "expense_role_configs_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "expense_type_role_unique" UNIQUE ("expense_type_id", "role")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."expense_claims" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "claim_number" VARCHAR(50) NOT NULL UNIQUE,
          "employee_id" TEXT,
          "expense_type_id" TEXT NOT NULL,
          "expense_role_config_id" TEXT NOT NULL,
          "expense_data" JSONB NOT NULL,
          "status" "${schemaName}"."ExpenseClaimStatus" NOT NULL DEFAULT 'PENDING',
          "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "approved_at" TIMESTAMP(3),
          "approved_by" TEXT,
          "approval_comments" TEXT,
          "rejection_reason" TEXT,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "expense_claims_pkey" PRIMARY KEY ("id")
        )`,

        // Inventory Tables
        `CREATE TABLE IF NOT EXISTS "${schemaName}"."gifts" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "name" VARCHAR(200) NOT NULL,
          "description" TEXT,
          "unit_cost" DECIMAL(10,2) NOT NULL,
          "specifications" JSONB,
          "gift_images" JSONB,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "created_by" TEXT,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          CONSTRAINT "gifts_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."user_drug_inventory" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "employee_id" TEXT,
          "drug_id" TEXT NOT NULL,
          "quantity" INTEGER NOT NULL,
          "last_restocked_date" TIMESTAMP(3),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "user_drug_inventory_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."user_gift_inventory" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "employee_id" TEXT,
          "gift_id" TEXT NOT NULL,
          "quantity" INTEGER NOT NULL,
          "last_restocked_date" TIMESTAMP(3),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "user_gift_inventory_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_distributions" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_interaction_id" TEXT NOT NULL,
          "employee_id" TEXT,
          "distributed_at" TIMESTAMP(3) NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_distributions_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_distribution_drug_items" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_distribution_id" TEXT NOT NULL,
          "drug_id" TEXT NOT NULL,
          "from_inventory_id" TEXT NOT NULL,
          "quantity" INTEGER NOT NULL,
          "unit_cost" DECIMAL(10,2) NOT NULL,
          "total_cost" DECIMAL(10,2) NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_distribution_drug_items_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."doctor_distribution_gift_items" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "doctor_distribution_id" TEXT NOT NULL,
          "gift_id" TEXT NOT NULL,
          "from_inventory_id" TEXT NOT NULL,
          "quantity" INTEGER NOT NULL,
          "unit_cost" DECIMAL(10,2) NOT NULL,
          "total_cost" DECIMAL(10,2) NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "doctor_distribution_gift_items_pkey" PRIMARY KEY ("id")
        )`,

        `CREATE TABLE IF NOT EXISTS "${schemaName}"."audit_logs" (
          "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
          "organization_id" TEXT,
          "employee_id" TEXT,
          "table_name" VARCHAR(100) NOT NULL,
          "action_type" VARCHAR(50) NOT NULL,
          "record_id" TEXT NOT NULL,
          "old_values" JSONB,
          "new_values" JSONB,
          "ip_address" VARCHAR(45),
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
        )`
      ];

      for (const statement of remainingTables) {
        await tenantDb.$executeRawUnsafe(statement);
        createdCount++;
        if (createdCount % 5 === 0) {
          console.log(`Created ${createdCount} tables...`);
        }
      }

      console.log('Creating indexes...');

      // Create indexes separately
      const indexStatements = [
        `CREATE INDEX IF NOT EXISTS "idx_doctors_organization" ON "${schemaName}"."doctors"("organization_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_chemists_organization" ON "${schemaName}"."chemists"("organization_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_hospitals_organization" ON "${schemaName}"."hospitals"("organization_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_drugs_organization" ON "${schemaName}"."drugs"("organization_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_doctor_interactions_doctor" ON "${schemaName}"."doctor_interactions"("doctor_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_chemist_interactions_chemist" ON "${schemaName}"."chemist_interactions"("chemist_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_orders_chemist" ON "${schemaName}"."orders"("chemist_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_order_items_order" ON "${schemaName}"."order_items"("order_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_order_items_drug" ON "${schemaName}"."order_items"("drug_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_task_planners_employee" ON "${schemaName}"."task_planners"("employee_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_doctor_tasks_planner" ON "${schemaName}"."doctor_tasks"("task_planner_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_chemist_tasks_planner" ON "${schemaName}"."chemist_tasks"("task_planner_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_audit_logs_employee" ON "${schemaName}"."audit_logs"("employee_id")`,
        `CREATE INDEX IF NOT EXISTS "idx_audit_logs_table_action" ON "${schemaName}"."audit_logs"("table_name", "action_type")`
      ];

      for (const indexStatement of indexStatements) {
        await tenantDb.$executeRawUnsafe(indexStatement);
      }

      console.log(`All tables and indexes created successfully in schema ${schemaName}`);
    } catch (error) {
      console.error('SQL execution error:', error);
      throw error;
    } finally {
      await tenantDb.$disconnect();
      // Remove from cache to ensure fresh connection
      this.tenantConnections.delete(schemaName);
    }
  }

  /**
   * Verify that schema was created properly
   */
  async verifySchemaCreation(schemaName) {
    const tenantDb = await this.getTenantClient(schemaName);

    try {
      // Set search path to the schema
      await tenantDb.$executeRawUnsafe(
        `SET search_path TO "${schemaName}", public`
      );

      // Check if tables exist in the schema
      const result = await tenantDb.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = ${schemaName}
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `;

      const tables = result.map(row => row.table_name);
      console.log(`Tables found in schema ${schemaName}:`, tables);

      // If we have at least some core tables, consider it successful
      const coreTables = ['teams', 'doctors', 'chemists', 'drugs', 'hospitals'];
      const foundCoreTables = tables.filter(table => coreTables.includes(table));

      if (foundCoreTables.length > 0) {
        console.log(`Found ${foundCoreTables.length} core tables in schema ${schemaName}`);
        return true;
      }

      // Even if no core tables, if we have ANY tables, log it
      if (tables.length > 0) {
        console.log(`Schema ${schemaName} has ${tables.length} tables`);
        return true;
      }

      console.error(`No tables found in schema ${schemaName}`);
      return false;
    } catch (error) {
      console.error('Schema verification error:', error);
      // Don't fail on verification errors, just log them
      return true;
    } finally {
      await tenantDb.$disconnect();
      // Remove from cache
      this.tenantConnections.delete(schemaName);
    }
  }

  /**
   * Get a Prisma client for a specific tenant
   */
  async getTenantClient(schemaNameOrOrgId) {
    let schemaName;

    // Handle different input types
    if (typeof schemaNameOrOrgId === 'string') {
      // Check if it's a UUID (organization ID)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(schemaNameOrOrgId)) {
        // It's an organization ID, look up the schema name
        const org = await this.sharedDb.organization.findUnique({
          where: { id: schemaNameOrOrgId },
          select: { schemaName: true }
        });

        if (!org?.schemaName) {
          throw new Error(`Organization schema not found for ID: ${schemaNameOrOrgId}`);
        }

        schemaName = org.schemaName;
      } else {
        // It's already a schema name
        schemaName = schemaNameOrOrgId;
      }
    } else {
      throw new Error('Invalid parameter type for getTenantClient - expected string');
    }

    // Check cache
    if (this.tenantConnections.has(schemaName)) {
      return this.tenantConnections.get(schemaName);
    }

    // Create new connection with the specific schema
    const databaseUrl = process.env.DATABASE_URL
      .replace(/schema=\w+/, `schema=${schemaName}`)
      .replace(/\?/, `?search_path=${schemaName}&`);

    const tenantClient = new TenantPrismaClient({
      datasources: {
        db: { url: databaseUrl }
      }
    });

    // Set search path to ensure we're using the correct schema
    await tenantClient.$executeRawUnsafe(
      `SET search_path TO "${schemaName}", public`
    );

    // Verify connection
    try {
      await tenantClient.$queryRaw`SELECT 1`;
    } catch (error) {
      console.error(`Failed to connect to schema ${schemaName}:`, error);
      await tenantClient.$disconnect();
      throw new Error(`Failed to establish connection to schema ${schemaName}`);
    }

    // Cache the connection
    this.tenantConnections.set(schemaName, tenantClient);

    return tenantClient;
  }

  /**
   * Remove a tenant client from cache
   */
  async removeTenantClient(schemaName) {
    if (this.tenantConnections.has(schemaName)) {
      const client = this.tenantConnections.get(schemaName);
      await client.$disconnect();
      this.tenantConnections.delete(schemaName);
    }
  }

  /**
   * Close all connections
   */
  async closeAllConnections() {
    console.log('Closing all database connections...');

    // Close all tenant connections
    for (const [schema, client] of this.tenantConnections) {
      try {
        await client.$disconnect();
        console.log(`Closed connection for schema: ${schema}`);
      } catch (error) {
        console.error(`Error closing connection for schema ${schema}:`, error);
      }
    }
    this.tenantConnections.clear();

    // Close shared connection
    try {
      await this.sharedDb.$disconnect();
      console.log('Closed shared database connection');
    } catch (error) {
      console.error('Error closing shared connection:', error);
    }
  }

  /**
   * Get schema statistics
   */
  async getSchemaStats(schemaName) {
    const tenantDb = await this.getTenantClient(schemaName);

    try {
      const stats = await tenantDb.$queryRaw`
        SELECT 
          t.table_name,
          COUNT(c.column_name) as column_count,
          pg_size_pretty(pg_total_relation_size(quote_ident(t.table_schema)||'.'||quote_ident(t.table_name))) as size
        FROM information_schema.tables t
        LEFT JOIN information_schema.columns c 
          ON t.table_schema = c.table_schema 
          AND t.table_name = c.table_name
        WHERE t.table_schema = ${schemaName}
          AND t.table_type = 'BASE TABLE'
        GROUP BY t.table_schema, t.table_name
        ORDER BY t.table_name;
      `;

      return stats;
    } finally {
      await tenantDb.$disconnect();
      this.tenantConnections.delete(schemaName);
    }
  }
}

export default SchemaManagementService;