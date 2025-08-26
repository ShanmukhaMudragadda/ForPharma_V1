-- Add isActive column to task_planners table
ALTER TABLE task_planners 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;





