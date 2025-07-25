/*
  Warnings:

  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DoctorConsultationSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DoctorHospitalAssociation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DoctorInteraction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checkInCheckOut` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DoctorConsultationSchedule" DROP CONSTRAINT "DoctorConsultationSchedule_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorConsultationSchedule" DROP CONSTRAINT "DoctorConsultationSchedule_hospital_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorHospitalAssociation" DROP CONSTRAINT "DoctorHospitalAssociation_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorHospitalAssociation" DROP CONSTRAINT "DoctorHospitalAssociation_hospital_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorInteraction" DROP CONSTRAINT "DoctorInteraction_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorInteraction" DROP CONSTRAINT "DoctorInteraction_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_reportingManagerId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "checkInCheckOut" DROP CONSTRAINT "checkInCheckOut_employee_id_fkey";

-- DropTable
DROP TABLE "Doctor";

-- DropTable
DROP TABLE "DoctorConsultationSchedule";

-- DropTable
DROP TABLE "DoctorHospitalAssociation";

-- DropTable
DROP TABLE "DoctorInteraction";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Hospital";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "checkInCheckOut";

-- DropEnum
DROP TYPE "AssociationType";

-- DropEnum
DROP TYPE "ConsultationType";

-- DropEnum
DROP TYPE "DayOfWeek";

-- DropEnum
DROP TYPE "InteractionType";

-- DropEnum
DROP TYPE "TaskStatus";

-- DropEnum
DROP TYPE "TaskType";

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "schemaName" VARCHAR(100),
    "address" TEXT,
    "contact_email" VARCHAR(255) NOT NULL,
    "contact_phone" VARCHAR(20),
    "website" VARCHAR(255),
    "settings" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100),
    "phone" VARCHAR(20),
    "profile_pic" TEXT,
    "role" "EmployeeRole" NOT NULL,
    "reporting_manager_id" TEXT,
    "team_id" TEXT,
    "employee_code" VARCHAR(50),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "assignedLatitude" DECIMAL(10,8),
    "assignedLongitude" DECIMAL(11,8),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_schemaName_key" ON "organizations"("schemaName");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_reporting_manager_id_fkey" FOREIGN KEY ("reporting_manager_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
