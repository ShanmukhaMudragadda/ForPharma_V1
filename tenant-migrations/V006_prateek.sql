-- Migration: V002_update_order_rcpa_schema
-- Description: Update OrderStatus enum, add RCPA reporting period fields and pack size columns
-- Date: 2025-01-16

-- 1. Create new ReportingPeriod enum (only if it doesn't exist)
CREATE TYPE "ReportingPeriod" AS ENUM ('WEEKLY', 'MONTHLY');

-- 2. Update OrderStatus enum - Handle existing table properly
-- First, convert the column to text temporarily
ALTER TABLE "orders" ALTER COLUMN "status" TYPE TEXT;

-- Drop the old enum
DROP TYPE IF EXISTS "OrderStatus" CASCADE;

-- Create the new enum with only CONFIRMED and DRAFT
CREATE TYPE "OrderStatus" AS ENUM ('CONFIRMED', 'DRAFT');

-- Update existing data to map old values to new ones
UPDATE "orders" SET "status" = 'CONFIRMED' WHERE "status" IN ('PENDING', 'DISPATCHED', 'DELIVERED');
UPDATE "orders" SET "status" = 'DRAFT' WHERE "status" = 'CANCELLED';

-- Convert the column back to the new enum type
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus" USING "status"::"OrderStatus";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- -- 3. Add new columns to rcpa_reports table (remove IF NOT EXISTS)
-- ALTER TABLE "rcpa_reports" ADD COLUMN "reporting_period" "ReportingPeriod";
-- ALTER TABLE "rcpa_reports" ADD COLUMN "start_date" TIMESTAMP(3);
-- ALTER TABLE "rcpa_reports" ADD COLUMN "end_date" TIMESTAMP(3);
-- ALTER TABLE "rcpa_reports" ADD COLUMN "total_prescription" INTEGER;

-- 4. Add new columns to rcpa_drug_data table (remove IF NOT EXISTS)
-- ALTER TABLE "rcpa_drug_data" ADD COLUMN "own_pack_size" VARCHAR(255) NOT NULL DEFAULT '';
-- ALTER TABLE "rcpa_drug_data" ADD COLUMN "competitor_pack_size" VARCHAR(255) NOT NULL DEFAULT '';

-- 5. Update existing rcpa_drug_data records to have meaningful pack sizes
UPDATE "rcpa_drug_data" 
SET "own_pack_size" = 'Unknown', "competitor_pack_size" = 'Unknown' 
WHERE "own_pack_size" = '' OR "competitor_pack_size" = '';

-- 6. Create indexes for better query performance
CREATE INDEX "idx_rcpa_reports_reporting_period" ON "rcpa_reports"("reporting_period");
CREATE INDEX "idx_rcpa_reports_date_range" ON "rcpa_reports"("start_date", "end_date");
CREATE INDEX "idx_orders_status" ON "orders"("status");

-- 7. Add comments for documentation
COMMENT ON COLUMN "rcpa_reports"."reporting_period" IS 'Reporting period type: WEEKLY or MONTHLY';
COMMENT ON COLUMN "rcpa_reports"."total_prescription" IS 'Total number of prescriptions in the reporting period';
COMMENT ON COLUMN "rcpa_drug_data"."own_pack_size" IS 'Pack size of own company drug';
COMMENT ON COLUMN "rcpa_drug_data"."competitor_pack_size" IS 'Pack size of competitor drug';


-- 8. Drop existing foreign key constraints
ALTER TABLE "dcr_reports" DROP CONSTRAINT IF EXISTS "dcr_reports_doctor_task_fkey";
ALTER TABLE "dcr_reports" DROP CONSTRAINT IF EXISTS "dcr_reports_chemist_task_fkey";
ALTER TABLE "dcr_reports" DROP CONSTRAINT IF EXISTS "dcr_reports_tour_plan_task_fkey";
ALTER TABLE "dcr_reports" DROP CONSTRAINT IF EXISTS "dcr_reports_task_id_fkey";

-- 9. Create indexes for better query performance on the polymorphic columns
-- 9. Create indexes for better query performance on the polymorphic columns
CREATE INDEX "idx_dcr_reports_task_id" ON "dcr_reports"("task_id");
CREATE INDEX "idx_dcr_reports_task_type" ON "dcr_reports"("task_type");
CREATE INDEX "idx_dcr_reports_task_polymorphic" ON "dcr_reports"("task_id", "task_type");

-- 10. Add check constraint to ensure task_type is valid when task_id is present
ALTER TABLE "dcr_reports" DROP CONSTRAINT IF EXISTS "dcr_reports_task_type_check";
ALTER TABLE "dcr_reports" 
ADD CONSTRAINT "dcr_reports_task_type_check" 
CHECK (
    ("task_id" IS NULL AND "task_type" IS NULL) 
    OR 
    ("task_id" IS NOT NULL AND "task_type" IS NOT NULL)
);

-- 11. Add comments for documentation
COMMENT ON COLUMN "dcr_reports"."task_id" IS 'Polymorphic reference to task ID (can be doctor_task, chemist_task, or tour_plan_task)';
COMMENT ON COLUMN "dcr_reports"."task_type" IS 'Type of task being referenced (DOCTOR_TASK, CHEMIST_TASK, or TOUR_PLAN_TASK)';


-- Migration: V003_rename_doctor_distribution_to_sample_distribution
-- Description: Rename DoctorDistribution tables to SampleDistribution and update foreign key relationships
-- Date: 2025-01-16

-- Migration: V003_rename_doctor_distribution_to_sample_distribution
-- Description: Rename DoctorDistribution tables to SampleDistribution, update foreign key relationships, and remove redundant drug_id/gift_id columns
-- Date: 2025-01-16

-- 1. Drop existing foreign key constraints from doctor_distributions table
ALTER TABLE "doctor_distributions" DROP CONSTRAINT "doctor_distributions_doctor_interaction_id_fkey";
ALTER TABLE "doctor_distributions" DROP CONSTRAINT "doctor_distributions_employee_id_fkey";

-- 2. Drop existing foreign key constraints from doctor_distribution_drug_items table
ALTER TABLE "doctor_distribution_drug_items" DROP CONSTRAINT "doctor_distribution_drug_items_doctor_distribution_id_fkey";
ALTER TABLE "doctor_distribution_drug_items" DROP CONSTRAINT "doctor_distribution_drug_items_drug_id_fkey";
ALTER TABLE "doctor_distribution_drug_items" DROP CONSTRAINT "doctor_distribution_drug_items_from_inventory_id_fkey";

-- 3. Drop existing foreign key constraints from doctor_distribution_gift_items table
ALTER TABLE "doctor_distribution_gift_items" DROP CONSTRAINT "doctor_distribution_gift_items_doctor_distribution_id_fkey";
ALTER TABLE "doctor_distribution_gift_items" DROP CONSTRAINT "doctor_distribution_gift_items_gift_id_fkey";
ALTER TABLE "doctor_distribution_gift_items" DROP CONSTRAINT "doctor_distribution_gift_items_from_inventory_id_fkey";

-- 4. Rename tables
ALTER TABLE "doctor_distributions" RENAME TO "sample_distributions";
ALTER TABLE "doctor_distribution_drug_items" RENAME TO "sample_distribution_drug_items";
ALTER TABLE "doctor_distribution_gift_items" RENAME TO "sample_distribution_gift_items";

-- 5. Rename columns in sample_distributions table and add new column
ALTER TABLE "sample_distributions" RENAME COLUMN "doctor_interaction_id" TO "doctor_id";
ALTER TABLE "sample_distributions" ADD COLUMN "chemist_id" TEXT;

-- 6. Update the doctor_id column to be nullable
ALTER TABLE "sample_distributions" ALTER COLUMN "doctor_id" DROP NOT NULL;

-- 7. Rename foreign key columns in child tables
ALTER TABLE "sample_distribution_drug_items" RENAME COLUMN "doctor_distribution_id" TO "sample_distribution_id";
ALTER TABLE "sample_distribution_gift_items" RENAME COLUMN "doctor_distribution_id" TO "sample_distribution_id";

-- 8. Remove redundant drug_id column from sample_distribution_drug_items
ALTER TABLE "sample_distribution_drug_items" DROP COLUMN "drug_id";

-- 9. Remove redundant gift_id column from sample_distribution_gift_items
ALTER TABLE "sample_distribution_gift_items" DROP COLUMN "gift_id";

-- 10. Create new foreign key constraints for sample_distributions table
ALTER TABLE "sample_distributions" 
ADD CONSTRAINT "sample_distributions_doctor_id_fkey" 
FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "sample_distributions" 
ADD CONSTRAINT "sample_distributions_chemist_id_fkey" 
FOREIGN KEY ("chemist_id") REFERENCES "chemists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "sample_distributions" 
ADD CONSTRAINT "sample_distributions_employee_id_fkey" 
FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 11. Create new foreign key constraints for sample_distribution_drug_items table
ALTER TABLE "sample_distribution_drug_items" 
ADD CONSTRAINT "sample_distribution_drug_items_sample_distribution_id_fkey" 
FOREIGN KEY ("sample_distribution_id") REFERENCES "sample_distributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "sample_distribution_drug_items" 
ADD CONSTRAINT "sample_distribution_drug_items_from_inventory_id_fkey" 
FOREIGN KEY ("from_inventory_id") REFERENCES "user_drug_inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 12. Create new foreign key constraints for sample_distribution_gift_items table
ALTER TABLE "sample_distribution_gift_items" 
ADD CONSTRAINT "sample_distribution_gift_items_sample_distribution_id_fkey" 
FOREIGN KEY ("sample_distribution_id") REFERENCES "sample_distributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "sample_distribution_gift_items" 
ADD CONSTRAINT "sample_distribution_gift_items_from_inventory_id_fkey" 
FOREIGN KEY ("from_inventory_id") REFERENCES "user_gift_inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 13. Add check constraint to ensure either doctor_id or chemist_id is provided (but not both)
ALTER TABLE "sample_distributions" 
ADD CONSTRAINT "sample_distributions_recipient_check" 
CHECK (
    ("doctor_id" IS NOT NULL AND "chemist_id" IS NULL) 
    OR 
    ("doctor_id" IS NULL AND "chemist_id" IS NOT NULL)
);

-- 14. Create indexes for better query performance
CREATE INDEX "sample_distributions_doctor_id_idx" ON "sample_distributions"("doctor_id");
CREATE INDEX "sample_distributions_chemist_id_idx" ON "sample_distributions"("chemist_id");
CREATE INDEX "sample_distributions_employee_id_idx" ON "sample_distributions"("employee_id");
CREATE INDEX "sample_distributions_distributed_at_idx" ON "sample_distributions"("distributed_at");

CREATE INDEX "sample_distribution_drug_items_sample_distribution_id_idx" ON "sample_distribution_drug_items"("sample_distribution_id");
CREATE INDEX "sample_distribution_drug_items_from_inventory_id_idx" ON "sample_distribution_drug_items"("from_inventory_id");

CREATE INDEX "sample_distribution_gift_items_sample_distribution_id_idx" ON "sample_distribution_gift_items"("sample_distribution_id");
CREATE INDEX "sample_distribution_gift_items_from_inventory_id_idx" ON "sample_distribution_gift_items"("from_inventory_id");

-- 15. Update any existing data to populate doctor_id from doctor_interactions
-- This assumes you want to get the doctor_id from the doctor_interaction that was previously referenced
UPDATE "sample_distributions" 
SET "doctor_id" = (
    SELECT "doctor_id" 
    FROM "doctor_interactions" 
    WHERE "doctor_interactions"."id" = "sample_distributions"."doctor_id"
);

-- 16. Drop old indexes that are no longer needed (related to removed drug_id and gift_id columns)
DROP INDEX IF EXISTS "doctor_distribution_drug_items_drug_id_idx" CASCADE;
DROP INDEX IF EXISTS "doctor_distribution_gift_items_gift_id_idx" CASCADE;


