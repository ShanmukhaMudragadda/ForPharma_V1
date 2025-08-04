import axiosInstance from '../api/axiosConfig';

export interface Order {
    orderId: string;
    customerName: string;
    date: string;
    amount: string;
    status: string;
}

export interface OrderItem {
    id: string;
    name: string;
    description?: string;
    manufacturer?: string;
    category?: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface OrderDetails {
    orderId: string;
    orderNumber: string;
    customer: {
        id: string;
        name: string;
        email?: string;
        phone?: string;
        address?: string;
    };
    createdBy: {
        name: string;
        email?: string;
    };
    orderDate: string;
    expectedDeliveryDate?: string;
    status: string;
    items: OrderItem[];
    itemCount: number;
    subtotal: number;
    totalAmount: number;
    specialInstructions: string;
    createdAt: string;
    updatedAt: string;
}

export interface Chemist {
    chemistId: string;
    chemistName: string;
    type: string;
    email?: string;
    phone?: string;
    address?: string;
    visitingHours?: string;
    chainName?: string;
    territoryName?: string;
}

export interface ChemistListResponse {
    success: boolean;
    message: string;
    data: Chemist[];
}

export interface Drug {
    id: string;
    name: string;
    price: number;
}

export interface CreateOrderRequest {
    chemistId: string;
    expectedDeliveryDate?: string;
    specialInstructions?: string;
    items: {
        drugId: string;
        quantity: number;
        unitPrice: number;
    }[];
    action: 'save' | 'confirm';
    orderDate?: string;
}

export interface UpdateOrderRequest {
    chemistId: string;
    expectedDeliveryDate?: string;
    specialInstructions?: string;
    items: {
        drugId: string;
        quantity: number;
        unitPrice: number;
    }[];
    action: 'save' | 'confirm';
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    data: {
        orderId: string;
        status: string;
        totalAmount: number;
        itemCount: number;
        customerName: string;
        createdBy: string;
    };
}

export interface UpdateOrderResponse {
    success: boolean;
    message: string;
    data: {
        orderId: string;
        status: string;
        totalAmount: number;
        itemCount: number;
        customerName: string;
        updatedBy: string;
    };
}

export interface OrderListResponse {
    success: boolean;
    message: string;
    data: Order[];
}

export interface OrderDetailsResponse {
    success: boolean;
    message: string;
    data: OrderDetails;
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
    async getOrderDetails(orderId: string): Promise<OrderDetails> {
        try {
            const response = await axiosInstance.get<OrderDetailsResponse>(`/orders/${orderId}`);

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

    // Get chemists for order creation (using existing chemist API)
    async getChemistsForOrder(): Promise<Chemist[]> {
        try {
            const response = await axiosInstance.get<ChemistListResponse>('/chemists');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error('Failed to fetch chemists');
            }
        } catch (error: any) {
            console.error('Error fetching chemists for order:', error);
            throw error;
        }
    }

    // Get drugs for order creation (simplified)
    async getDrugsForOrder(): Promise<Drug[]> {
        try {
            const response = await axiosInstance.get<{ success: boolean, data: Drug[] }>('/orders/drugs');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error('Failed to fetch drugs');
            }
        } catch (error: any) {
            console.error('Error fetching drugs for order:', error);
            throw error;
        }
    }

    // Create a new order
    async createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse['data']> {
        try {
            const response = await axiosInstance.post<CreateOrderResponse>('/orders', orderData);

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

    // Update order - Enhanced to handle full order replacement
    async updateOrder(orderId: string, orderData: UpdateOrderRequest): Promise<UpdateOrderResponse['data']> {
        try {
            const response = await axiosInstance.put<UpdateOrderResponse>(`/orders/${orderId}`, orderData);

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