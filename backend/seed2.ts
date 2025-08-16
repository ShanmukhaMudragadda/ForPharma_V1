import { PrismaClient as SharedPrismaClient } from './generated/prisma-shared/index.js';
import { PrismaClient as TenantPrismaClient } from './generated/prisma-tenant/index.js';

// Initialize Prisma clients
const sharedPrisma = new SharedPrismaClient();
const tenantPrisma = new TenantPrismaClient();

async function clearAllData() {
    try {
        console.log('🧹 Starting to clear all data...\n');

        // Clear tenant database tables in correct order to avoid foreign key constraints
        console.log('Clearing tenant database...');

        // Clear sample distribution related tables (NEW - in correct order)
        try {
            await tenantPrisma.sampleDistributionGiftItem.deleteMany();
            console.log('  ✓ Cleared sample distribution gift items');
        } catch (error) {
            console.log('  ⚠ Sample distribution gift items table not found or already empty');
        }

        try {
            await tenantPrisma.sampleDistributionDrugItem.deleteMany();
            console.log('  ✓ Cleared sample distribution drug items');
        } catch (error) {
            console.log('  ⚠ Sample distribution drug items table not found or already empty');
        }

        try {
            await tenantPrisma.sampleDistribution.deleteMany();
            console.log('  ✓ Cleared sample distributions');
        } catch (error) {
            console.log('  ⚠ Sample distributions table not found or already empty');
        }

        // Clear inventory tables (NEW)
        try {
            await tenantPrisma.userGiftInventory.deleteMany();
            console.log('  ✓ Cleared user gift inventory');
        } catch (error) {
            console.log('  ⚠ User gift inventory table not found or already empty');
        }

        try {
            await tenantPrisma.userDrugInventory.deleteMany();
            console.log('  ✓ Cleared user drug inventory');
        } catch (error) {
            console.log('  ⚠ User drug inventory table not found or already empty');
        }

        // Clear gifts table (NEW)
        try {
            await tenantPrisma.gift.deleteMany();
            console.log('  ✓ Cleared gifts');
        } catch (error) {
            console.log('  ⚠ Gifts table not found or already empty');
        }

        // Clear DCR related tables
        try {
            await tenantPrisma.dcrReport.deleteMany();
            console.log('  ✓ Cleared DCR reports');
        } catch (error) {
            console.log('  ⚠ DCR reports table not found or already empty');
        }

        // Clear RCPA related tables
        try {
            await tenantPrisma.rcpaDrugData.deleteMany();
            console.log('  ✓ Cleared RCPA drug data');
        } catch (error) {
            console.log('  ⚠ RCPA drug data table not found or already empty');
        }

        try {
            await tenantPrisma.rcpaReport.deleteMany();
            console.log('  ✓ Cleared RCPA reports');
        } catch (error) {
            console.log('  ⚠ RCPA reports table not found or already empty');
        }

        // Clear order related tables
        try {
            await tenantPrisma.orderItem.deleteMany();
            console.log('  ✓ Cleared order items');
        } catch (error) {
            console.log('  ⚠ Order items table not found or already empty');
        }

        try {
            await tenantPrisma.order.deleteMany();
            console.log('  ✓ Cleared orders');
        } catch (error) {
            console.log('  ⚠ Orders table not found or already empty');
        }

        // Clear interaction tables
        try {
            await tenantPrisma.chemistInteraction.deleteMany();
            console.log('  ✓ Cleared chemist interactions');
        } catch (error) {
            console.log('  ⚠ Chemist interactions table not found or already empty');
        }

        try {
            await tenantPrisma.doctorInteraction.deleteMany();
            console.log('  ✓ Cleared doctor interactions');
        } catch (error) {
            console.log('  ⚠ Doctor interactions table not found or already empty');
        }

        // Clear task related tables
        try {
            await tenantPrisma.tourPlanReport.deleteMany();
            console.log('  ✓ Cleared tour plan reports');
        } catch (error) {
            console.log('  ⚠ Tour plan reports table not found or already empty');
        }

        try {
            await tenantPrisma.tourPlanTask.deleteMany();
            console.log('  ✓ Cleared tour plan tasks');
        } catch (error) {
            console.log('  ⚠ Tour plan tasks table not found or already empty');
        }

        try {
            await tenantPrisma.chemistTask.deleteMany();
            console.log('  ✓ Cleared chemist tasks');
        } catch (error) {
            console.log('  ⚠ Chemist tasks table not found or already empty');
        }

        try {
            await tenantPrisma.doctorTask.deleteMany();
            console.log('  ✓ Cleared doctor tasks');
        } catch (error) {
            console.log('  ⚠ Doctor tasks table not found or already empty');
        }

        try {
            await tenantPrisma.tourPlan.deleteMany();
            console.log('  ✓ Cleared tour plans');
        } catch (error) {
            console.log('  ⚠ Tour plans table not found or already empty');
        }

        try {
            await tenantPrisma.taskPlanner.deleteMany();
            console.log('  ✓ Cleared task planners');
        } catch (error) {
            console.log('  ⚠ Task planners table not found or already empty');
        }

        // Clear relationship tables
        try {
            await tenantPrisma.doctorChemistRelation.deleteMany();
            console.log('  ✓ Cleared doctor-chemist relations');
        } catch (error) {
            console.log('  ⚠ Doctor-chemist relations table not found or already empty');
        }

        // Clear notes
        try {
            await tenantPrisma.chemistNote.deleteMany();
            console.log('  ✓ Cleared chemist notes');
        } catch (error) {
            console.log('  ⚠ Chemist notes table not found or already empty');
        }

        try {
            await tenantPrisma.doctorNote.deleteMany();
            console.log('  ✓ Cleared doctor notes');
        } catch (error) {
            console.log('  ⚠ Doctor notes table not found or already empty');
        }

        // Clear doctor related tables
        try {
            await tenantPrisma.doctorConsultationSchedule.deleteMany();
            console.log('  ✓ Cleared doctor consultation schedules');
        } catch (error) {
            console.log('  ⚠ Doctor consultation schedules table not found or already empty');
        }

        try {
            await tenantPrisma.doctorHospitalAssociation.deleteMany();
            console.log('  ✓ Cleared doctor-hospital associations');
        } catch (error) {
            console.log('  ⚠ Doctor-hospital associations table not found or already empty');
        }

        // Clear drug table
        try {
            await tenantPrisma.drug.deleteMany();
            console.log('  ✓ Cleared drugs');
        } catch (error) {
            console.log('  ⚠ Drugs table not found or already empty');
        }

        // Clear chemist and doctor tables
        try {
            await tenantPrisma.chemist.deleteMany();
            console.log('  ✓ Cleared chemists');
        } catch (error) {
            console.log('  ⚠ Chemists table not found or already empty');
        }

        try {
            await tenantPrisma.doctor.deleteMany();
            console.log('  ✓ Cleared doctors');
        } catch (error) {
            console.log('  ⚠ Doctors table not found or already empty');
        }

        // Clear hospital related tables
        try {
            await tenantPrisma.hospital.deleteMany();
            console.log('  ✓ Cleared hospitals');
        } catch (error) {
            console.log('  ⚠ Hospitals table not found or already empty');
        }

        try {
            await tenantPrisma.chemistChain.deleteMany();
            console.log('  ✓ Cleared chemist chains');
        } catch (error) {
            console.log('  ⚠ Chemist chains table not found or already empty');
        }

        try {
            await tenantPrisma.hospitalChain.deleteMany();
            console.log('  ✓ Cleared hospital chains');
        } catch (error) {
            console.log('  ⚠ Hospital chains table not found or already empty');
        }

        // Clear employee related tables
        try {
            await tenantPrisma.employeeTerritory.deleteMany();
            console.log('  ✓ Cleared employee territories');
        } catch (error) {
            console.log('  ⚠ Employee territories table not found or already empty');
        }

        try {
            await tenantPrisma.territory.deleteMany();
            console.log('  ✓ Cleared territories');
        } catch (error) {
            console.log('  ⚠ Territories table not found or already empty');
        }

        try {
            await tenantPrisma.employee.deleteMany();
            console.log('  ✓ Cleared employees');
        } catch (error) {
            console.log('  ⚠ Employees table not found or already empty');
        }

        // Clear shared database tables
        console.log('\nClearing shared database...');

        try {
            await sharedPrisma.user.deleteMany();
            console.log('  ✓ Cleared users');
        } catch (error) {
            console.log('  ⚠ Users table not found or already empty');
        }

        try {
            await sharedPrisma.organization.deleteMany();
            console.log('  ✓ Cleared organizations');
        } catch (error) {
            console.log('  ⚠ Organizations table not found or already empty');
        }

        console.log('\n✅ All data cleared successfully!');

    } catch (error) {
        console.error('❌ Error clearing data:', error);
        throw error;
    } finally {
        await sharedPrisma.$disconnect();
        await tenantPrisma.$disconnect();
    }
}

async function clearOnlySampleDistributionData() {
    try {
        console.log('🧹 Clearing only sample distribution related data...\n');

        // Clear sample distribution related tables only
        console.log('Clearing sample distribution data...');

        try {
            await tenantPrisma.sampleDistributionGiftItem.deleteMany();
            console.log('  ✓ Cleared sample distribution gift items');
        } catch (error) {
            console.log('  ⚠ Sample distribution gift items table not found or already empty');
        }

        try {
            await tenantPrisma.sampleDistributionDrugItem.deleteMany();
            console.log('  ✓ Cleared sample distribution drug items');
        } catch (error) {
            console.log('  ⚠ Sample distribution drug items table not found or already empty');
        }

        try {
            await tenantPrisma.sampleDistribution.deleteMany();
            console.log('  ✓ Cleared sample distributions');
        } catch (error) {
            console.log('  ⚠ Sample distributions table not found or already empty');
        }

        try {
            await tenantPrisma.userGiftInventory.deleteMany();
            console.log('  ✓ Cleared user gift inventory');
        } catch (error) {
            console.log('  ⚠ User gift inventory table not found or already empty');
        }

        try {
            await tenantPrisma.userDrugInventory.deleteMany();
            console.log('  ✓ Cleared user drug inventory');
        } catch (error) {
            console.log('  ⚠ User drug inventory table not found or already empty');
        }

        try {
            await tenantPrisma.gift.deleteMany();
            console.log('  ✓ Cleared gifts');
        } catch (error) {
            console.log('  ⚠ Gifts table not found or already empty');
        }

        console.log('\n✅ Sample distribution data cleared successfully!');

    } catch (error) {
        console.error('❌ Error clearing sample distribution data:', error);
        throw error;
    } finally {
        await tenantPrisma.$disconnect();
    }
}

// Check command line arguments
const args = process.argv.slice(2);
const onlySampleDistribution = args.includes('--sample-only');

// Run the appropriate clearing function
if (onlySampleDistribution) {
    clearOnlySampleDistributionData()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        });
} else {
    clearAllData()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        });
}