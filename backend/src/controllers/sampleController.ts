import { Request, Response } from 'express';

// Extended Request interface to include tenant database and user info
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        employeeId: string;
        organizationId: string;
        email: string;
        role: string;
    };
    tenantDb?: any; // Prisma tenant client
}

class SampleController {
    /**
     * Get inventory status based on quantity
     */
    private static getInventoryStatus(quantity: number): 'available' | 'low' | 'out' {
        if (quantity <= 0) return 'out';
        if (quantity < 10) return 'low';
        return 'available';
    }

    /**
     * Get gift image URL from giftImages array or return default
     */
    private static getGiftImage(giftImages: any): string {
        try {
            if (Array.isArray(giftImages) && giftImages.length > 0) {
                return giftImages[0]; // Return first image URL
            }
            return 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400'; // Default gift image
        } catch (error) {
            return 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400'; // Fallback image
        }
    }

    /**
     * Format date for display
     */
    private static formatDate(date: Date): string {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays === 2) {
            return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    /**
     * Get customer location details
     */
    private static getCustomerLocation(customer: any, customerType: string): { name: string; address: string } {
        if (customerType === 'doctor' && customer.hospitalAssociations?.length > 0) {
            const hospital = customer.hospitalAssociations[0].hospital;
            return {
                name: hospital.name || 'Hospital',
                address: [hospital.address, hospital.city, hospital.state]
                    .filter(Boolean)
                    .join(', ') || 'Address not available'
            };
        } else if (customerType === 'chemist') {
            return {
                name: customer.name || 'Chemist',
                address: [customer.address, customer.city, customer.state]
                    .filter(Boolean)
                    .join(', ') || 'Address not available'
            };
        }

        return {
            name: 'Location',
            address: 'Address not available'
        };
    }

    /**
     * GET /api/samples/inventory/drugs
     * Get only drug inventory
     */
    async getDrugInventory(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log('💊 Getting drug inventory for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            const drugInventory = await req.tenantDb.userDrugInventory.findMany({
                where: {
                    employeeId: req.user?.employeeId
                },
                include: {
                    drug: {
                        select: {
                            id: true,
                            name: true,
                            composition: true,
                            manufacturer: true,
                            category: true,
                            price: true,
                            dosageForms: true,
                            indications: true,
                            images: true,
                            isActive: true
                        }
                    }
                },
                orderBy: {
                    drug: {
                        name: 'asc'
                    }
                }
            });

            const transformedDrugs = drugInventory
                .filter(item => item.drug && item.drug.isActive)
                .map(item => {
                    const quantity = item.quantity || 0;
                    const status = SampleController.getInventoryStatus(quantity);

                    return {
                        id: item.drug.id,
                        inventoryId: item.id,
                        name: item.drug.name,
                        dosage: Array.isArray(item.drug.dosageForms) && item.drug.dosageForms.length > 0
                            ? item.drug.dosageForms[0]
                            : '',
                        description: item.drug.composition || item.drug.indications || 'No description available',
                        manufacturer: item.drug.manufacturer || 'Unknown Manufacturer',
                        category: item.drug.category || 'General',
                        quantity: quantity,
                        unit: 'strips',
                        status: status,
                        icon: '💊',
                        image: Array.isArray(item.drug.images) && item.drug.images.length > 0
                            ? item.drug.images[0]
                            : 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
                        lastRestockedAt: item.lastRestockedAt,
                        price: item.drug.price ? parseFloat(item.drug.price.toString()) : 0
                    };
                });

            res.status(200).json({
                success: true,
                message: `Retrieved ${transformedDrugs.length} drug inventory items`,
                data: transformedDrugs
            });

        } catch (error) {
            console.error('❌ Error getting drug inventory:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve drug inventory',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * GET /api/samples/inventory/gifts
     * Get only gift inventory
     */
    async getGiftInventory(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log('🎁 Getting gift inventory for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            const giftInventory = await req.tenantDb.userGiftInventory.findMany({
                where: {
                    employeeId: req.user?.employeeId
                },
                include: {
                    gift: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            unitCost: true,
                            specifications: true,
                            giftImages: true,
                            isActive: true
                        }
                    }
                },
                orderBy: {
                    gift: {
                        name: 'asc'
                    }
                }
            });

            const transformedGifts = giftInventory
                .filter(item => item.gift && item.gift.isActive)
                .map(item => {
                    const quantity = item.quantity || 0;
                    const status = SampleController.getInventoryStatus(quantity);

                    // Get icon based on gift name
                    let icon = '🎁';
                    const name = item.gift.name.toLowerCase();
                    if (name.includes('stethoscope')) icon = '🩺';
                    else if (name.includes('pen')) icon = '🖊️';
                    else if (name.includes('book')) icon = '📚';
                    else if (name.includes('calendar')) icon = '📅';
                    else if (name.includes('mug')) icon = '☕';
                    else if (name.includes('keychain')) icon = '🔑';
                    else if (name.includes('calculator')) icon = '🧮';
                    else if (name.includes('monitor') || name.includes('pressure')) icon = '🩺';

                    return {
                        id: item.gift.id,
                        inventoryId: item.id,
                        name: item.gift.name,
                        dosage: '',
                        description: item.gift.description || 'No description available',
                        manufacturer: 'MediCare Pharmaceuticals',
                        category: item.gift.specifications?.category || 'Corporate Gifts',
                        quantity: quantity,
                        unit: 'units',
                        status: status,
                        icon: icon,
                        image: SampleController.getGiftImage(item.gift.giftImages),
                        lastRestockedAt: item.lastRestockedAt,
                        unitCost: item.gift.unitCost ? parseFloat(item.gift.unitCost.toString()) : 0
                    };
                });

            res.status(200).json({
                success: true,
                message: `Retrieved ${transformedGifts.length} gift inventory items`,
                data: transformedGifts
            });

        } catch (error) {
            console.error('❌ Error getting gift inventory:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve gift inventory',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * GET /api/samples/customers
     * Get all customers (doctors and chemists) in user's territory
     */
    async getCustomers(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log('👥 Getting customers for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            // Get employee's territories
            const employeeTerritories = await req.tenantDb.employeeTerritory.findMany({
                where: {
                    employeeId: req.user?.employeeId
                },
                select: {
                    territoryId: true
                }
            });

            const territoryIds = employeeTerritories.map((et: any) => et.territoryId);

            if (territoryIds.length === 0) {
                res.status(200).json({
                    success: true,
                    message: 'No territories assigned to employee',
                    data: []
                });
                return;
            }

            // Get doctors in employee's territories
            const doctors = await req.tenantDb.doctor.findMany({
                include: {
                    hospitalAssociations: {
                        take: 1,
                        include: {
                            hospital: {
                                select: {
                                    name: true,
                                    address: true,
                                    city: true,
                                    state: true,
                                    territoryId: true
                                }
                            }
                        },
                        where: {
                            hospital: {
                                territoryId: {
                                    in: territoryIds
                                }
                            }
                        }
                    }
                },
                where: {
                    isActive: true,
                    hospitalAssociations: {
                        some: {
                            hospital: {
                                territoryId: {
                                    in: territoryIds
                                }
                            }
                        }
                    }
                }
            });

            // Get chemists in employee's territories
            const chemists = await req.tenantDb.chemist.findMany({
                where: {
                    territoryId: {
                        in: territoryIds
                    },
                    isActive: true
                }
            });

            // Transform doctors
            const transformedDoctors = doctors.map((doctor: any) => {
                const hospital = doctor.hospitalAssociations[0]?.hospital;
                return {
                    id: doctor.id,
                    name: doctor.name,
                    type: 'doctor',
                    designation: doctor.designation,
                    specialization: doctor.specialization,
                    address: {
                        name: hospital ? hospital.name : 'Hospital',
                        full: hospital
                            ? [hospital.address, hospital.city, hospital.state].filter(Boolean).join(', ')
                            : 'Address not available'
                    }
                };
            });

            // Transform chemists
            const transformedChemists = chemists.map((chemist: any) => ({
                id: chemist.id,
                name: chemist.name,
                type: 'chemist',
                chemistType: chemist.type,
                address: {
                    name: chemist.name,
                    full: [chemist.address, chemist.city, chemist.state]
                        .filter(Boolean)
                        .join(', ') || 'Address not available'
                }
            }));

            // Combine and sort customers
            const allCustomers = [
                ...transformedDoctors,
                ...transformedChemists
            ].sort((a, b) => a.name.localeCompare(b.name));

            res.status(200).json({
                success: true,
                message: `Retrieved ${allCustomers.length} customers`,
                data: allCustomers
            });

        } catch (error) {
            console.error('❌ Error getting customers:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve customers',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * GET /api/samples/distributions
     * Get all distributions for the current user
     */
    async getDistributions(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log('📦 Getting distributions for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            const distributions = await req.tenantDb.sampleDistribution.findMany({
                where: {
                    employeeId: req.user?.employeeId
                },
                include: {
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            hospitalAssociations: {
                                take: 1,
                                include: {
                                    hospital: {
                                        select: {
                                            name: true,
                                            address: true,
                                            city: true,
                                            state: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    chemist: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            city: true,
                            state: true
                        }
                    },
                    drugItems: {
                        select: {
                            quantity: true
                        }
                    },
                    giftItems: {
                        select: {
                            quantity: true
                        }
                    }
                },
                orderBy: {
                    distributedAt: 'desc'
                }
            });

            const transformedDistributions = distributions.map((distribution: any) => {
                // Calculate total quantity
                const drugQuantity = distribution.drugItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
                const giftQuantity = distribution.giftItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
                const totalQuantity = drugQuantity + giftQuantity;

                // Get customer name
                const customerName = distribution.doctor?.name || distribution.chemist?.name || 'Unknown Customer';

                return {
                    distributionId: distribution.id,
                    customerName: customerName,
                    date: SampleController.formatDate(distribution.distributedAt),
                    quantity: totalQuantity
                };
            });

            res.status(200).json({
                success: true,
                message: `Retrieved ${transformedDistributions.length} distributions`,
                data: transformedDistributions
            });

        } catch (error) {
            console.error('❌ Error getting distributions:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve distributions',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * GET /api/samples/distributions/:distributionId
     * Get distribution details by ID
     */
    async getDistributionDetails(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { distributionId } = req.params;
            console.log('📋 Getting distribution details for:', distributionId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            const distribution = await req.tenantDb.sampleDistribution.findUnique({
                where: {
                    id: distributionId,
                    employeeId: req.user?.employeeId // Ensure user can only access their distributions
                },
                include: {
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            hospitalAssociations: {
                                take: 1,
                                include: {
                                    hospital: {
                                        select: {
                                            name: true,
                                            address: true,
                                            city: true,
                                            state: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    chemist: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            city: true,
                            state: true
                        }
                    },
                    employee: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true
                        }
                    },
                    drugItems: {
                        include: {
                            fromInventory: {
                                include: {
                                    drug: {
                                        select: {
                                            name: true,
                                            dosageForms: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    giftItems: {
                        include: {
                            fromInventory: {
                                include: {
                                    gift: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (!distribution) {
                res.status(404).json({
                    success: false,
                    message: 'Distribution not found'
                });
                return;
            }

            // Determine customer type and details
            const customer = distribution.doctor || distribution.chemist;
            const customerType = distribution.doctor ? 'doctor' : 'chemist';

            if (!customer) {
                res.status(400).json({
                    success: false,
                    message: 'Distribution customer not found'
                });
                return;
            }

            // Get location details
            const location = SampleController.getCustomerLocation(customer, customerType);

            // Transform drug items
            const drugs = distribution.drugItems.map((item: any) => ({
                id: item.id,
                name: item.fromInventory.drug.name,
                quantity: item.quantity,
                type: 'drug' as const,
                unitCost: parseFloat(item.unitCost.toString()),
                totalCost: parseFloat(item.totalCost.toString())
            }));

            // Transform gift items
            const gifts = distribution.giftItems.map((item: any) => ({
                id: item.id,
                name: item.fromInventory.gift.name,
                quantity: item.quantity,
                type: 'gift' as const,
                unitCost: parseFloat(item.unitCost.toString()),
                totalCost: parseFloat(item.totalCost.toString())
            }));

            // Calculate total items
            const totalItems = drugs.reduce((sum: number, item: any) => sum + item.quantity, 0) +
                gifts.reduce((sum: number, item: any) => sum + item.quantity, 0);

            const distributionDetails = {
                distributionId: distribution.id,
                customer: {
                    name: customer.name,
                    id: customer.id,
                    type: customerType
                },
                createdBy: {
                    name: `${distribution.employee.firstName} ${distribution.employee.lastName || ''}`.trim(),
                    id: distribution.employee.id
                },
                distributionDate: SampleController.formatDate(distribution.distributedAt),
                location: location,
                drugs: drugs,
                gifts: gifts,
                totalItems: totalItems,
                createdAt: distribution.createdAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            };

            res.status(200).json({
                success: true,
                message: 'Distribution details retrieved successfully',
                data: distributionDetails
            });

        } catch (error) {
            console.error('❌ Error getting distribution details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve distribution details',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * POST /api/samples/distributions
     * Create a new distribution
     */
    async createDistribution(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log('📦 Creating new distribution for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            const {
                customerId,
                customerType,
                distributedAt,
                drugItems = [],
                giftItems = []
            } = req.body;

            // Validate required fields
            if (!customerId || !customerType || !distributedAt) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required fields: customerId, customerType, distributedAt'
                });
                return;
            }

            if (drugItems.length === 0 && giftItems.length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'At least one drug or gift item must be included'
                });
                return;
            }

            // Validate customer exists
            const customerExists = customerType === 'doctor'
                ? await req.tenantDb.doctor.findUnique({ where: { id: customerId, isActive: true } })
                : await req.tenantDb.chemist.findUnique({ where: { id: customerId, isActive: true } });

            if (!customerExists) {
                res.status(404).json({
                    success: false,
                    message: `${customerType} not found`
                });
                return;
            }

            // Start transaction
            const result = await req.tenantDb.$transaction(async (tx: any) => {
                // Create distribution
                const distribution = await tx.sampleDistribution.create({
                    data: {
                        doctorId: customerType === 'doctor' ? customerId : null,
                        chemistId: customerType === 'chemist' ? customerId : null,
                        employeeId: req.user?.employeeId,
                        distributedAt: new Date(distributedAt)
                    }
                });

                // Process drug items
                for (const drugItem of drugItems) {
                    const { inventoryId, quantity } = drugItem;

                    // Get inventory item
                    const inventory = await tx.userDrugInventory.findUnique({
                        where: { id: inventoryId },
                        include: { drug: true }
                    });

                    if (!inventory) {
                        throw new Error(`Drug inventory item ${inventoryId} not found`);
                    }

                    if (inventory.quantity < quantity) {
                        throw new Error(`Insufficient quantity for ${inventory.drug.name}. Available: ${inventory.quantity}, Requested: ${quantity}`);
                    }

                    // Create distribution drug item
                    await tx.sampleDistributionDrugItem.create({
                        data: {
                            sampleDistributionId: distribution.id,
                            fromInventoryId: inventoryId,
                            quantity: quantity,
                            unitCost: inventory.drug.price || 0,
                            totalCost: (inventory.drug.price || 0) * quantity
                        }
                    });

                    // Update inventory quantity
                    await tx.userDrugInventory.update({
                        where: { id: inventoryId },
                        data: {
                            quantity: inventory.quantity - quantity
                        }
                    });
                }

                // Process gift items
                for (const giftItem of giftItems) {
                    const { inventoryId, quantity } = giftItem;

                    // Get inventory item
                    const inventory = await tx.userGiftInventory.findUnique({
                        where: { id: inventoryId },
                        include: { gift: true }
                    });

                    if (!inventory) {
                        throw new Error(`Gift inventory item ${inventoryId} not found`);
                    }

                    if (inventory.quantity < quantity) {
                        throw new Error(`Insufficient quantity for ${inventory.gift.name}. Available: ${inventory.quantity}, Requested: ${quantity}`);
                    }

                    // Create distribution gift item
                    await tx.sampleDistributionGiftItem.create({
                        data: {
                            sampleDistributionId: distribution.id,
                            fromInventoryId: inventoryId,
                            quantity: quantity,
                            unitCost: inventory.gift.unitCost || 0,
                            totalCost: (inventory.gift.unitCost || 0) * quantity
                        }
                    });

                    // Update inventory quantity
                    await tx.userGiftInventory.update({
                        where: { id: inventoryId },
                        data: {
                            quantity: inventory.quantity - quantity
                        }
                    });
                }

                return distribution;
            });

            res.status(201).json({
                success: true,
                message: 'Distribution created successfully',
                data: {
                    distributionId: result.id,
                    customerId: customerId,
                    customerType: customerType,
                    distributedAt: result.distributedAt,
                    drugItemsCount: drugItems.length,
                    giftItemsCount: giftItems.length
                }
            });

        } catch (error: any) {
            console.error('❌ Error creating distribution:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to create distribution',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
}

export default new SampleController();