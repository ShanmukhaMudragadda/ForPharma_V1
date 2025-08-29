/**
 * Format date for display
 */
const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
        return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    else if (diffDays === 2) {
        return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};
/**
 * GET /api/samples/distributions
 * Get all distributions for the current user
 */
export const getDistributions = async (req, res) => {
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
        const transformedDistributions = distributions.map((distribution) => {
            // Calculate total quantity
            const drugQuantity = distribution.drugItems.reduce((sum, item) => sum + item.quantity, 0);
            const giftQuantity = distribution.giftItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalQuantity = drugQuantity + giftQuantity;
            // Get customer name
            const customerName = distribution.doctor?.name || distribution.chemist?.name || 'Unknown Customer';
            return {
                distributionId: distribution.id,
                customerName: customerName,
                date: formatDate(distribution.distributedAt),
                quantity: totalQuantity
            };
        });
        res.status(200).json({
            success: true,
            message: `Retrieved ${transformedDistributions.length} distributions`,
            data: transformedDistributions
        });
    }
    catch (error) {
        console.error('❌ Error getting distributions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve distributions',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
