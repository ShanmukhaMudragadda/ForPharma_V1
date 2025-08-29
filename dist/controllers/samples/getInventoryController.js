/**
 * Get inventory status based on quantity
 */
const getInventoryStatus = (quantity) => {
    if (quantity <= 0)
        return 'out';
    if (quantity < 10)
        return 'low';
    return 'available';
};
/**
 * Get gift image URL from giftImages array or return default
 */
const getGiftImage = (giftImages) => {
    try {
        if (Array.isArray(giftImages) && giftImages.length > 0) {
            return giftImages[0]; // Return first image URL
        }
        return 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400'; // Default gift image
    }
    catch (error) {
        return 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400'; // Fallback image
    }
};
/**
 * GET /api/samples/inventory/drugs
 * Get only drug inventory
 */
export const getDrugInventory = async (req, res) => {
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
            const status = getInventoryStatus(quantity);
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
    }
    catch (error) {
        console.error('❌ Error getting drug inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve drug inventory',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
/**
 * GET /api/samples/inventory/gifts
 * Get only gift inventory
 */
export const getGiftInventory = async (req, res) => {
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
            const status = getInventoryStatus(quantity);
            // Get icon based on gift name
            let icon = '🎁';
            const name = item.gift.name.toLowerCase();
            if (name.includes('stethoscope'))
                icon = '🩺';
            else if (name.includes('pen'))
                icon = '🖊️';
            else if (name.includes('book'))
                icon = '📚';
            else if (name.includes('calendar'))
                icon = '📅';
            else if (name.includes('mug'))
                icon = '☕';
            else if (name.includes('keychain'))
                icon = '🔑';
            else if (name.includes('calculator'))
                icon = '🧮';
            else if (name.includes('monitor') || name.includes('pressure'))
                icon = '🩺';
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
                image: getGiftImage(item.gift.giftImages),
                lastRestockedAt: item.lastRestockedAt,
                unitCost: item.gift.unitCost ? parseFloat(item.gift.unitCost.toString()) : 0
            };
        });
        res.status(200).json({
            success: true,
            message: `Retrieved ${transformedGifts.length} gift inventory items`,
            data: transformedGifts
        });
    }
    catch (error) {
        console.error('❌ Error getting gift inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve gift inventory',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
