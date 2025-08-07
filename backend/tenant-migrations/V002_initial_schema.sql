-- Migration: V002_update_order_rcpa_schema
-- Description: Update OrderStatus enum, add RCPA reporting period fields and pack size columns
-- Date: 2025-01-16

-- 1. Create new ReportingPeriod enum (only if it doesn't exist)
CREATE TYPE "ReportingPeriod" AS ENUM ('WEEKLY', 'MONTHLY');

-- 2. Update OrderStatus enum - Handle existing table properly
-- First, convert the column to text temporarily
ALTER TABLE "orders" ALTER COLUMN "status" TYPE TEXT;

-- Drop the old enum
DROP TYPE IF EXISTS "OrderStatus";

-- Create the new enum with only CONFIRMED and DRAFT
CREATE TYPE "OrderStatus" AS ENUM ('CONFIRMED', 'DRAFT');

-- Update existing data to map old values to new ones
UPDATE "orders" SET "status" = 'CONFIRMED' WHERE "status" IN ('PENDING', 'DISPATCHED', 'DELIVERED');
UPDATE "orders" SET "status" = 'DRAFT' WHERE "status" = 'CANCELLED';

-- Convert the column back to the new enum type
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus" USING "status"::"OrderStatus";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- 3. Add new columns to rcpa_reports table (remove IF NOT EXISTS)
ALTER TABLE "rcpa_reports" ADD COLUMN "reporting_period" "ReportingPeriod";
ALTER TABLE "rcpa_reports" ADD COLUMN "start_date" TIMESTAMP(3);
ALTER TABLE "rcpa_reports" ADD COLUMN "end_date" TIMESTAMP(3);
ALTER TABLE "rcpa_reports" ADD COLUMN "total_prescription" INTEGER;

-- 4. Add new columns to rcpa_drug_data table (remove IF NOT EXISTS)
ALTER TABLE "rcpa_drug_data" ADD COLUMN "own_pack_size" VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE "rcpa_drug_data" ADD COLUMN "competitor_pack_size" VARCHAR(255) NOT NULL DEFAULT '';

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