import { Request, Response } from 'express';

// Extended Request interface to include tenant database and user info
// These are added by the tenantMiddleware
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

class OrderController {

    /**
     * GET /api/orders
     * List only orders created by the authenticated employee
     * Returns: order_id, chemist_name, date, amount, status
     * No pagination - returns all employee's orders
     */
    async getOrders(req: AuthenticatedRequest, res: Response) {
        try {
            console.log('📋 Getting orders for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            // This line uses the Prisma model name 'order' to query the 'orders' table.
            const orders = await req.tenantDb.order.findMany({
                where: {
                    // This line uses the column name 'createdById' as defined in the 'Order' model.
                    createdById: req.user?.employeeId
                },
                include: {
                    // This line uses the relation name 'chemist' as defined in the 'Order' model.
                    chemist: {
                        select: {
                            // These lines use the column names 'id' and 'name' as defined in the 'Chemist' model.
                            id: true,
                            name: true
                        }
                    },
                    // This line uses the relation name 'createdBy' as defined in the 'Order' model.
                    createdBy: {
                        select: {
                            // These lines use the column names 'firstName' and 'lastName' as defined in the 'Employee' model.
                            firstName: true,
                            lastName: true
                        }
                    }
                },
                orderBy: {
                    // This line uses the column name 'createdAt' as defined in the 'Order' model.
                    createdAt: 'desc'
                }
            });

            // Transform data to match frontend expectations
            const transformedOrders = orders.map((order: any) => ({
                orderId: order.id, // This line uses the column name 'id' from the retrieved 'order' object.
                customerName: order.chemist?.name || 'Unknown Customer', // This line uses the relation name 'chemist' and column name 'name'.
                date: order.orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                amount: `₹${order.totalAmount.toLocaleString('en-IN')}`, // This line uses the column name 'totalAmount' from the 'order' object.
                status: order.status || 'PENDING' // This line uses the column name 'status' from the 'order' object.
            }));

            res.status(200).json({
                success: true,
                message: `Retrieved ${transformedOrders.length} orders for employee`,
                data: transformedOrders
            });

        } catch (error) {
            console.error('❌ Error getting orders:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve orders',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
}

export default new OrderController();