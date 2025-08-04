import axiosInstance from '../api/axiosConfig';

export interface Order {
    orderId: string;
    customerName: string;
    date: string;
    amount: string;
    status: string;
}

export interface OrderListResponse {
    success: boolean;
    message: string;
    data: Order[];
}

class OrderService {
    // Get all orders for logged-in user
    async getOrderList(): Promise<Order[]> {
        try {
            const response = await axiosInstance.get<OrderListResponse>('/orders');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch orders');
            }
        } catch (error: any) {
            console.error('Error fetching order list:', error);
            throw error;
        }
    }

    // Get order details by ID
    async getOrderDetails(orderId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/orders/${orderId}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch order details');
            }
        } catch (error: any) {
            console.error('Error fetching order details:', error);
            throw error;
        }
    }

    // Create a new order
    async createOrder(orderData: any): Promise<any> {
        try {
            const response = await axiosInstance.post('/orders', orderData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to create order');
            }
        } catch (error: any) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    // Update order
    async updateOrder(orderId: string, orderData: any): Promise<any> {
        try {
            const response = await axiosInstance.put(`/orders/${orderId}`, orderData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to update order');
            }
        } catch (error: any) {
            console.error('Error updating order:', error);
            throw error;
        }
    }

    // Delete order
    async deleteOrder(orderId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/orders/${orderId}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to delete order');
            }
        } catch (error: any) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
}

export default new OrderService();