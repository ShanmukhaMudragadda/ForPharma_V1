import SchemaManagementService from './src/services/SchemaManagementService.js';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

// Helper functions
const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = <T>(array: T[], count: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Truncate text to fit column constraints
const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) : text;
};

// Create proper time objects for @db.Time fields
const createTimeObject = (hours: number, minutes: number = 0): Date => {
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
};

// Constants
const ORG_ID = '7c65dff4-7631-4e8a-acdf-5a8324acf6a9';
const SCHEMA_NAME = 'org_healthtech_pharma_1754553794138';

const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
const indianStates = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Gujarat', 'Rajasthan'];
const specializations = [
    'General Physician', 'Cardiologist', 'Neurologist', 'Pediatrician',
    'Orthopedic', 'Dermatologist', 'Gynecologist', 'Psychiatrist', 'Oncologist', 'Gastroenterologist'
];
const hospitalTypes = ['Government', 'Private', 'Multi-Specialty', 'Clinic', 'Nursing Home'];

// DATA CLEANUP FUNCTIONS
async function cleanupAllData(tenantDb: any) {
    console.log('🧹 Cleaning up existing data...');
    
    try {
        // Delete in reverse dependency order to avoid foreign key constraints
        await tenantDb.dcrReport.deleteMany({});
        await tenantDb.rcpaDrugData.deleteMany({});
        await tenantDb.rcpaReport.deleteMany({});
        await tenantDb.orderItem.deleteMany({});
        await tenantDb.order.deleteMany({});
        await tenantDb.doctorDistributionDrugItem.deleteMany({});
        await tenantDb.doctorDistributionGiftItem.deleteMany({});
        await tenantDb.doctorDistribution.deleteMany({});
        await tenantDb.userDrugInventory.deleteMany({});
        await tenantDb.userGiftInventory.deleteMany({});
        await tenantDb.gift.deleteMany({});
        await tenantDb.tourPlanReport.deleteMany({});
        await tenantDb.doctorTask.deleteMany({});
        await tenantDb.chemistTask.deleteMany({});
        await tenantDb.tourPlanTask.deleteMany({});
        await tenantDb.taskPlanner.deleteMany({});
        await tenantDb.tourPlan.deleteMany({});
        await tenantDb.expenseClaim.deleteMany({});
        await tenantDb.expenseRoleConfig.deleteMany({});
        await tenantDb.expenseType.deleteMany({});
        await tenantDb.checkIn.deleteMany({});
        await tenantDb.doctorInteraction.deleteMany({});
        await tenantDb.chemistInteraction.deleteMany({});
        await tenantDb.doctorNote.deleteMany({});
        await tenantDb.chemistNote.deleteMany({});
        await tenantDb.doctorChemistRelation.deleteMany({});
        await tenantDb.doctorConsultationSchedule.deleteMany({});
        await tenantDb.doctorHospitalAssociation.deleteMany({});
        await tenantDb.doctor.deleteMany({});
        await tenantDb.chemist.deleteMany({});
        await tenantDb.hospital.deleteMany({});
        await tenantDb.hospitalChain.deleteMany({});
        await tenantDb.chemistChain.deleteMany({});
        await tenantDb.drug.deleteMany({});
        await tenantDb.employeeTerritory.deleteMany({});
        await tenantDb.territory.deleteMany({});
        await tenantDb.employeeTrainingRecord.deleteMany({});
        await tenantDb.team.deleteMany({});
        await tenantDb.auditLog.deleteMany({});
        
        console.log('✅ Cleanup completed');
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        throw error;
    }
}

async function createTerritories(tenantDb: any) {
    console.log('\n📍 Creating territories...');

    const westRegion = await tenantDb.territory.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('West Region', 255),
            type: truncateText('region', 100)
        }
    });

    const maharashtra = await tenantDb.territory.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('Maharashtra', 255),
            type: truncateText('state', 100),
            parentTerritoryId: westRegion.id
        }
    });

    const mumbai = await tenantDb.territory.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('Mumbai', 255),
            type: truncateText('city', 100),
            parentTerritoryId: maharashtra.id
        }
    });

    const pune = await tenantDb.territory.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('Pune', 255),
            type: truncateText('city', 100),
            parentTerritoryId: maharashtra.id
        }
    });

    console.log('✅ Created 4 territories');
    return { westRegion, maharashtra, mumbai, pune };
}

async function assignTerritories(tenantDb: any, territories: any, employees: any) {
    console.log('\n🗺️ Assigning territories...');

    await tenantDb.employeeTerritory.createMany({
        data: [
            {
                employeeId: employees.adminEmployee.id,
                territoryId: territories.westRegion.id,
                assignedAt: new Date(),
                isPrimary: true
            },
            {
                employeeId: employees.salesManager.id,
                territoryId: territories.westRegion.id,
                assignedAt: new Date(),
                isPrimary: true
            },
            {
                employeeId: employees.mr1.id,
                territoryId: territories.mumbai.id,
                assignedAt: new Date(),
                isPrimary: true
            },
            {
                employeeId: employees.mr2.id,
                territoryId: territories.pune.id,
                assignedAt: new Date(),
                isPrimary: true
            }
        ]
    });

    console.log('✅ Territories assigned to employees');
}

async function createHospitalChains(tenantDb: any) {
    console.log('\n🏥 Creating hospital chains...');

    const hospitalChain1 = await tenantDb.hospitalChain.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('Apollo Hospitals', 255),
            headquartersAddress: truncateText('Chennai, Tamil Nadu', 1000),
            contactEmail: truncateText('info@apollohospitals.com', 255),
            contactPhone: truncateText('+91-44-12345678', 20),
            isActive: true
        }
    });

    const hospitalChain2 = await tenantDb.hospitalChain.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('Fortis Healthcare', 255),
            headquartersAddress: truncateText('Gurugram, Haryana', 1000),
            contactEmail: truncateText('info@fortishealthcare.com', 255),
            contactPhone: truncateText('+91-124-1234567', 20),
            isActive: true
        }
    });

    console.log('✅ Created 2 hospital chains');
    return { hospitalChain1, hospitalChain2 };
}

async function createHospitals(tenantDb: any, chains: any, territories: any) {
    console.log('\n🏥 Creating hospitals...');

    const hospitals = [];
    const hospitalData = [
        { name: 'Apollo Hospital Mumbai', chainId: chains.hospitalChain1.id, city: 'Mumbai', territory: territories.mumbai },
        { name: 'Fortis Hospital Mumbai', chainId: chains.hospitalChain2.id, city: 'Mumbai', territory: territories.mumbai },
        { name: 'City General Hospital', chainId: null, city: 'Mumbai', territory: territories.mumbai },
        { name: 'Apollo Hospital Pune', chainId: chains.hospitalChain1.id, city: 'Pune', territory: territories.pune },
        { name: 'Ruby Hall Clinic', chainId: null, city: 'Pune', territory: territories.pune },
        { name: 'Fortis Hospital Pune', chainId: chains.hospitalChain2.id, city: 'Pune', territory: territories.pune }
    ];

    for (const hosp of hospitalData) {
        const hospital = await tenantDb.hospital.create({
            data: {
                organizationId: ORG_ID,
                name: truncateText(hosp.name, 255),
                type: truncateText(getRandomElement(hospitalTypes), 100),
                address: truncateText(faker.location.streetAddress(), 1000),
                city: truncateText(hosp.city, 100),
                state: truncateText('Maharashtra', 100),
                pincode: truncateText(faker.location.zipCode('######'), 10),
                latitude: hosp.city === 'Mumbai' ? 19.0760 : 18.5204,
                longitude: hosp.city === 'Mumbai' ? 72.8777 : 73.8567,
                phone: truncateText(faker.phone.number('+91-##-########'), 20),
                email: truncateText(faker.internet.email(), 255),
                website: truncateText(`https://www.${hosp.name.toLowerCase().replace(/\s/g, '')}.com`, 255),
                hospitalChainId: hosp.chainId,
                territoryId: hosp.territory.id,
                isActive: true
            }
        });
        hospitals.push(hospital);
    }
    
    console.log(`✅ Created ${hospitals.length} hospitals`);
    return hospitals;
}

async function createDoctors(tenantDb: any, hospitals: any, adminEmployee: any) {
    console.log('\n👨‍⚕️ Creating doctors...');

    const doctors = [];
    for (let i = 0; i < 15; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const doctorName = `Dr. ${firstName} ${lastName}`;
        
        const doctor = await tenantDb.doctor.create({
            data: {
                organizationId: ORG_ID,
                name: truncateText(doctorName, 255),
                designation: truncateText(faker.helpers.arrayElement(['Senior Consultant', 'Consultant', 'Junior Consultant', 'HOD']), 255),
                specialization: truncateText(getRandomElement(specializations), 255),
                email: truncateText(faker.internet.email({ firstName: firstName.substring(0, 10), lastName: lastName.substring(0, 10) }), 255),
                phone: truncateText(faker.phone.number('+91-##########'), 20),
                qualification: truncateText(faker.helpers.arrayElement(['MBBS, MD', 'MBBS, MS', 'MBBS, DM', 'MBBS, MCh']), 255),
                experienceYears: faker.number.int({ min: 2, max: 25 }),
                description: truncateText(faker.lorem.sentence({ min: 5, max: 15 }), 1000),
                profilePictureUrl: truncateText(`https://example.com/doctors/${i+1}.jpg`, 500),
                createdById: adminEmployee.id,
                isActive: true
            }
        });
        doctors.push(doctor);

        // Create hospital associations
        const associatedHospitals = getRandomElements(hospitals, faker.number.int({ min: 1, max: 3 }));
        for (let j = 0; j < associatedHospitals.length; j++) {
            await tenantDb.doctorHospitalAssociation.create({
                data: {
                    doctorId: doctor.id,
                    hospitalId: associatedHospitals[j].id,
                    department: truncateText(doctor.specialization, 255),
                    position: truncateText(doctor.designation, 255),
                    isPrimary: j === 0,
                    associationStartDate: faker.date.past()
                }
            });

            // Create consultation schedules
            const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
            const selectedDays = getRandomElements(daysOfWeek, 3);

            for (const day of selectedDays) {
                await tenantDb.doctorConsultationSchedule.create({
                    data: {
                        doctorId: doctor.id,
                        hospitalId: associatedHospitals[j].id,
                        dayOfWeek: day as any,
                        startTime: createTimeObject(10, 0), // 10:00 AM
                        endTime: createTimeObject(13, 0),   // 1:00 PM
                        consultationType: 'OPD',
                        isActive: true
                    }
                });
            }
        }
    }
    
    console.log(`✅ Created ${doctors.length} doctors with associations and schedules`);
    return doctors;
}

async function createChemistChains(tenantDb: any) {
    console.log('\n💊 Creating chemist chains...');

    const chemistChain1 = await tenantDb.chemistChain.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('MedPlus', 255),
            headquartersAddress: truncateText('Hyderabad, Telangana', 1000),
            contactEmail: truncateText('info@medplus.com', 255),
            contactPhone: truncateText('+91-40-12345678', 20),
            isActive: true
        }
    });

    const chemistChain2 = await tenantDb.chemistChain.create({
        data: {
            organizationId: ORG_ID,
            name: truncateText('Apollo Pharmacy', 255),
            headquartersAddress: truncateText('Chennai, Tamil Nadu', 1000),
            contactEmail: truncateText('info@apollopharmacy.com', 255),
            contactPhone: truncateText('+91-44-87654321', 20),
            isActive: true
        }
    });

    console.log('✅ Created 2 chemist chains');
    return { chemistChain1, chemistChain2 };
}

async function createChemists(tenantDb: any, chains: any, territories: any, adminEmployee: any) {
    console.log('\n💊 Creating chemists...');

    const chemists = [];
    const chemistData = [
        { name: 'MedPlus Andheri', chainId: chains.chemistChain1.id, city: 'Mumbai', territory: territories.mumbai },
        { name: 'Apollo Pharmacy Bandra', chainId: chains.chemistChain2.id, city: 'Mumbai', territory: territories.mumbai },
        { name: 'Wellness Forever', chainId: null, city: 'Mumbai', territory: territories.mumbai },
        { name: 'MedPlus Pune', chainId: chains.chemistChain1.id, city: 'Pune', territory: territories.pune },
        { name: 'Apollo Pharmacy Pune', chainId: chains.chemistChain2.id, city: 'Pune', territory: territories.pune },
        { name: 'Noble Medical Stores', chainId: null, city: 'Pune', territory: territories.pune }
    ];

    for (const chem of chemistData) {
        const chemist = await tenantDb.chemist.create({
            data: {
                organizationId: ORG_ID,
                name: truncateText(chem.name, 255),
                type: faker.helpers.arrayElement(['CHEMIST', 'STOCKIST']) as any,
                email: truncateText(faker.internet.email(), 255),
                phone: truncateText(faker.phone.number('+91-##-########'), 20),
                address: truncateText(faker.location.streetAddress(), 1000),
                city: truncateText(chem.city, 100),
                state: truncateText('Maharashtra', 100),
                pincode: truncateText(faker.location.zipCode('######'), 10),
                latitude: chem.city === 'Mumbai' ? 19.0760 : 18.5204,
                longitude: chem.city === 'Mumbai' ? 72.8777 : 73.8567,
                visitingHours: truncateText('9:00 AM - 9:00 PM', 255),
                profilePictureUrl: truncateText(`https://example.com/chemists/${chem.name.toLowerCase().replace(/\s/g, '-')}.jpg`, 500),
                chemistChainId: chem.chainId,
                territoryId: chem.territory.id,
                createdById: adminEmployee.id,
                isActive: true
            }
        });
        chemists.push(chemist);
    }
    
    console.log(`✅ Created ${chemists.length} chemists`);
    return chemists;
}

async function createDoctorChemistRelations(tenantDb: any, doctors: any, chemists: any, employees: any) {
    console.log('\n🔗 Creating doctor-chemist relations...');

    let relationCount = 0;
    for (const doctor of doctors.slice(0, 10)) {
        const nearbyChemists = getRandomElements(chemists, 2);
        for (const chemist of nearbyChemists) {
            await tenantDb.doctorChemistRelation.create({
                data: {
                    doctorId: doctor.id,
                    chemistId: chemist.id,
                    createdById: getRandomElement([employees.adminEmployee.id, employees.salesManager.id, employees.mr1.id, employees.mr2.id])
                }
            });
            relationCount++;
        }
    }
    
    console.log(`✅ Created ${relationCount} doctor-chemist relations`);
}

async function createDrugs(tenantDb: any, adminEmployee: any) {
    console.log('\n💊 Creating drugs...');

    const drugs = [];
    const drugNames = [
        'Paracetamol', 'Amoxicillin', 'Metformin', 'Atorvastatin', 'Omeprazole',
        'Aspirin', 'Clopidogrel', 'Amlodipine', 'Losartan', 'Simvastatin',
        'Ciprofloxacin', 'Azithromycin', 'Pantoprazole', 'Ranitidine', 'Diclofenac'
    ];

    for (let i = 0; i < 15; i++) {
        const drug = await tenantDb.drug.create({
            data: {
                organizationId: ORG_ID,
                name: truncateText(drugNames[i], 255),
                composition: truncateText(faker.lorem.words(3), 1000),
                manufacturer: truncateText(faker.company.name(), 255),
                indications: truncateText(faker.lorem.sentence(), 1000),
                sideEffects: truncateText(faker.lorem.sentence(), 1000),
                safetyAdvice: truncateText(faker.lorem.sentence(), 1000),
                dosageForms: ['Tablet', 'Capsule', 'Syrup'],
                price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
                schedule: truncateText(faker.helpers.arrayElement(['H', 'H1', 'X', 'G']), 10),
                regulatoryApprovals: truncateText('CDSCO Approved', 1000),
                category: truncateText(faker.helpers.arrayElement(['Antibiotic', 'Analgesic', 'Antidiabetic', 'Cardiovascular']), 100),
                isAvailable: true,
                images: [`https://example.com/drugs/${drugNames[i].toLowerCase()}.jpg`],
                marketingMaterials: [`https://example.com/marketing/${drugNames[i].toLowerCase()}.pdf`],
                createdById: adminEmployee.id,
                isActive: true
            }
        });
        drugs.push(drug);
    }
    
    console.log(`✅ Created ${drugs.length} drugs`);
    return drugs;
}

async function createOrders(tenantDb: any, chemists: any, drugs: any, employees: any) {
    console.log('\n📦 Creating orders...');

    const orders = [];
    for (let i = 0; i < 15; i++) {
        const order = await tenantDb.order.create({
            data: {
                organizationId: ORG_ID,
                chemistId: getRandomElement(chemists).id,
                totalAmount: 0, // Will update after adding items
                status: faker.helpers.arrayElement(['DRAFT', 'CONFIRMED']) as any,
                orderDate: faker.date.recent(),
                deliveryDate: faker.date.future(),
                specialInstructions: truncateText(faker.lorem.sentence(), 1000),
                createdById: getRandomElement([employees.mr1.id, employees.mr2.id])
            }
        });

        // Add order items
        const selectedDrugs = getRandomElements(drugs, faker.number.int({ min: 2, max: 5 }));
        let totalAmount = 0;

        for (const drug of selectedDrugs) {
            const quantity = faker.number.int({ min: 10, max: 100 });
            const unitPrice = drug.price || faker.number.float({ min: 10, max: 100, fractionDigits: 2 });
            const subtotal = quantity * Number(unitPrice);
            totalAmount += subtotal;

            await tenantDb.orderItem.create({
                data: {
                    orderId: order.id,
                    drugId: drug.id,
                    quantity,
                    unitPrice,
                    subtotal
                }
            });
        }

        // Update total amount
        await tenantDb.order.update({
            where: { id: order.id },
            data: { totalAmount }
        });

        orders.push(order);
    }
    
    console.log(`✅ Created ${orders.length} orders with items`);
}

async function createDcrReports(tenantDb: any, drugs: any, employees: any) {
    console.log('\n📋 Creating DCR reports...');

    for (let i = 0; i < 15; i++) {
        await tenantDb.dcrReport.create({
            data: {
                organizationId: ORG_ID,
                employeeId: getRandomElement([employees.mr1.id, employees.mr2.id]),
                reportDate: faker.date.recent(),
                productsDiscussed: truncateText(getRandomElements(drugs, 3).map(d => d.name).join(', '), 1000),
                comments: truncateText(faker.lorem.paragraph(), 1000),
                isDraft: faker.datatype.boolean()
            }
        });
    }
    
    console.log('✅ Created 15 DCR reports');
}

async function createRcpaReports(tenantDb: any, chemists: any, drugs: any, employees: any) {
    console.log('\n📊 Creating RCPA reports...');

    for (let i = 0; i < 15; i++) {
        const rcpaReport = await tenantDb.rcpaReport.create({
            data: {
                organizationId: ORG_ID,
                employeeId: getRandomElement([employees.mr1.id, employees.mr2.id]),
                chemistId: getRandomElement(chemists).id,
                reportingPeriod: faker.helpers.arrayElement(['WEEKLY', 'MONTHLY']) as any,
                startDate: faker.date.past(),
                endDate: faker.date.recent(),
                totalPrescription: faker.number.int({ min: 50, max: 500 }),
                remarks: truncateText(faker.lorem.sentence(), 1000)
            }
        });

        // Add RCPA drug data
        const selectedDrugs = getRandomElements(drugs, faker.number.int({ min: 2, max: 4 }));
        for (const drug of selectedDrugs) {
            await tenantDb.rcpaDrugData.create({
                data: {
                    rcpaReportId: rcpaReport.id,
                    drugId: drug.id,
                    competitorDrugName: truncateText(`Competitor ${drug.name}`, 255),
                    ownQuantity: faker.number.int({ min: 20, max: 200 }),
                    competitorQuantity: faker.number.int({ min: 15, max: 150 }),
                    ownPackSize: truncateText(faker.helpers.arrayElement(['10 tablets', '20 capsules', '100ml syrup']), 255),
                    competitorPackSize: truncateText(faker.helpers.arrayElement(['10 tablets', '15 capsules', '120ml syrup']), 255)
                }
            });
        }
    }
    
    console.log('✅ Created 15 RCPA reports with drug data');
}

async function createGiftsAndInventory(tenantDb: any, employees: any, drugs: any) {
    console.log('\n🎁 Creating gifts and inventory...');

    // Create gifts
    const gifts = [];
    const giftNames = ['Pen Set', 'Notebook', 'Calendar', 'Coffee Mug', 'USB Drive'];
    
    for (let i = 0; i < giftNames.length; i++) {
        const gift = await tenantDb.gift.create({
            data: {
                name: truncateText(giftNames[i], 200),
                description: truncateText(faker.lorem.sentence(), 1000),
                unitCost: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
                specifications: { material: faker.lorem.word(), color: faker.color.human() },
                giftImages: [`https://example.com/gifts/${giftNames[i].toLowerCase().replace(' ', '-')}.jpg`],
                createdById: employees.adminEmployee.id,
                isActive: true
            }
        });
        gifts.push(gift);
    }

    // Create user drug inventory
    for (const emp of [employees.mr1, employees.mr2]) {
        const selectedDrugs = getRandomElements(drugs, 10);
        for (const drug of selectedDrugs) {
            await tenantDb.userDrugInventory.create({
                data: {
                    employeeId: emp.id,
                    drugId: drug.id,
                    quantity: faker.number.int({ min: 10, max: 100 }),
                    lastRestockedAt: faker.date.recent()
                }
            });
        }
    }

    // Create user gift inventory
    for (const emp of [employees.mr1, employees.mr2]) {
        for (const gift of gifts) {
            await tenantDb.userGiftInventory.create({
                data: {
                    employeeId: emp.id,
                    giftId: gift.id,
                    quantity: faker.number.int({ min: 5, max: 50 }),
                    lastRestockedAt: faker.date.recent()
                }
            });
        }
    }

    console.log(`✅ Created ${gifts.length} gifts and inventory for MRs`);
    return gifts;
}

async function createExpenseTypes(tenantDb: any) {
    console.log('\n💰 Creating expense types...');

    const expenseTypes = [];
    const expenseData = [
        { name: 'Travel', description: 'Travel expenses', icon: 'car', formFields: { fields: ['distance', 'mode', 'purpose'] } },
        { name: 'Food', description: 'Food and dining', icon: 'utensils', formFields: { fields: ['amount', 'restaurant', 'guests'] } },
        { name: 'Fuel', description: 'Fuel expenses', icon: 'gas-pump', formFields: { fields: ['liters', 'rate', 'vehicle'] } },
        { name: 'Hotel', description: 'Accommodation', icon: 'bed', formFields: { fields: ['nights', 'rate', 'location'] } }
    ];

    for (const expense of expenseData) {
        const expenseType = await tenantDb.expenseType.create({
            data: {
                name: truncateText(expense.name, 50),
                description: truncateText(expense.description, 1000),
                icon: expense.icon,
                formFields: expense.formFields,
                isActive: true
            }
        });

        // Create role configs
        const roles = ['MEDICAL_REPRESENTATIVE', 'SALES_MANAGER'];
        for (const role of roles) {
            await tenantDb.expenseRoleConfig.create({
                data: {
                    expenseTypeId: expenseType.id,
                    role: role as any,
                    limits: { daily: 1000, monthly: 10000 },
                    rates: { standard: 50, premium: 100 },
                    validationRules: { required: ['amount'], max: 5000 },
                    isActive: true
                }
            });
        }

        expenseTypes.push(expenseType);
    }

    console.log(`✅ Created ${expenseTypes.length} expense types with role configs`);
    return expenseTypes;
}

async function createTourPlansAndTasks(tenantDb: any, doctors: any, chemists: any, employees: any) {
    console.log('\n🗺️ Creating tour plans and task planners...');

    // Create Tour Plans
    const tourPlans = [];
    const tourPlanNames = ['City Coverage', 'Hospital Visit', 'Chemist Meet', 'Product Launch', 'Training Program'];

    for (const name of tourPlanNames) {
        const tourPlan = await tenantDb.tourPlan.create({
            data: {
                name: truncateText(name, 255),
                description: truncateText(faker.lorem.sentence(), 1000)
            }
        });
        tourPlans.push(tourPlan);
    }

    // Create Task Planners with tasks
    for (let i = 0; i < 15; i++) {
        const employee = getRandomElement([employees.mr1, employees.mr2]);
        const startDate = faker.date.recent();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7); // 1 week duration

        const taskPlanner = await tenantDb.taskPlanner.create({
            data: {
                employeeId: employee.id,
                startDate,
                endDate,
                status: faker.helpers.arrayElement(['DRAFT', 'PENDING_APPROVAL', 'APPROVED']) as any
            }
        });

        // Create doctor tasks for first 5 planners
        if (i < 5) {
            for (let j = 0; j < 5; j++) {
                const startHour = faker.number.int({ min: 9, max: 11 });
                const endHour = faker.number.int({ min: 12, max: 17 });
                
                await tenantDb.doctorTask.create({
                    data: {
                        plannerId: taskPlanner.id,
                        employeeId: employee.id,
                        doctorId: getRandomElement(doctors).id,
                        taskDate: faker.date.between({ from: startDate, to: endDate }),
                        startTime: createTimeObject(startHour, 0),
                        endTime: createTimeObject(endHour, 0),
                        taskStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED', 'RESCHEDULED']) as any
                    }
                });
            }
        }

        // Create chemist tasks for planners 5-9
        if (i >= 5 && i < 10) {
            for (let j = 0; j < 5; j++) {
                const startHour = faker.number.int({ min: 9, max: 11 });
                const endHour = faker.number.int({ min: 12, max: 17 });
                
                await tenantDb.chemistTask.create({
                    data: {
                        plannerId: taskPlanner.id,
                        employeeId: employee.id,
                        chemistId: getRandomElement(chemists).id,
                        taskDate: faker.date.between({ from: startDate, to: endDate }),
                        startTime: createTimeObject(startHour, 0),
                        endTime: createTimeObject(endHour, 0),
                        taskStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED', 'RESCHEDULED']) as any
                    }
                });
            }
        }

        // Create tour plan tasks for planners 10-14
        if (i >= 10) {
            for (let j = 0; j < 5; j++) {
                const startHour = faker.number.int({ min: 9, max: 11 });
                const endHour = faker.number.int({ min: 12, max: 17 });
                
                await tenantDb.tourPlanTask.create({
                    data: {
                        plannerId: taskPlanner.id,
                        employeeId: employee.id,
                        tourPlanId: getRandomElement(tourPlans).id,
                        location: truncateText(getRandomElement(['Mumbai Central', 'Pune City', 'Andheri West', 'Bandra East']), 255),
                        taskDate: faker.date.between({ from: startDate, to: endDate }),
                        startTime: createTimeObject(startHour, 0),
                        endTime: createTimeObject(endHour, 0),
                        taskStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED', 'RESCHEDULED']) as any
                    }
                });
            }
        }
    }
    
    console.log('✅ Created tour plans and 15 task planners with distributed tasks');
}

async function createCheckIns(tenantDb: any, employees: any) {
    console.log('\n📍 Creating check-ins...');

    for (let i = 0; i < 30; i++) {
        const employee = getRandomElement([employees.mr1, employees.mr2]);
        const checkInTime = faker.date.recent();
        const checkOutTime = new Date(checkInTime);
        checkOutTime.setHours(checkOutTime.getHours() + faker.number.int({ min: 6, max: 10 }));

        await tenantDb.checkIn.create({
            data: {
                organizationId: ORG_ID,
                employeeId: employee.id,
                checkInTime,
                checkOutTime: faker.datatype.boolean() ? checkOutTime : null,
                checkInLatitude: faker.location.latitude({ min: 18, max: 20 }),
                checkInLongitude: faker.location.longitude({ min: 72, max: 74 }),
                checkOutLatitude: faker.datatype.boolean() ? faker.location.latitude({ min: 18, max: 20 }) : null,
                checkOutLongitude: faker.datatype.boolean() ? faker.location.longitude({ min: 72, max: 74 }) : null
            }
        });
    }

    console.log('✅ Created 30 check-in records');
}

async function seedCompleteData() {
    try {
        console.log('🚀 Starting complete database seeding...\n');

        // Initialize schema service
        const schemaService = SchemaManagementService.getInstance();
        await schemaService.initializeMigrations();

        // Get tenant client for the specific schema
        const tenantDb = await schemaService.getTenantClient(SCHEMA_NAME);
        console.log(`📋 Connected to schema: ${SCHEMA_NAME}`);

        // Get existing employees (don't recreate them)
        const adminEmployee = await tenantDb.employee.findFirst({
            where: { role: 'SYSTEM_ADMINISTRATOR' }
        });

        const salesManager = await tenantDb.employee.findFirst({
            where: { role: 'SALES_MANAGER' }
        });

        const medicalReps = await tenantDb.employee.findMany({
            where: { role: 'MEDICAL_REPRESENTATIVE' }
        });

        if (!adminEmployee || !salesManager || medicalReps.length < 2) {
            throw new Error('Required employees not found. Please ensure admin, sales manager, and at least 2 MRs exist.');
        }

        const [mr1, mr2] = medicalReps;
        const employees = { adminEmployee, salesManager, mr1, mr2 };

        console.log('✅ Found existing employees:');
        console.log(`   - Admin: ${adminEmployee.email}`);
        console.log(`   - Sales Manager: ${salesManager.email}`);
        console.log(`   - MR1: ${mr1.email}`);
        console.log(`   - MR2: ${mr2.email}`);

        // Clean up existing data (except employees)
        await cleanupAllData(tenantDb);

        // Create all data step by step
        const territories = await createTerritories(tenantDb);
        await assignTerritories(tenantDb, territories, employees);
        
        const hospitalChains = await createHospitalChains(tenantDb);
        const hospitals = await createHospitals(tenantDb, hospitalChains, territories);
        const doctors = await createDoctors(tenantDb, hospitals, adminEmployee);
        
        const chemistChains = await createChemistChains(tenantDb);
        const chemists = await createChemists(tenantDb, chemistChains, territories, adminEmployee);
        
        await createDoctorChemistRelations(tenantDb, doctors, chemists, employees);
        
        const drugs = await createDrugs(tenantDb, adminEmployee);
        await createOrders(tenantDb, chemists, drugs, employees);
        
        await createDcrReports(tenantDb, drugs, employees);
        await createRcpaReports(tenantDb, chemists, drugs, employees);
        
        const gifts = await createGiftsAndInventory(tenantDb, employees, drugs);
        const expenseTypes = await createExpenseTypes(tenantDb);
        
        await createTourPlansAndTasks(tenantDb, doctors, chemists, employees);
        await createCheckIns(tenantDb, employees);

        // Summary
        console.log('\n✨ SEEDING COMPLETED SUCCESSFULLY!');
        console.log('📊 SUMMARY:');
        console.log('==================');
        console.log('✅ Organization: HealthTech Pharma');
        console.log('✅ Employees: 4 (existing - not recreated)');
        console.log('✅ Territories: 4 (1 Region, 1 State, 2 Cities)');
        console.log(`✅ Hospitals: ${hospitals.length}`);
        console.log(`✅ Doctors: ${doctors.length} with associations and schedules`);
        console.log(`✅ Chemists: ${chemists.length}`);
        console.log('✅ Doctor-Chemist Relations: 20');
        console.log(`✅ Drugs: ${drugs.length}`);
        console.log('✅ Orders: 15 with items');
        console.log('✅ DCR Reports: 15');
        console.log('✅ RCPA Reports: 15 with drug data');
        console.log(`✅ Gifts: ${gifts.length} with inventory`);
        console.log(`✅ Expense Types: ${expenseTypes.length} with role configs`);
        console.log('✅ Task Planners: 15 with distributed tasks');
        console.log('   - 5 with Doctor Tasks (5 each)');
        console.log('   - 5 with Chemist Tasks (5 each)');
        console.log('   - 5 with Tour Plan Tasks (5 each)');
        console.log('✅ Check-ins: 30 records');

        console.log('\n🔐 EXISTING TEST CREDENTIALS:');
        console.log('=============================');
        console.log('Admin: admin@healthtech.net / SecureAdmin123');
        console.log('Manager: sales.manager@healthtech.net / Manager@123');
        console.log('MR1: amit.sharma@healthtech.net / MR@123456');
        console.log('MR2: priya.patel@healthtech.net / MR@123456');

        // Close connections
        await schemaService.closeAllConnections();

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

// Run the seeding
seedCompleteData()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    });