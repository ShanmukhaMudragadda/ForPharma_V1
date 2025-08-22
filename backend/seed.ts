import { PrismaClient as SharedPrismaClient } from './generated/prisma-shared/index.js';
import { PrismaClient as TenantPrismaClient } from './generated/prisma-tenant/index.js';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

// Initialize Prisma clients
const sharedPrisma = new SharedPrismaClient();
const tenantPrisma = new TenantPrismaClient();

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

const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

// Constants
const ADMIN_EMAIL = 'admin@medicarepharma.com';
const ADMIN_PASSWORD = 'Admin@123';

// Generate Indian cities and states
const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
const indianStates = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Gujarat', 'Rajasthan'];

// Medical specializations
const specializations = [
    'General Physician', 'Cardiologist', 'Neurologist', 'Pediatrician',
    'Orthopedic', 'Dermatologist', 'Gynecologist', 'Psychiatrist'
];

// Hospital types
const hospitalTypes = ['Government', 'Private', 'Multi-Specialty', 'Clinic', 'Nursing Home'];

// Drug compositions and categories
const drugData = [
    { name: 'Paracetamol 500mg', composition: 'Paracetamol 500mg', category: 'Analgesic', manufacturer: 'MediCare Pharma' },
    { name: 'Amoxicillin 250mg', composition: 'Amoxicillin 250mg', category: 'Antibiotic', manufacturer: 'MediCare Pharma' },
    { name: 'Omeprazole 20mg', composition: 'Omeprazole 20mg', category: 'PPI', manufacturer: 'MediCare Pharma' },
    { name: 'Metformin 500mg', composition: 'Metformin HCl 500mg', category: 'Antidiabetic', manufacturer: 'MediCare Pharma' },
    { name: 'Amlodipine 5mg', composition: 'Amlodipine 5mg', category: 'Antihypertensive', manufacturer: 'MediCare Pharma' },
    { name: 'Atorvastatin 10mg', composition: 'Atorvastatin 10mg', category: 'Statin', manufacturer: 'MediCare Pharma' },
    { name: 'Cetirizine 10mg', composition: 'Cetirizine HCl 10mg', category: 'Antihistamine', manufacturer: 'MediCare Pharma' },
    { name: 'Azithromycin 500mg', composition: 'Azithromycin 500mg', category: 'Antibiotic', manufacturer: 'MediCare Pharma' },
    { name: 'Diclofenac 50mg', composition: 'Diclofenac Sodium 50mg', category: 'NSAID', manufacturer: 'MediCare Pharma' },
    { name: 'Ranitidine 150mg', composition: 'Ranitidine 150mg', category: 'H2 Blocker', manufacturer: 'MediCare Pharma' },
    { name: 'Vitamin D3 60K', composition: 'Cholecalciferol 60000 IU', category: 'Vitamin', manufacturer: 'MediCare Pharma' },
    { name: 'B-Complex Forte', composition: 'Vitamin B Complex', category: 'Vitamin', manufacturer: 'MediCare Pharma' }
];

// Gift data with images (Created by Admin)
const giftData = [
    {
        name: 'Medical Stethoscope',
        description: 'High-quality dual-head stethoscope for medical professionals',
        unitCost: 2500.00,
        specifications: {
            material: 'Stainless Steel',
            weight: '150g',
            tubeLength: '56cm',
            warranty: '2 years'
        },
        images: [
            'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
        ]
    },
    {
        name: 'Digital Blood Pressure Monitor',
        description: 'Automatic digital BP monitor with large LCD display',
        unitCost: 3500.00,
        specifications: {
            type: 'Digital Automatic',
            cuffSize: 'Standard Adult',
            memory: '90 readings',
            powerSource: 'AC Adapter/Batteries'
        },
        images: [
            'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400',
            'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400'
        ]
    },
    {
        name: 'Medical Reference Book Set',
        description: 'Complete set of medical reference books for practitioners',
        unitCost: 1500.00,
        specifications: {
            volumes: '3 Books',
            pages: '2500+ pages total',
            binding: 'Hardcover',
            language: 'English'
        },
        images: [
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        ]
    },
    {
        name: 'Premium Pen Set',
        description: 'Elegant metal pen set with company branding',
        unitCost: 800.00,
        specifications: {
            material: 'Stainless Steel',
            inkType: 'Blue/Black',
            packaging: 'Gift Box',
            engraving: 'Company Logo'
        },
        images: [
            'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400',
            'https://images.unsplash.com/photo-1586953135024-ca0b06b7ad43?w=400'
        ]
    },
    {
        name: 'Medical Calculator',
        description: 'Scientific calculator with medical functions',
        unitCost: 1200.00,
        specifications: {
            functions: '350+ functions',
            display: 'LCD with backlight',
            battery: 'Solar + Battery',
            memory: '9 variables'
        },
        images: [
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
            'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400'
        ]
    },
    {
        name: 'Desktop Calendar',
        description: 'Professional desk calendar with medical facts',
        unitCost: 600.00,
        specifications: {
            size: '8x6 inches',
            pages: '365 pages',
            binding: 'Spiral bound',
            content: 'Medical tips daily'
        },
        images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400'
        ]
    },
    {
        name: 'Coffee Mug Set',
        description: 'Set of 2 ceramic mugs with medical themes',
        unitCost: 500.00,
        specifications: {
            material: 'Ceramic',
            capacity: '350ml each',
            design: 'Medical themed',
            dishwasherSafe: true
        },
        images: [
            'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400',
            'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400'
        ]
    },
    {
        name: 'Medical Keychain',
        description: 'Metal keychain with medical symbol',
        unitCost: 300.00,
        specifications: {
            material: 'Zinc Alloy',
            design: 'Caduceus Symbol',
            finish: 'Antique Silver',
            packaging: 'Velvet pouch'
        },
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'
        ]
    }
];

async function seedSharedDatabase() {
    console.log('🌱 Seeding shared database...');

    // Create organization
    const org = await sharedPrisma.organization.create({
        data: {
            name: 'MediCare Pharmaceuticals',
            schemaName: 'Forsys1', // Updated to use Forsys1 schema
            address: '123, Pharma Park, Mumbai, Maharashtra 400001',
            contactEmail: 'info@medicarepharma.com',
            contactPhone: '+91-22-12345678',
            website: 'www.medicarepharma.com',
            settings: {
                timezone: 'Asia/Kolkata',
                currency: 'INR',
                financialYear: 'April-March'
            },
            isActive: true
        }
    });

    // Create admin user in shared database
    const hashedPassword = await hashPassword(ADMIN_PASSWORD);
    const adminUser = await sharedPrisma.user.create({
        data: {
            organizationId: org.id,
            role: 'SYSTEM_ADMINISTRATOR',
            email: ADMIN_EMAIL,
            password: hashedPassword,
            isActive: true
        }
    });

    console.log('✅ Organization and admin user created in shared database');
    console.log(`   - Organization: ${org.name} (ID: ${org.id})`);
    console.log(`   - Admin Email: ${adminUser.email}`);

    return { organization: org, adminUser, hashedPassword };
}

async function seedTenantDatabase(organizationId: string, hashedPassword: string) {
    console.log('\n🌱 Seeding tenant database...');

    // Step 1: Create admin employee in tenant schema
    const adminEmployee = await tenantPrisma.employee.create({
        data: {
            organizationId: organizationId,
            email: ADMIN_EMAIL,
            passwordHash: hashedPassword,
            firstName: 'System',
            lastName: 'Administrator',
            phone: '+91-9876543210',
            role: 'SYSTEM_ADMINISTRATOR',
            employeeCode: 'EMP001',
            city: 'Mumbai',
            state: 'Maharashtra',
            isActive: true
        }
    });
    console.log('✅ Admin employee created in tenant database');

    // Step 2: Create territories (hierarchical structure)
    console.log('\n🗺️ Creating territories...');

    // Create region
    const westRegion = await tenantPrisma.territory.create({
        data: {
            organizationId: organizationId,
            name: 'West Region',
            type: 'region'
        }
    });

    // Create state
    const maharashtra = await tenantPrisma.territory.create({
        data: {
            organizationId: organizationId,
            name: 'Maharashtra',
            type: 'state',
            parentTerritoryId: westRegion.id
        }
    });

    // Create cities
    const mumbai = await tenantPrisma.territory.create({
        data: {
            organizationId: organizationId,
            name: 'Mumbai',
            type: 'city',
            parentTerritoryId: maharashtra.id
        }
    });

    const pune = await tenantPrisma.territory.create({
        data: {
            organizationId: organizationId,
            name: 'Pune',
            type: 'city',
            parentTerritoryId: maharashtra.id
        }
    });

    // Assign territory to admin
    await tenantPrisma.employeeTerritory.create({
        data: {
            employeeId: adminEmployee.id,
            territoryId: westRegion.id,
            assignedAt: new Date(),
            isPrimary: true
        }
    });

    console.log('✅ Territories created and assigned');

    // Step 3: Create additional employees for testing
    console.log('\n👥 Creating additional employees...');

    // Sales Manager
    const salesManager = await tenantPrisma.employee.create({
        data: {
            organizationId: organizationId,
            email: 'sales.manager@medicarepharma.com',
            passwordHash: await hashPassword('Manager@123'),
            firstName: 'Rajesh',
            lastName: 'Kumar',
            phone: '+91-9876543211',
            role: 'SALES_MANAGER',
            employeeCode: 'EMP002',
            city: 'Mumbai',
            state: 'Maharashtra',
            reportingManagerId: adminEmployee.id,
            isActive: true
        }
    });

    // Medical Representatives - Assign specific territories
    const mr1 = await tenantPrisma.employee.create({
        data: {
            organizationId: organizationId,
            email: 'amit.patel@medicarepharma.com',
            passwordHash: await hashPassword('MR@123456'),
            firstName: 'Amit',
            lastName: 'Patel',
            phone: '+91-9876543212',
            role: 'MEDICAL_REPRESENTATIVE',
            employeeCode: 'EMP003',
            city: 'Mumbai',
            state: 'Maharashtra',
            reportingManagerId: salesManager.id,
            isActive: true
        }
    });

    const mr2 = await tenantPrisma.employee.create({
        data: {
            organizationId: organizationId,
            email: 'priya.shah@medicarepharma.com',
            passwordHash: await hashPassword('MR@123456'),
            firstName: 'Priya',
            lastName: 'Shah',
            phone: '+91-9876543213',
            role: 'MEDICAL_REPRESENTATIVE',
            employeeCode: 'EMP004',
            city: 'Pune',
            state: 'Maharashtra',
            reportingManagerId: salesManager.id,
            isActive: true
        }
    });

    // Assign territories to employees - MR1 to Mumbai, MR2 to Pune
    await tenantPrisma.employeeTerritory.createMany({
        data: [
            {
                employeeId: salesManager.id,
                territoryId: maharashtra.id,
                assignedAt: new Date(),
                isPrimary: true
            },
            {
                employeeId: mr1.id,
                territoryId: mumbai.id,
                assignedAt: new Date(),
                isPrimary: true
            },
            {
                employeeId: mr2.id,
                territoryId: pune.id,
                assignedAt: new Date(),
                isPrimary: true
            }
        ]
    });

    console.log('✅ Employees created with proper territory assignments');

    // Step 4: Create hospital chains
    console.log('\n🏥 Creating hospital chains...');

    const hospitalChain = await tenantPrisma.hospitalChain.create({
        data: {
            organizationId: organizationId,
            name: 'Apollo Hospitals',
            headquartersAddress: 'Chennai, Tamil Nadu',
            contactEmail: 'info@apollohospitals.com',
            contactPhone: '+91-44-12345678',
            isActive: true
        }
    });

    // Step 5: Create hospitals
    console.log('\n🏥 Creating hospitals...');

    const hospitals = [];
    const hospitalData = [
        { name: 'Apollo Hospital Mumbai', chainId: hospitalChain.id, city: 'Mumbai', territory: mumbai },
        { name: 'City General Hospital', chainId: null, city: 'Mumbai', territory: mumbai },
        { name: 'Apollo Hospital Pune', chainId: hospitalChain.id, city: 'Pune', territory: pune },
        { name: 'Ruby Hall Clinic', chainId: null, city: 'Pune', territory: pune }
    ];

    for (const hosp of hospitalData) {
        const hospital = await tenantPrisma.hospital.create({
            data: {
                organizationId: organizationId,
                name: hosp.name,
                type: getRandomElement(hospitalTypes),
                address: faker.location.streetAddress().substring(0, 200), // Limit to fit TEXT constraint
                city: hosp.city,
                state: 'Maharashtra',
                pincode: faker.location.zipCode('######'),
                latitude: hosp.city === 'Mumbai' ? 19.0760 : 18.5204,
                longitude: hosp.city === 'Mumbai' ? 72.8777 : 73.8567,
                phone: faker.phone.number('+91-##-########').substring(0, 20), // Limit to 20 chars
                email: faker.internet.email().substring(0, 255), // Limit to 255 chars
                hospitalChainId: hosp.chainId,
                territoryId: hosp.territory.id,
                isActive: true
            }
        });
        hospitals.push(hospital);
    }
    console.log(`✅ Created ${hospitals.length} hospitals`);

    // Step 6: Create doctors - Split between Mumbai and Pune
    console.log('\n👨‍⚕️ Creating doctors...');

    const doctors = [];
    const mumbaiHospitals = hospitals.filter(h => h.city === 'Mumbai');
    const puneHospitals = hospitals.filter(h => h.city === 'Pune');

    // Create 5 doctors in Mumbai
    for (let i = 0; i < 5; i++) {
        const doctor = await tenantPrisma.doctor.create({
            data: {
                organizationId: organizationId,
                name: `Dr. ${faker.person.firstName()} ${faker.person.lastName()}`.substring(0, 255), // Limit to 255 chars
                designation: faker.helpers.arrayElement(['Senior Consultant', 'Consultant', 'Junior Consultant']).substring(0, 255),
                specialization: getRandomElement(specializations).substring(0, 255),
                email: faker.internet.email().substring(0, 255),
                phone: faker.phone.number('+91-98#######').substring(0, 20), // Limit to 20 chars
                qualification: faker.helpers.arrayElement(['MBBS, MD', 'MBBS, MS', 'MBBS, DM']).substring(0, 255),
                experienceYears: faker.number.int({ min: 2, max: 20 }),
                description: faker.lorem.sentence().substring(0, 500), // Limit description
                createdById: adminEmployee.id,
                isActive: true
            }
        });
        doctors.push(doctor);

        // Associate with Mumbai hospitals
        const selectedHospitals = getRandomElements(mumbaiHospitals, faker.number.int({ min: 1, max: 2 }));
        for (let j = 0; j < selectedHospitals.length; j++) {
            await tenantPrisma.doctorHospitalAssociation.create({
                data: {
                    doctorId: doctor.id,
                    hospitalId: selectedHospitals[j].id,
                    department: doctor.specialization,
                    position: doctor.designation,
                    isPrimary: j === 0,
                    associationStartDate: faker.date.past()
                }
            });
        }
    }

    // Create 5 doctors in Pune
    for (let i = 0; i < 5; i++) {
        const doctor = await tenantPrisma.doctor.create({
            data: {
                organizationId: organizationId,
                name: `Dr. ${faker.person.firstName()} ${faker.person.lastName()}`.substring(0, 255), // Limit to 255 chars
                designation: faker.helpers.arrayElement(['Senior Consultant', 'Consultant', 'Junior Consultant']).substring(0, 255),
                specialization: getRandomElement(specializations).substring(0, 255),
                email: faker.internet.email().substring(0, 255),
                phone: faker.phone.number('+91-98#######').substring(0, 20), // Limit to 20 chars
                qualification: faker.helpers.arrayElement(['MBBS, MD', 'MBBS, MS', 'MBBS, DM']).substring(0, 255),
                experienceYears: faker.number.int({ min: 2, max: 20 }),
                description: faker.lorem.sentence().substring(0, 500), // Limit description
                createdById: adminEmployee.id,
                isActive: true
            }
        });
        doctors.push(doctor);

        // Associate with Pune hospitals
        const selectedHospitals = getRandomElements(puneHospitals, faker.number.int({ min: 1, max: 2 }));
        for (let j = 0; j < selectedHospitals.length; j++) {
            await tenantPrisma.doctorHospitalAssociation.create({
                data: {
                    doctorId: doctor.id,
                    hospitalId: selectedHospitals[j].id,
                    department: doctor.specialization,
                    position: doctor.designation,
                    isPrimary: j === 0,
                    associationStartDate: faker.date.past()
                }
            });
        }
    }

    const mumbaiDoctors = doctors.slice(0, 5);
    const puneDoctors = doctors.slice(5, 10);

    console.log(`✅ Created ${doctors.length} doctors (5 Mumbai, 5 Pune)`);

    // Step 7: Create chemist chain
    console.log('\n💊 Creating chemist chains...');

    const chemistChain = await tenantPrisma.chemistChain.create({
        data: {
            organizationId: organizationId,
            name: 'MedPlus',
            headquartersAddress: 'Hyderabad, Telangana',
            contactEmail: 'info@medplus.com',
            contactPhone: '+91-40-12345678',
            isActive: true
        }
    });

    // Step 8: Create 6 chemists - 3 in Mumbai, 3 in Pune
    console.log('\n💊 Creating 6 chemists...');

    const chemists = [];
    const chemistData = [
        // Mumbai chemists
        { name: 'MedPlus Andheri', chainId: chemistChain.id, city: 'Mumbai', territory: mumbai },
        { name: 'Wellness Forever Bandra', chainId: null, city: 'Mumbai', territory: mumbai },
        { name: 'Apollo Pharmacy Mumbai', chainId: null, city: 'Mumbai', territory: mumbai },
        // Pune chemists
        { name: 'MedPlus Pune', chainId: chemistChain.id, city: 'Pune', territory: pune },
        { name: 'Noble Medical Stores', chainId: null, city: 'Pune', territory: pune },
        { name: 'Health Plus Pharmacy', chainId: null, city: 'Pune', territory: pune }
    ];

    for (const chem of chemistData) {
        const chemist = await tenantPrisma.chemist.create({
            data: {
                organizationId: organizationId,
                name: chem.name.substring(0, 255), // Limit to 255 chars
                type: faker.helpers.arrayElement(['CHEMIST', 'STOCKIST']) as any,
                email: faker.internet.email().substring(0, 255),
                phone: faker.phone.number('+91-##-#####').substring(0, 20), // Limit to 20 chars
                address: faker.location.streetAddress().substring(0, 200), // Limit address
                city: chem.city,
                state: 'Maharashtra',
                pincode: faker.location.zipCode('######').substring(0, 10), // Limit to 10 chars
                latitude: chem.city === 'Mumbai' ? 19.0760 : 18.5204,
                longitude: chem.city === 'Mumbai' ? 72.8777 : 73.8567,
                visitingHours: '9:00 AM - 9:00 PM',
                chemistChainId: chem.chainId,
                territoryId: chem.territory.id,
                createdById: adminEmployee.id,
                isActive: true
            }
        });
        chemists.push(chemist);
    }

    const mumbaiChemists = chemists.slice(0, 3);
    const puneChemists = chemists.slice(3, 6);

    console.log(`✅ Created ${chemists.length} chemists (3 Mumbai, 3 Pune)`);

    // Step 9: Create 12 drugs
    console.log('\n💊 Creating 12 drugs...');

    const drugs = [];
    for (const drug of drugData) {
        const createdDrug = await tenantPrisma.drug.create({
            data: {
                organizationId: organizationId,
                name: drug.name.substring(0, 255), // Limit to 255 chars
                composition: drug.composition.substring(0, 500), // Limit TEXT field
                manufacturer: drug.manufacturer.substring(0, 255),
                category: drug.category.substring(0, 100), // Limit to 100 chars
                price: faker.number.float({ min: 50, max: 500, multipleOf: 0.01 }),
                indications: faker.lorem.sentence().substring(0, 500),
                sideEffects: faker.lorem.sentence().substring(0, 500),
                safetyAdvice: faker.lorem.sentence().substring(0, 500),
                dosageForms: ['Tablet', 'Capsule', 'Syrup'],
                schedule: faker.helpers.arrayElement(['H', 'H1', 'X', null]),
                isAvailable: true,
                createdById: adminEmployee.id,
                isActive: true
            }
        });
        drugs.push(createdDrug);
    }
    console.log(`✅ Created ${drugs.length} drugs`);

    // Step 10: Create gifts (by Admin only)
    console.log('\n🎁 Creating gifts (by Admin)...');
    const gifts = [];

    for (const giftInfo of giftData) {
        const gift = await tenantPrisma.gift.create({
            data: {
                name: giftInfo.name.substring(0, 200), // Limit to 200 chars
                description: giftInfo.description.substring(0, 500), // Limit TEXT field
                unitCost: giftInfo.unitCost,
                specifications: giftInfo.specifications,
                giftImages: giftInfo.images,
                createdById: adminEmployee.id, // Created by Admin
                isActive: true
            }
        });
        gifts.push(gift);
    }
    console.log(`✅ Created ${gifts.length} gifts`);

    // Step 11: Create User Inventories for MR Amit only
    console.log('\n📦 Creating inventories for MR Amit...');

    // Create Drug Inventory for Amit
    const drugInventories = [];
    for (const drug of drugs) {
        const inventory = await tenantPrisma.userDrugInventory.create({
            data: {
                employeeId: mr1.id, // Amit
                drugId: drug.id,
                quantity: faker.number.int({ min: 50, max: 200 }),
                lastRestockedAt: faker.date.recent({ days: 30 })
            }
        });
        drugInventories.push(inventory);
    }

    // Create Gift Inventory for Amit
    const giftInventories = [];
    for (const gift of gifts) {
        const inventory = await tenantPrisma.userGiftInventory.create({
            data: {
                employeeId: mr1.id, // Amit
                giftId: gift.id,
                quantity: faker.number.int({ min: 10, max: 50 }),
                lastRestockedAt: faker.date.recent({ days: 30 })
            }
        });
        giftInventories.push(inventory);
    }

    console.log(`✅ Created inventories for Amit: ${drugInventories.length} drugs, ${giftInventories.length} gifts`);

    // Step 12: Create Sample Distributions for Amit (Mumbai territory only)
    console.log('\n🎯 Creating sample distributions for Amit...');

    const sampleDistributions = [];

    // Create 5 distributions to Mumbai doctors
    for (let i = 0; i < 5; i++) {
        const selectedDoctor = getRandomElement(mumbaiDoctors);

        const distribution = await tenantPrisma.sampleDistribution.create({
            data: {
                doctorId: selectedDoctor.id,
                chemistId: null,
                employeeId: mr1.id, // Amit
                distributedAt: faker.date.recent({ days: 30 })
            }
        });

        // Add 2-3 drug items per distribution
        const drugItemCount = faker.number.int({ min: 2, max: 3 });
        const selectedDrugInventories = getRandomElements(drugInventories, drugItemCount);

        for (const drugInventory of selectedDrugInventories) {
            const quantity = faker.number.int({ min: 5, max: 20 });
            const unitCost = Number(drugInventory.drug?.price || 100);

            await tenantPrisma.sampleDistributionDrugItem.create({
                data: {
                    sampleDistributionId: distribution.id,
                    fromInventoryId: drugInventory.id,
                    quantity: quantity,
                    unitCost: unitCost,
                    totalCost: quantity * unitCost
                }
            });

            // Update inventory (reduce quantity)
            await tenantPrisma.userDrugInventory.update({
                where: { id: drugInventory.id },
                data: { quantity: { decrement: quantity } }
            });
        }

        // Add 1-2 gift items per distribution
        const giftItemCount = faker.number.int({ min: 1, max: 2 });
        const selectedGiftInventories = getRandomElements(giftInventories, giftItemCount);

        for (const giftInventory of selectedGiftInventories) {
            const quantity = faker.number.int({ min: 1, max: 3 });
            const unitCost = Number(giftInventory.gift?.unitCost || 500);

            await tenantPrisma.sampleDistributionGiftItem.create({
                data: {
                    sampleDistributionId: distribution.id,
                    fromInventoryId: giftInventory.id,
                    quantity: quantity,
                    unitCost: unitCost,
                    totalCost: quantity * unitCost
                }
            });

            // Update inventory (reduce quantity)
            await tenantPrisma.userGiftInventory.update({
                where: { id: giftInventory.id },
                data: { quantity: { decrement: quantity } }
            });
        }

        sampleDistributions.push(distribution);
    }

    // Create 3 distributions to Mumbai chemists
    for (let i = 0; i < 3; i++) {
        const selectedChemist = getRandomElement(mumbaiChemists);

        const distribution = await tenantPrisma.sampleDistribution.create({
            data: {
                doctorId: null,
                chemistId: selectedChemist.id,
                employeeId: mr1.id, // Amit
                distributedAt: faker.date.recent({ days: 30 })
            }
        });

        // Add 1-2 drug items per distribution
        const drugItemCount = faker.number.int({ min: 1, max: 2 });
        const selectedDrugInventories = getRandomElements(drugInventories, drugItemCount);

        for (const drugInventory of selectedDrugInventories) {
            const quantity = faker.number.int({ min: 3, max: 10 });
            const unitCost = Number(drugInventory.drug?.price || 100);

            await tenantPrisma.sampleDistributionDrugItem.create({
                data: {
                    sampleDistributionId: distribution.id,
                    fromInventoryId: drugInventory.id,
                    quantity: quantity,
                    unitCost: unitCost,
                    totalCost: quantity * unitCost
                }
            });

            // Update inventory (reduce quantity)
            await tenantPrisma.userDrugInventory.update({
                where: { id: drugInventory.id },
                data: { quantity: { decrement: quantity } }
            });
        }

        // Add 1 gift item per distribution
        const selectedGiftInventory = getRandomElement(giftInventories);
        const quantity = 1;
        const unitCost = Number(selectedGiftInventory.gift?.unitCost || 500);

        await tenantPrisma.sampleDistributionGiftItem.create({
            data: {
                sampleDistributionId: distribution.id,
                fromInventoryId: selectedGiftInventory.id,
                quantity: quantity,
                unitCost: unitCost,
                totalCost: quantity * unitCost
            }
        });

        // Update inventory (reduce quantity)
        await tenantPrisma.userGiftInventory.update({
            where: { id: selectedGiftInventory.id },
            data: { quantity: { decrement: quantity } }
        });

        sampleDistributions.push(distribution);
    }

    console.log(`✅ Created ${sampleDistributions.length} sample distributions (5 doctors, 3 chemists)`);

    // Step 13: Create orders - 5 for each MR with their territory chemists
    console.log('\n📦 Creating orders...');

    const orders = [];

    // Create 5 orders for MR1 (Mumbai) with Mumbai chemists
    for (let i = 0; i < 5; i++) {
        const chemist = getRandomElement(mumbaiChemists);
        const order = await tenantPrisma.order.create({
            data: {
                organizationId: organizationId,
                chemistId: chemist.id,
                totalAmount: 0, // Will update after adding items
                status: faker.helpers.arrayElement(['CONFIRMED', 'DRAFT']) as any,
                orderDate: faker.date.recent({ days: 30 }),
                deliveryDate: faker.date.soon({ days: 7 }),
                specialInstructions: faker.lorem.sentence().substring(0, 500), // Limit TEXT field
                createdById: mr1.id
            }
        });

        // Add 2-4 order items per order
        const itemCount = faker.number.int({ min: 2, max: 4 });
        const selectedDrugs = getRandomElements(drugs, itemCount);
        let totalAmount = 0;

        for (const drug of selectedDrugs) {
            const quantity = faker.number.int({ min: 10, max: 100 });
            const unitPrice = drug.price || 100;
            const subtotal = quantity * Number(unitPrice);
            totalAmount += subtotal;

            await tenantPrisma.orderItem.create({
                data: {
                    orderId: order.id,
                    drugId: drug.id,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    subtotal: subtotal
                }
            });
        }

        // Update order total
        await tenantPrisma.order.update({
            where: { id: order.id },
            data: { totalAmount: totalAmount }
        });

        orders.push(order);
    }

    // Create 5 orders for MR2 (Pune) with Pune chemists
    for (let i = 0; i < 5; i++) {
        const chemist = getRandomElement(puneChemists);
        const order = await tenantPrisma.order.create({
            data: {
                organizationId: organizationId,
                chemistId: chemist.id,
                totalAmount: 0, // Will update after adding items
                status: faker.helpers.arrayElement(['CONFIRMED', 'DRAFT']) as any,
                orderDate: faker.date.recent({ days: 30 }),
                deliveryDate: faker.date.soon({ days: 7 }),
                specialInstructions: faker.lorem.sentence().substring(0, 500), // Limit TEXT field
                createdById: mr2.id
            }
        });

        // Add 2-4 order items per order
        const itemCount = faker.number.int({ min: 2, max: 4 });
        const selectedDrugs = getRandomElements(drugs, itemCount);
        let totalAmount = 0;

        for (const drug of selectedDrugs) {
            const quantity = faker.number.int({ min: 10, max: 100 });
            const unitPrice = drug.price || 100;
            const subtotal = quantity * Number(unitPrice);
            totalAmount += subtotal;

            await tenantPrisma.orderItem.create({
                data: {
                    orderId: order.id,
                    drugId: drug.id,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    subtotal: subtotal
                }
            });
        }

        // Update order total
        await tenantPrisma.order.update({
            where: { id: order.id },
            data: { totalAmount: totalAmount }
        });

        orders.push(order);
    }

    console.log(`✅ Created ${orders.length} orders with items`);

    // Step 14: Create RCPA Reports
    console.log('\n📊 Creating RCPA reports...');

    const rcpaReports = [];

    // Create RCPA reports for MR1 with Mumbai chemists
    for (const chemist of mumbaiChemists) {
        const startDate = faker.date.recent({ days: 30 });
        const endDate = addDays(startDate, 7);

        const rcpaReport = await tenantPrisma.rcpaReport.create({
            data: {
                organizationId: organizationId,
                employeeId: mr1.id,
                chemistId: chemist.id,
                reportingPeriod: 'WEEKLY',
                startDate: startDate,
                endDate: endDate,
                totalPrescription: faker.number.int({ min: 50, max: 200 }),
                remarks: faker.lorem.sentence()
            }
        });

        // Add drug data for RCPA
        const rcpaDrugs = getRandomElements(drugs, 3);
        for (const drug of rcpaDrugs) {
            await tenantPrisma.rcpaDrugData.create({
                data: {
                    rcpaReportId: rcpaReport.id,
                    drugId: drug.id,
                    competitorDrugName: faker.commerce.productName().substring(0, 255), // Limit to 255 chars
                    ownQuantity: faker.number.int({ min: 10, max: 50 }),
                    competitorQuantity: faker.number.int({ min: 5, max: 40 }),
                    ownPackSize: '10 Tablets',
                    competitorPackSize: '10 Tablets'
                }
            });
        }

        rcpaReports.push(rcpaReport);
    }

    // Create RCPA reports for MR2 with Pune chemists
    for (const chemist of puneChemists) {
        const startDate = faker.date.recent({ days: 30 });
        const endDate = addDays(startDate, 7);

        const rcpaReport = await tenantPrisma.rcpaReport.create({
            data: {
                organizationId: organizationId,
                employeeId: mr2.id,
                chemistId: chemist.id,
                reportingPeriod: 'WEEKLY',
                startDate: startDate,
                endDate: endDate,
                totalPrescription: faker.number.int({ min: 50, max: 200 }),
                remarks: faker.lorem.sentence()
            }
        });

        // Add drug data for RCPA
        const rcpaDrugs = getRandomElements(drugs, 3);
        for (const drug of rcpaDrugs) {
            await tenantPrisma.rcpaDrugData.create({
                data: {
                    rcpaReportId: rcpaReport.id,
                    drugId: drug.id,
                    competitorDrugName: faker.commerce.productName().substring(0, 255), // Limit to 255 chars
                    ownQuantity: faker.number.int({ min: 10, max: 50 }),
                    competitorQuantity: faker.number.int({ min: 5, max: 40 }),
                    ownPackSize: '10 Tablets',
                    competitorPackSize: '10 Tablets'
                }
            });
        }

        rcpaReports.push(rcpaReport);
    }

    console.log(`✅ Created ${rcpaReports.length} RCPA reports with drug data`);

    // Step 15: Create Task Planners - UPDATED WITH NEW ENUMS
    console.log('\n📅 Creating task planners...');

    const startDate = new Date();
    startDate.setDate(1); // Start of current month
    const endDate = new Date();
    endDate.setDate(7); // First week

    // Task planner for MR1 (Mumbai)
    const taskPlannerMR1 = await tenantPrisma.taskPlanner.create({
        data: {
            employeeId: mr1.id,
            startDate: startDate,
            endDate: endDate,
            approvalStatus: 'APPROVED' // UPDATED: Using approvalStatus instead of status
        }
    });

    // Task planner for MR2 (Pune)
    const taskPlannerMR2 = await tenantPrisma.taskPlanner.create({
        data: {
            employeeId: mr2.id,
            startDate: startDate,
            endDate: endDate,
            approvalStatus: 'APPROVED' // UPDATED: Using approvalStatus instead of status
        }
    });

    console.log('✅ Created task planners for both MRs');

    // Step 16: Create Tour Plans
    console.log('\n🗺️ Creating tour plans...');

    const tourPlanMumbai = await tenantPrisma.tourPlan.create({
        data: {
            name: 'Mumbai Central Area Visit',
            description: 'Coverage of central Mumbai area hospitals and clinics'
        }
    });

    const tourPlanPune = await tenantPrisma.tourPlan.create({
        data: {
            name: 'Pune City Tour',
            description: 'Coverage of Pune city hospitals and clinics'
        }
    });

    // Step 17: Create Doctor Tasks - UPDATED WITH NEW ENUMS
    console.log('\n👨‍⚕️ Creating doctor tasks...');

    const doctorTasks = [];

    // Create 10 doctor tasks for MR1 (Mumbai doctors)
    for (let i = 0; i < 10; i++) {
        const doctor = getRandomElement(mumbaiDoctors);
        const taskDate = addDays(startDate, i % 7);

        const doctorTask = await tenantPrisma.doctorTask.create({
            data: {
                plannerId: taskPlannerMR1.id,
                employeeId: mr1.id,
                doctorId: doctor.id,
                taskDate: taskDate,
                startTime: new Date(`2024-01-01T10:00:00`),
                endTime: new Date(`2024-01-01T10:30:00`),
                completionStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED']) as any, // UPDATED
                approvalStatus: 'APPROVED' as any // UPDATED: Added approvalStatus
            }
        });
        doctorTasks.push(doctorTask);
    }

    // Create 10 doctor tasks for MR2 (Pune doctors)
    for (let i = 0; i < 10; i++) {
        const doctor = getRandomElement(puneDoctors);
        const taskDate = addDays(startDate, i % 7);

        const doctorTask = await tenantPrisma.doctorTask.create({
            data: {
                plannerId: taskPlannerMR2.id,
                employeeId: mr2.id,
                doctorId: doctor.id,
                taskDate: taskDate,
                startTime: new Date(`2024-01-01T11:00:00`),
                endTime: new Date(`2024-01-01T11:30:00`),
                completionStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED']) as any, // UPDATED
                approvalStatus: 'APPROVED' as any // UPDATED: Added approvalStatus
            }
        });
        doctorTasks.push(doctorTask);
    }

    console.log(`✅ Created ${doctorTasks.length} doctor tasks`);

    // Step 18: Create Chemist Tasks - UPDATED WITH NEW ENUMS
    console.log('\n💊 Creating chemist tasks...');

    const chemistTasks = [];

    // Create 10 chemist tasks for MR1 (Mumbai chemists)
    for (let i = 0; i < 10; i++) {
        const chemist = getRandomElement(mumbaiChemists);
        const taskDate = addDays(startDate, i % 7);

        const chemistTask = await tenantPrisma.chemistTask.create({
            data: {
                plannerId: taskPlannerMR1.id,
                employeeId: mr1.id,
                chemistId: chemist.id,
                taskDate: taskDate,
                startTime: new Date(`2024-01-01T14:00:00`),
                endTime: new Date(`2024-01-01T14:30:00`),
                completionStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED']) as any, // UPDATED
                approvalStatus: 'APPROVED' as any // UPDATED: Added approvalStatus
            }
        });
        chemistTasks.push(chemistTask);
    }

    // Create 10 chemist tasks for MR2 (Pune chemists)
    for (let i = 0; i < 10; i++) {
        const chemist = getRandomElement(puneChemists);
        const taskDate = addDays(startDate, i % 7);

        const chemistTask = await tenantPrisma.chemistTask.create({
            data: {
                plannerId: taskPlannerMR2.id,
                employeeId: mr2.id,
                chemistId: chemist.id,
                taskDate: taskDate,
                startTime: new Date(`2024-01-01T15:00:00`),
                endTime: new Date(`2024-01-01T15:30:00`),
                completionStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED']) as any, // UPDATED
                approvalStatus: 'APPROVED' as any // UPDATED: Added approvalStatus
            }
        });
        chemistTasks.push(chemistTask);
    }

    console.log(`✅ Created ${chemistTasks.length} chemist tasks`);

    // Step 19: Create Tour Plan Tasks - UPDATED WITH NEW ENUMS
    console.log('\n🗺️ Creating tour plan tasks...');

    const tourPlanTasks = [];

    // Create 10 tour plan tasks for MR1
    for (let i = 0; i < 10; i++) {
        const taskDate = addDays(startDate, i % 7);

        const tourTask = await tenantPrisma.tourPlanTask.create({
            data: {
                plannerId: taskPlannerMR1.id,
                employeeId: mr1.id,
                tourPlanId: tourPlanMumbai.id,
                location: `Mumbai Location ${i + 1}`,
                taskDate: taskDate,
                startTime: new Date(`2024-01-01T09:00:00`),
                endTime: new Date(`2024-01-01T18:00:00`),
                completionStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED']) as any, // UPDATED
                approvalStatus: 'APPROVED' as any // UPDATED: Added approvalStatus
            }
        });
        tourPlanTasks.push(tourTask);
    }

    // Create 10 tour plan tasks for MR2
    for (let i = 0; i < 10; i++) {
        const taskDate = addDays(startDate, i % 7);

        const tourTask = await tenantPrisma.tourPlanTask.create({
            data: {
                plannerId: taskPlannerMR2.id,
                employeeId: mr2.id,
                tourPlanId: tourPlanPune.id,
                location: `Pune Location ${i + 1}`,
                taskDate: taskDate,
                startTime: new Date(`2024-01-01T09:00:00`),
                endTime: new Date(`2024-01-01T18:00:00`),
                completionStatus: faker.helpers.arrayElement(['PENDING', 'COMPLETED']) as any, // UPDATED
                approvalStatus: 'APPROVED' as any // UPDATED: Added approvalStatus
            }
        });
        tourPlanTasks.push(tourTask);
    }

    console.log(`✅ Created ${tourPlanTasks.length} tour plan tasks`);

    // Step 20: Create DCR Reports for completed tasks - UPDATED FILTERING
    console.log('\n📝 Creating DCR reports...');

    const dcrReports = [];

    // Create DCR for completed doctor tasks - UPDATED FILTERING
    const completedDoctorTasks = doctorTasks.filter(task => task.completionStatus === 'COMPLETED'); // UPDATED
    for (const task of completedDoctorTasks.slice(0, 5)) {
        const dcr = await tenantPrisma.dcrReport.create({
            data: {
                organizationId: organizationId,
                employeeId: task.employeeId,
                taskId: task.id,
                taskType: 'DOCTOR_TASK',
                reportDate: task.taskDate,
                productsDiscussed: drugs.slice(0, 3).map(d => d.name).join(', ').substring(0, 500), // Limit TEXT
                comments: faker.lorem.paragraph().substring(0, 500), // Limit TEXT
                isDraft: false
            }
        });
        dcrReports.push(dcr);
    }

    // Create DCR for completed chemist tasks - UPDATED FILTERING
    const completedChemistTasks = chemistTasks.filter(task => task.completionStatus === 'COMPLETED'); // UPDATED
    for (const task of completedChemistTasks.slice(0, 5)) {
        const dcr = await tenantPrisma.dcrReport.create({
            data: {
                organizationId: organizationId,
                employeeId: task.employeeId,
                taskId: task.id,
                taskType: 'CHEMIST_TASK',
                reportDate: task.taskDate,
                productsDiscussed: drugs.slice(0, 3).map(d => d.name).join(', ').substring(0, 500), // Limit TEXT
                comments: faker.lorem.paragraph().substring(0, 500), // Limit TEXT
                isDraft: false
            }
        });
        dcrReports.push(dcr);
    }

    // Create DCR for completed tour plan tasks - UPDATED FILTERING
    const completedTourTasks = tourPlanTasks.filter(task => task.completionStatus === 'COMPLETED'); // UPDATED
    for (const task of completedTourTasks.slice(0, 5)) {
        const dcr = await tenantPrisma.dcrReport.create({
            data: {
                organizationId: organizationId,
                employeeId: task.employeeId,
                taskId: task.id,
                taskType: 'TOUR_PLAN_TASK',
                reportDate: task.taskDate,
                productsDiscussed: drugs.slice(0, 3).map(d => d.name).join(', ').substring(0, 500), // Limit TEXT
                comments: faker.lorem.paragraph().substring(0, 500), // Limit TEXT
                isDraft: false
            }
        });
        dcrReports.push(dcr);
    }

    console.log(`✅ Created ${dcrReports.length} DCR reports`);

    // Step 21: Create doctor-chemist relations
    console.log('\n🔗 Creating doctor-chemist relations...');

    let relationCount = 0;

    // Mumbai doctors with Mumbai chemists
    for (const doctor of mumbaiDoctors) {
        const nearbyChemists = getRandomElements(mumbaiChemists, 2);
        for (const chemist of nearbyChemists) {
            await tenantPrisma.doctorChemistRelation.create({
                data: {
                    doctorId: doctor.id,
                    chemistId: chemist.id,
                    createdById: mr1.id
                }
            });
            relationCount++;
        }
    }

    // Pune doctors with Pune chemists
    for (const doctor of puneDoctors) {
        const nearbyChemists = getRandomElements(puneChemists, 2);
        for (const chemist of nearbyChemists) {
            await tenantPrisma.doctorChemistRelation.create({
                data: {
                    doctorId: doctor.id,
                    chemistId: chemist.id,
                    createdById: mr2.id
                }
            });
            relationCount++;
        }
    }

    console.log(`✅ Created ${relationCount} doctor-chemist relations`);

    // Step 22: Create interactions
    console.log('\n🤝 Creating interactions...');

    // Doctor interactions
    for (const task of completedDoctorTasks.slice(0, 5)) {
        const doctor = doctors.find(d => d.id === task.doctorId);
        const hospital = await tenantPrisma.doctorHospitalAssociation.findFirst({
            where: { doctorId: doctor?.id },
            include: { hospital: true }
        });

        if (hospital && doctor) {
            await tenantPrisma.doctorInteraction.create({
                data: {
                    doctorId: doctor.id,
                    employeeId: task.employeeId,
                    hospitalId: hospital.hospitalId,
                    doctorTaskId: task.id,
                    interactionType: 'MEETING',
                    startTime: task.taskDate,
                    endTime: addDays(task.taskDate, 0.02), // 30 minutes later
                    purpose: 'Product presentation'.substring(0, 500), // Limit TEXT
                    outcome: 'Positive response'.substring(0, 500), // Limit TEXT
                    rating: faker.number.int({ min: 3, max: 5 })
                }
            });
        }
    }

    // Chemist interactions
    for (const task of completedChemistTasks.slice(0, 5)) {
        await tenantPrisma.chemistInteraction.create({
            data: {
                chemistId: task.chemistId,
                employeeId: task.employeeId,
                chemistTaskId: task.id,
                interactionType: 'MEETING',
                startTime: task.taskDate,
                endTime: addDays(task.taskDate, 0.02),
                purpose: 'Order collection'.substring(0, 500), // Limit TEXT
                outcome: 'Order placed'.substring(0, 500), // Limit TEXT
                rating: faker.number.int({ min: 3, max: 5 })
            }
        });
    }

    console.log('✅ Created doctor and chemist interactions');

    console.log('\n✨ Tenant database seeding completed!');

    // Return summary
    return {
        employees: {
            admin: adminEmployee,
            salesManager,
            medicalReps: [mr1, mr2]
        },
        territories: {
            region: westRegion,
            state: maharashtra,
            cities: [mumbai, pune]
        },
        hospitals,
        doctors: {
            mumbai: mumbaiDoctors,
            pune: puneDoctors
        },
        chemists: {
            mumbai: mumbaiChemists,
            pune: puneChemists
        },
        drugs,
        gifts,
        inventories: {
            drugInventories,
            giftInventories
        },
        sampleDistributions,
        orders,
        rcpaReports,
        taskPlanners: [taskPlannerMR1, taskPlannerMR2],
        tasks: {
            doctorTasks,
            chemistTasks,
            tourPlanTasks
        },
        dcrReports
    };
}

async function main() {
    try {
        console.log('🚀 Starting database seeding...\n');

        // Step 1: Seed shared database
        const { organization, hashedPassword } = await seedSharedDatabase();

        // Step 2: Seed tenant database (using the "Forsys1" schema)
        const tenantData = await seedTenantDatabase(organization.id, hashedPassword);

        // Print summary
        console.log('\n📊 SEEDING SUMMARY');
        console.log('==================');
        console.log('✅ Shared Database:');
        console.log('   - 1 Organization (MediCare Pharmaceuticals)');
        console.log('   - 1 Admin User');
        console.log('   - Schema: Forsys1');
        console.log('\n✅ Tenant Database:');
        console.log('   - 4 Employees (1 Admin, 1 Sales Manager, 2 MRs)');
        console.log('   - 4 Territories (1 Region, 1 State, 2 Cities)');
        console.log(`   - ${tenantData.hospitals.length} Hospitals`);
        console.log(`   - ${tenantData.doctors.mumbai.length + tenantData.doctors.pune.length} Doctors (5 Mumbai, 5 Pune)`);
        console.log(`   - ${tenantData.chemists.mumbai.length + tenantData.chemists.pune.length} Chemists (3 Mumbai, 3 Pune)`);
        console.log(`   - ${tenantData.drugs.length} Drugs`);
        console.log(`   - ${tenantData.gifts.length} Gifts (Created by Admin)`);
        console.log(`   - Drug Inventory: ${tenantData.inventories.drugInventories.length} items (Amit only)`);
        console.log(`   - Gift Inventory: ${tenantData.inventories.giftInventories.length} items (Amit only)`);
        console.log(`   - ${tenantData.sampleDistributions.length} Sample Distributions (Amit to Mumbai entities only)`);
        console.log(`   - ${tenantData.orders.length} Orders with items`);
        console.log(`   - ${tenantData.rcpaReports.length} RCPA Reports with drug data`);
        console.log(`   - 2 Task Planners (with approvalStatus)`);
        console.log(`   - ${tenantData.tasks.doctorTasks.length} Doctor Tasks (with completionStatus & approvalStatus)`);
        console.log(`   - ${tenantData.tasks.chemistTasks.length} Chemist Tasks (with completionStatus & approvalStatus)`);
        console.log(`   - ${tenantData.tasks.tourPlanTasks.length} Tour Plan Tasks (with completionStatus & approvalStatus)`);
        console.log(`   - ${tenantData.dcrReports.length} DCR Reports`);
        console.log('   - Doctor-Hospital associations');
        console.log('   - Doctor-Chemist relations');
        console.log('   - Doctor and Chemist interactions');

        console.log('\n📝 SCHEMA UPDATES APPLIED');
        console.log('========================');
        console.log('✅ TaskPlanner: status → approvalStatus');
        console.log('✅ DoctorTask: taskStatus → completionStatus + approvalStatus');
        console.log('✅ ChemistTask: taskStatus → completionStatus + approvalStatus');
        console.log('✅ TourPlanTask: taskStatus → completionStatus + approvalStatus');

        console.log('\n🔍 SAMPLE DISTRIBUTION DETAILS');
        console.log('===============================');
        console.log('✅ 8 Sample Distributions for MR Amit (Mumbai territory only):');
        console.log('   - 5 distributions to Mumbai doctors');
        console.log('   - 3 distributions to Mumbai chemists');
        console.log('   - Drug items: 2-3 per doctor, 1-2 per chemist');
        console.log('   - Gift items: 1-2 per doctor, 1 per chemist');
        console.log('   - Inventory automatically updated after distributions');

        console.log('\n🔐 TEST CREDENTIALS');
        console.log('===================');
        console.log('Admin User:');
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Password: ${ADMIN_PASSWORD}`);
        console.log('\nSales Manager:');
        console.log('   Email: sales.manager@medicarepharma.com');
        console.log('   Password: Manager@123');
        console.log('\nMedical Representative (Mumbai - has sample distributions):');
        console.log('   Email: amit.patel@medicarepharma.com');
        console.log('   Password: MR@123456');
        console.log('   Territory: Mumbai');
        console.log('   Has: Drug & Gift inventory, Sample distributions');
        console.log('\nMedical Representative (Pune):');
        console.log('   Email: priya.shah@medicarepharma.com');
        console.log('   Password: MR@123456');
        console.log('   Territory: Pune');

        console.log('\n✅ Database seeding completed successfully with updated schema!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        // Clean up connections
        await sharedPrisma.$disconnect();
        await tenantPrisma.$disconnect();
    }
}

// Run

// Run

// Run the seeding
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });