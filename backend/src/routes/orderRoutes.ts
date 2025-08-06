import express from 'express';
import tenantMiddleware from '../middlewares/tenantMiddleware';
import orderController from '../controllers/orderController';

const router = express.Router();

// Apply tenant middleware to all order routes
// This ensures all routes have access to req.user and req.tenantDb
router.use(tenantMiddleware);

// Order Routes
router.get('/', orderController.getOrders);                    // GET /api/orders - List all orders
router.get('/drugs', orderController.getDrugsForOrder);        // GET /api/orders/drugs - Get drugs for order
router.get('/:orderId', orderController.getOrderById);         // GET /api/orders/:orderId - Get single order details
router.post('/', orderController.createOrder);                 // POST /api/orders - Create new order
router.put('/:orderId', orderController.updateOrder);          // PUT /api/orders/:orderId - Update order
router.delete('/:orderId', orderController.deleteOrder);       // DELETE /api/orders/:orderId - Delete/cancel order

export default router;
