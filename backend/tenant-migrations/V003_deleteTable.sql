DROP TABLE IF EXISTS tour_plan_tasks CASCADE;
DROP TABLE IF EXISTS chemist_tasks CASCADE;
DROP TABLE IF EXISTS doctor_tasks CASCADE;
DROP TABLE IF EXISTS task_planners CASCADE;
DROP TYPE IF EXISTS TaskStatus CASCADE;
DROP TYPE IF EXISTS TaskPlannerStatus CASCADE;

CREATE TYPE "CompletionStatus" AS ENUM ('PENDING', 'COMPLETED', 'RESCHEDULED');
CREATE TYPE "ApprovalStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED','REJECTED');

-- CreateTable
CREATE TABLE "task_planners" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'DRAFT',  -- FIXED: Changed from "status" to "approvalStatus"
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "task_planners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_tasks" (
    "id" TEXT NOT NULL,
    "task_planner_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "taskDate" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "completionStatus" "CompletionStatus" NOT NULL DEFAULT 'PENDING',  -- FIXED: Changed from "competionStatus" to "completionStatus"
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "doctor_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chemist_tasks" (
    "id" TEXT NOT NULL,
    "task_planner_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "chemist_id" TEXT NOT NULL,
    "taskDate" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "completionStatus" "CompletionStatus" NOT NULL DEFAULT 'PENDING',  -- This one was already correct
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "chemist_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_plan_tasks" (
    "id" TEXT NOT NULL,
    "task_planner_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "tour_plan_id" TEXT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "taskDate" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "completionStatus" "CompletionStatus" NOT NULL DEFAULT 'PENDING',  -- This one was already correct
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "tour_plan_tasks_pkey" PRIMARY KEY ("id")
);