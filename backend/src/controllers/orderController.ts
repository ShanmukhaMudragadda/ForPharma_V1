import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

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

class OrderController {

    /**
     * Parse date string (supports multiple formats and handles spaces)
     */
    private static parseDate(dateString: string): Date | null {
        if (!dateString || typeof dateString !== 'string') {
            console.log('❌ Invalid date string:', dateString);
            return null;
        }

        // Remove any extra whitespace and normalize spaces around separators
        let cleanDateString = dateString.trim();
        cleanDateString = cleanDateString.replace(/\s*-\s*/g, '-'); // Replace " - " with "-"
        cleanDateString = cleanDateString.replace(/\s*\/\s*/g, '/'); // Replace " / " with "/"

        console.log('📅 Parsing date string:', dateString, '→ cleaned:', cleanDateString);

        try {
            // Handle standard date formats
            const date = new Date(cleanDateString);
            if (!isNaN(date.getTime())) {
                console.log('✅ Successfully parsed date:', date);
                return date;
            }

            // Handle DD-MM-YYYY format
            if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(cleanDateString)) {
                console.log('📅 Detected DD-MM-YYYY format');
                const parts = cleanDateString.split('-');
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);

                const parsedDate = new Date(year, month - 1, day);
                if (parsedDate.getFullYear() === year &&
                    parsedDate.getMonth() === month - 1 &&
                    parsedDate.getDate() === day) {
                    console.log('✅ Successfully parsed DD-MM-YYYY:', parsedDate);
                    return parsedDate;
                }
            }

            // Handle DD/MM/YYYY format
            if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleanDateString)) {
                console.log('📅 Detected DD/MM/YYYY format');
                const parts = cleanDateString.split('/');
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);

                const parsedDate = new Date(year, month - 1, day);
                if (parsedDate.getFullYear() === year &&
                    parsedDate.getMonth() === month - 1 &&
                    parsedDate.getDate() === day) {
                    console.log('✅ Successfully parsed DD/MM/YYYY:', parsedDate);
                    return parsedDate;
                }
            }

            console.log('❌ No valid date format found for:', cleanDateString);
            return null;

        } catch (error) {
            console.error('❌ Error parsing date:', error);
            return null;
        }
    }

    /**
     * GET /api/orders
     * List only orders created by the authenticated employee
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

            const orders = await req.tenantDb.order.findMany({
                where: {
                    createdById: req.user?.employeeId
                },
                include: {
                    chemist: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    createdBy: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            // Transform data to match frontend expectations
            const transformedOrders = orders.map((order: any) => ({
                orderId: order.id,
                customerName: order.chemist?.name || 'Unknown Customer',
                date: order.orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                amount: `₹${order.totalAmount.toLocaleString('en-IN')}`,
                status: order.status || 'DRAFT'
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

    /**
     * GET /api/orders/:orderId
     * Get detailed information about a specific order
     */
    async getOrderById(req: AuthenticatedRequest, res: Response) {
        try {
            const { orderId } = req.params;
            console.log('🔍 Getting order details for:', orderId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            const order = await req.tenantDb.order.findFirst({
                where: {
                    id: orderId,
                    createdById: req.user?.employeeId // Ensure user can only access their own orders
                },
                include: {
                    chemist: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            address: true
                        }
                    },
                    createdBy: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    },
                    items: {
                        include: {
                            drug: {
                                select: {
                                    name: true,
                                    composition: true,
                                    manufacturer: true,
                                    category: true
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'asc'
                        }
                    }
                }
            });

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found or you do not have permission to view this order'
                });
            }

            // Transform order items for frontend
            const transformedItems = order.items.map((item: any) => ({
                id: `${item.orderId}_${item.drugId}`, // Composite key as string
                name: item.drug?.name || 'Unknown Product',
                description: item.drug?.composition || '',
                manufacturer: item.drug?.manufacturer || '',
                category: item.drug?.category || '',
                quantity: item.quantity,
                unitPrice: parseFloat(item.unitPrice.toString()),
                subtotal: parseFloat(item.subtotal.toString())
            }));

            // Calculate totals
            const subtotal = transformedItems.reduce((sum, item) => sum + item.subtotal, 0);
            const itemCount = transformedItems.length;

            // Transform order details for frontend
            const orderDetails = {
                orderId: order.id,
                orderNumber: order.id,

                // Customer information
                customer: {
                    id: order.chemist?.id,
                    name: order.chemist?.name || 'Unknown Customer',
                    email: order.chemist?.email,
                    phone: order.chemist?.phone,
                    address: order.chemist?.address
                },

                // Employee information
                createdBy: {
                    name: `${order.createdBy?.firstName || ''} ${order.createdBy?.lastName || ''}`.trim() || 'Unknown Employee',
                    email: order.createdBy?.email
                },

                // Order dates
                orderDate: order.orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                expectedDeliveryDate: order.deliveryDate ?
                    order.deliveryDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : null,

                // Order status
                status: order.status || 'DRAFT',

                // Items and pricing
                items: transformedItems,
                itemCount: itemCount,
                subtotal: subtotal,
                totalAmount: parseFloat(order.totalAmount.toString()),

                // Special instructions
                specialInstructions: order.specialInstructions || '',

                // Timestamps
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            };

            res.status(200).json({
                success: true,
                message: 'Order details retrieved successfully',
                data: orderDetails
            });

        } catch (error) {
            console.error('❌ Error getting order details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve order details',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * POST /api/orders
     * Create a new order
     */
    async createOrder(req: AuthenticatedRequest, res: Response) {
        try {
            const orderData = req.body;
            console.log('📝 Creating new order for employee:', req.user?.employeeId);
            console.log('📝 Received order data:', JSON.stringify(orderData, null, 2));

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            // Validate required fields
            if (!orderData.chemistId || !orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: chemistId and items are required'
                });
            }

            // Validate chemist exists and is in user's territory
            const chemist = await req.tenantDb.chemist.findFirst({
                where: {
                    id: orderData.chemistId,
                    isActive: true
                },
                include: {
                    territory: true
                }
            });

            if (!chemist) {
                return res.status(404).json({
                    success: false,
                    message: 'Chemist not found or inactive'
                });
            }

            // Validate all drugs exist and calculate totals
            const drugIds = orderData.items.map((item: any) => item.drugId);
            const drugs = await req.tenantDb.drug.findMany({
                where: {
                    id: { in: drugIds },
                    isActive: true
                }
            });

            if (drugs.length !== drugIds.length) {
                return res.status(400).json({
                    success: false,
                    message: 'One or more drugs not found or inactive'
                });
            }

            // Create drug map for price lookup
            const drugMap = drugs.reduce((map, drug) => {
                map[drug.id] = drug;
                return map;
            }, {} as any);

            // Validate and calculate order items
            let calculatedTotal = 0;
            const validatedItems = orderData.items.map((item: any) => {
                const drug = drugMap[item.drugId];
                const quantity = parseInt(item.quantity);
                const unitPrice = item.unitPrice ? parseFloat(item.unitPrice) : (drug.price ? parseFloat(drug.price.toString()) : 0);
                const subtotal = quantity * unitPrice;

                calculatedTotal += subtotal;

                return {
                    drugId: item.drugId,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    subtotal: subtotal
                };
            });

            // Generate order ID
            const orderCount = await req.tenantDb.order.count();
            const orderNumber = `ORD-${new Date().getFullYear()}-${uuidv4().split('-')[0].toUpperCase()}`;

            // Determine order status
            const status = orderData.action === 'confirm' ? 'CONFIRMED' : 'DRAFT';
            const orderDate = status === 'CONFIRMED' ? new Date() : (orderData.orderDate ? new Date(orderData.orderDate) : new Date());

            // Enhanced delivery date parsing
            let deliveryDate = null;
            if (orderData.expectedDeliveryDate) {
                console.log('🗓️ Parsing delivery date:', orderData.expectedDeliveryDate);
                deliveryDate = OrderController.parseDate(orderData.expectedDeliveryDate);

                if (!deliveryDate) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid delivery date format: "${orderData.expectedDeliveryDate}". Please use a valid date format.`,
                        debug: {
                            received: orderData.expectedDeliveryDate,
                            type: typeof orderData.expectedDeliveryDate
                        }
                    });
                }
                console.log('✅ Parsed delivery date:', deliveryDate);
            }

            // Create order with transaction
            const result = await req.tenantDb.$transaction(async (tx: any) => {
                // Create order
                const order = await tx.order.create({
                    data: {
                        id: orderNumber,
                        organizationId: req.user?.organizationId,
                        chemistId: orderData.chemistId,
                        totalAmount: calculatedTotal,
                        status: status,
                        orderDate: orderDate,
                        deliveryDate: deliveryDate,
                        specialInstructions: orderData.specialInstructions || null,
                        createdById: req.user?.employeeId
                    }
                });

                // Create order items
                for (const item of validatedItems) {
                    await tx.orderItem.create({
                        data: {
                            orderId: order.id,
                            drugId: item.drugId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            subtotal: item.subtotal
                        }
                    });
                }

                return order;
            });

            // Fetch created order with relations for response
            const createdOrder = await req.tenantDb.order.findUnique({
                where: { id: result.id },
                include: {
                    chemist: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    createdBy: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    },
                    items: {
                        include: {
                            drug: {
                                select: {
                                    name: true,
                                    manufacturer: true
                                }
                            }
                        }
                    }
                }
            });

            console.log('✅ Order created successfully:', result.id);

            res.status(201).json({
                success: true,
                message: `Order ${status === 'CONFIRMED' ? 'confirmed' : 'saved as draft'} successfully`,
                data: {
                    orderId: createdOrder.id,
                    status: createdOrder.status,
                    totalAmount: parseFloat(createdOrder.totalAmount.toString()),
                    itemCount: createdOrder.items.length,
                    customerName: createdOrder.chemist?.name,
                    createdBy: `${createdOrder.createdBy?.firstName || ''} ${createdOrder.createdBy?.lastName || ''}`.trim()
                }
            });

        } catch (error: any) {
            console.error('❌ Error creating order:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create order',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    /**
     * GET /api/orders/drugs
     * Get available drugs for order creation (simplified - just name and price)
     */
    async getDrugsForOrder(req: AuthenticatedRequest, res: Response) {
        try {
            console.log('💊 Getting drugs for order creation');

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            const drugs = await req.tenantDb.drug.findMany({
                where: {
                    isActive: true,
                    isAvailable: true
                },
                select: {
                    id: true,
                    name: true,
                    price: true
                },
                orderBy: {
                    name: 'asc'
                }
            });

            res.status(200).json({
                success: true,
                message: `Retrieved ${drugs.length} drugs`,
                data: drugs.map(drug => ({
                    id: drug.id,
                    name: drug.name,
                    price: drug.price ? parseFloat(drug.price.toString()) : 0
                }))
            });

        } catch (error) {
            console.error('❌ Error getting drugs for order:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve drugs',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * PUT /api/orders/:orderId
     * Update order details - Enhanced to handle full order replacement
     */
    async updateOrder(req: AuthenticatedRequest, res: Response) {
        try {
            const { orderId } = req.params;
            const orderData = req.body;
            console.log('📝 Updating order:', orderId);
            console.log('📝 Received update data:', JSON.stringify(orderData, null, 2));

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            // Check if order exists and belongs to the user
            const existingOrder = await req.tenantDb.order.findFirst({
                where: {
                    id: orderId,
                    createdById: req.user?.employeeId
                }
            });

            if (!existingOrder) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found or you do not have permission to update this order'
                });
            }

            // Only allow updating DRAFT orders for full updates
            if (existingOrder.status !== 'DRAFT' && existingOrder.status !== 'PENDING') {
                return res.status(400).json({
                    success: false,
                    message: 'Only draft orders can be edited',
                    debug: {
                        currentStatus: existingOrder.status,
                        allowedStatuses: ['DRAFT', 'PENDING']
                    }
                });
            }

            // Validate required fields for full order update
            if (!orderData.chemistId || !orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: chemistId and items are required for order update'
                });
            }

            // Validate chemist exists
            const chemist = await req.tenantDb.chemist.findFirst({
                where: {
                    id: orderData.chemistId,
                    isActive: true
                }
            });

            if (!chemist) {
                return res.status(404).json({
                    success: false,
                    message: 'Chemist not found or inactive'
                });
            }

            // Validate all drugs exist and calculate totals
            const drugIds = orderData.items.map((item: any) => item.drugId);
            const drugs = await req.tenantDb.drug.findMany({
                where: {
                    id: { in: drugIds },
                    isActive: true
                }
            });

            if (drugs.length !== drugIds.length) {
                return res.status(400).json({
                    success: false,
                    message: 'One or more drugs not found or inactive'
                });
            }

            // Create drug map for price lookup
            const drugMap = drugs.reduce((map, drug) => {
                map[drug.id] = drug;
                return map;
            }, {} as any);

            // Validate and calculate order items
            let calculatedTotal = 0;
            const validatedItems = orderData.items.map((item: any) => {
                const drug = drugMap[item.drugId];
                const quantity = parseInt(item.quantity);
                const unitPrice = item.unitPrice ? parseFloat(item.unitPrice) : (drug.price ? parseFloat(drug.price.toString()) : 0);
                const subtotal = quantity * unitPrice;

                calculatedTotal += subtotal;

                return {
                    drugId: item.drugId,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    subtotal: subtotal
                };
            });

            // Determine order status
            const status = orderData.action === 'confirm' ? 'CONFIRMED' : 'DRAFT';

            // Enhanced delivery date parsing
            let deliveryDate = null;
            if (orderData.expectedDeliveryDate) {
                console.log('🗓️ Parsing delivery date for update:', orderData.expectedDeliveryDate);
                deliveryDate = OrderController.parseDate(orderData.expectedDeliveryDate);

                if (!deliveryDate) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid delivery date format: "${orderData.expectedDeliveryDate}". Please use a valid date format.`,
                        debug: {
                            received: orderData.expectedDeliveryDate,
                            type: typeof orderData.expectedDeliveryDate
                        }
                    });
                }
                console.log('✅ Parsed delivery date for update:', deliveryDate);
            }

            // Update order with transaction - THIS IS THE KEY PART
            const result = await req.tenantDb.$transaction(async (tx: any) => {
                // 1. Update order table (SAME orderId)
                const updatedOrder = await tx.order.update({
                    where: { id: orderId },
                    data: {
                        chemistId: orderData.chemistId,
                        totalAmount: calculatedTotal,
                        status: status,
                        deliveryDate: deliveryDate,
                        specialInstructions: orderData.specialInstructions || null,
                        updatedAt: new Date()
                    }
                });

                // 2. Delete ALL existing order items
                console.log('🔥 Deleting existing order items for order:', orderId);
                const deletedItems = await tx.orderItem.deleteMany({
                    where: { orderId: orderId }
                });
                console.log(`✅ Deleted ${deletedItems.count} existing order items`);

                // 3. Create NEW order items
                console.log(`📦 Creating ${validatedItems.length} new order items`);
                for (const item of validatedItems) {
                    await tx.orderItem.create({
                        data: {
                            orderId: orderId, // Same order ID
                            drugId: item.drugId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            subtotal: item.subtotal
                        }
                    });
                }

                return updatedOrder;
            });

            // Fetch updated order with relations for response
            const updatedOrder = await req.tenantDb.order.findUnique({
                where: { id: orderId },
                include: {
                    chemist: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    createdBy: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    },
                    items: {
                        include: {
                            drug: {
                                select: {
                                    name: true,
                                    manufacturer: true
                                }
                            }
                        }
                    }
                }
            });

            console.log('✅ Order updated successfully:', orderId);

            res.status(200).json({
                success: true,
                message: `Order ${status === 'CONFIRMED' ? 'updated and confirmed' : 'updated as draft'} successfully`,
                data: {
                    orderId: updatedOrder.id,
                    status: updatedOrder.status,
                    totalAmount: parseFloat(updatedOrder.totalAmount.toString()),
                    itemCount: updatedOrder.items.length,
                    customerName: updatedOrder.chemist?.name,
                    updatedBy: `${updatedOrder.createdBy?.firstName || ''} ${updatedOrder.createdBy?.lastName || ''}`.trim()
                }
            });

        } catch (error: any) {
            console.error('❌ Error updating order:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update order',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    /**
     * DELETE /api/orders/:orderId
     * Hard delete order and its items (completely removes from database)
     */
    async deleteOrder(req: AuthenticatedRequest, res: Response) {
        try {
            const { orderId } = req.params;
            console.log('🗑️ Hard deleting order:', orderId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            // Check if order exists and belongs to the user
            const existingOrder = await req.tenantDb.order.findFirst({
                where: {
                    id: orderId,
                    createdById: req.user?.employeeId
                },
                include: {
                    chemist: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            if (!existingOrder) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found or you do not have permission to delete this order'
                });
            }

            // Store order info for response before deletion
            const orderInfo = {
                orderId: existingOrder.id,
                customerName: existingOrder.chemist?.name || 'Unknown Customer',
                status: existingOrder.status,
                totalAmount: parseFloat(existingOrder.totalAmount.toString())
            };

            // Hard delete order and its items in a transaction
            await req.tenantDb.$transaction(async (tx: any) => {
                console.log('🔥 Deleting order items for order:', orderId);

                // 1. Delete all order items first (foreign key constraint)
                const deletedItems = await tx.orderItem.deleteMany({
                    where: { orderId: orderId }
                });

                console.log(`✅ Deleted ${deletedItems.count} order items`);

                console.log('🔥 Deleting order:', orderId);

                // 2. Delete the order itself
                const deletedOrder = await tx.order.delete({
                    where: { id: orderId }
                });

                console.log('✅ Order deleted successfully');

                return deletedOrder;
            });

            res.status(200).json({
                success: true,
                message: 'Order and all its items have been permanently deleted',
                data: {
                    deletedOrder: orderInfo,
                    deletedAt: new Date().toISOString()
                }
            });

        } catch (error: any) {
            console.error('❌ Error deleting order:', error);

            // Check if it's a foreign key constraint error
            if (error.code === 'P2003') {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot delete order due to existing references. Please contact support.'
                });
            }

            // Check if it's a record not found error
            if (error.code === 'P2025') {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found or already deleted'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to delete order',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}

export default new OrderController();