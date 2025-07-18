/*
  Warnings:

  - You are about to drop the column `isActive` on the `Employee` table. All the data in the column will be lost.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isActive` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `checkInCheckOut` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AssociationType" AS ENUM ('DOCTOR', 'CHEMIST');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "ConsultationType" AS ENUM ('OPD', 'EMERGENCY', 'SURGERY', 'SPECIAL');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('MEETING', 'CALL', 'EMAIL', 'WHATSAPP');

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_organization_id_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "isActive",
DROP COLUMN "organizationId",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "organization_id" SERIAL NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("organization_id");

-- AlterTable
ALTER TABLE "checkInCheckOut" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Hospital" (
    "hospital_id" SERIAL NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "phone" INTEGER NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("hospital_id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "doctor_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "specialization" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "address" TEXT,
    "description" TEXT,
    "profilePictureUrl" VARCHAR(500),
    "qualification" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "DoctorHospitalAssociation" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "department" VARCHAR(255),
    "position" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorHospitalAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorConsultationSchedule" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "consultationType" "ConsultationType" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3),
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorConsultationSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorInteraction" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "interactionType" "InteractionType" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "purpose" TEXT,
    "outcome" TEXT,
    "comments" TEXT,
    "rating" SMALLINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorHospitalAssociation_doctor_id_hospital_id_key" ON "DoctorHospitalAssociation"("doctor_id", "hospital_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorHospitalAssociation" ADD CONSTRAINT "DoctorHospitalAssociation_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorHospitalAssociation" ADD CONSTRAINT "DoctorHospitalAssociation_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("hospital_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorConsultationSchedule" ADD CONSTRAINT "DoctorConsultationSchedule_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorConsultationSchedule" ADD CONSTRAINT "DoctorConsultationSchedule_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("hospital_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorInteraction" ADD CONSTRAINT "DoctorInteraction_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorInteraction" ADD CONSTRAINT "DoctorInteraction_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
