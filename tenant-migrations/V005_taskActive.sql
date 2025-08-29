-- Add isActive column to tour_plan_tasks table
ALTER TABLE tour_plan_tasks 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Add isActive column to chemist_tasks table
ALTER TABLE chemist_tasks 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Add isActive column to doctor_tasks table
ALTER TABLE doctor_tasks 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;