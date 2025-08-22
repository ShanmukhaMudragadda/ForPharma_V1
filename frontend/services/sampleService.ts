// src/services/sampleService.ts
import axiosInstance from '../api/axiosConfig'; // Use your existing axios configuration

export interface InventoryItem {
    id: string;
    inventoryId: string;
    name: string;
    dosage: string;
    description: string;
    manufacturer: string;
    category: string;
    quantity: number;
    unit: string;
    status: 'available' | 'low' | 'out';
    icon: string;
    image?: string;
    lastRestockedAt?: Date | null;
    price?: number;
    unitCost?: number;
}

export interface Customer {
    id: string;
    name: string;
    type: 'doctor' | 'chemist';
    designation?: string;
    specialization?: string;
    chemistType?: string;
    address: {
        name: string;
        full: string;
    };
}

export interface CreateDistributionRequest {
    customerId: string;
    customerType: 'doctor' | 'chemist';
    distributedAt: string;
    drugItems: {
        inventoryId: string;
        quantity: number;
    }[];
    giftItems: {
        inventoryId: string;
        quantity: number;
    }[];
}

export interface CreateDistributionResponse {
    distributionId: string;
    customerId: string;
    customerType: 'doctor' | 'chemist';
    distributedAt: string;
    drugItemsCount: number;
    giftItemsCount: number;
}

export interface DistributionItem {
    id: string;
    name: string;
    quantity: number;
    type: 'drug' | 'gift';
    unitCost: number;
    totalCost: number;
}

export interface Distribution {
    distributionId: string;
    customerName: string;
    date: string;
    quantity: number;
}

export interface DistributionDetails {
    distributionId: string;
    customer: {
        name: string;
        id: string;
        type: 'doctor' | 'chemist';
    };
    createdBy: {
        name: string;
        id: string;
    };
    distributionDate: string;
    location: {
        name: string;
        address: string;
    };
    drugs: DistributionItem[];
    gifts: DistributionItem[];
    totalItems: number;
    createdAt: string;
}

class SampleService {
    private static instance: SampleService;

    static getInstance(): SampleService {
        if (!SampleService.instance) {
            SampleService.instance = new SampleService();
        }
        return SampleService.instance;
    }

    // Get drug inventory
    async getDrugInventory(): Promise<InventoryItem[]> {
        try {
            console.log('🚀 Fetching drug inventory from API...');

            const response = await axiosInstance.get('/samples/inventory/drugs');

            console.log('✅ Drug inventory response:', response.data);
            return response.data.data || [];
        } catch (error: any) {
            console.error('❌ Error fetching drug inventory:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to fetch drug inventory`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to load drug inventory');
            }
        }
    }

    // Get gift inventory
    async getGiftInventory(): Promise<InventoryItem[]> {
        try {
            console.log('🚀 Fetching gift inventory from API...');

            const response = await axiosInstance.get('/samples/inventory/gifts');

            console.log('✅ Gift inventory response:', response.data);
            return response.data.data || [];
        } catch (error: any) {
            console.error('❌ Error fetching gift inventory:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to fetch gift inventory`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to load gift inventory');
            }
        }
    }

    // Get customers in user's territory
    async getCustomers(): Promise<Customer[]> {
        try {
            console.log('🚀 Fetching customers from API...');

            const response = await axiosInstance.get('/samples/customers');

            console.log('✅ Customers response:', response.data);
            return response.data.data || [];
        } catch (error: any) {
            console.error('❌ Error fetching customers:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to fetch customers`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to load customers');
            }
        }
    }

    // Get distributions list
    async getDistributions(): Promise<Distribution[]> {
        try {
            console.log('🚀 Fetching distributions from API...');

            const response = await axiosInstance.get('/samples/distributions');

            console.log('✅ Distributions response:', response.data);
            return response.data.data || [];
        } catch (error: any) {
            console.error('❌ Error fetching distributions:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to fetch distributions`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to load distributions');
            }
        }
    }

    // Get distribution details
    async getDistributionDetails(distributionId: string): Promise<DistributionDetails> {
        try {
            console.log('🚀 Fetching distribution details from API...');

            const response = await axiosInstance.get(`/samples/distributions/${distributionId}`);

            console.log('✅ Distribution details response:', response.data);
            return response.data.data;
        } catch (error: any) {
            console.error('❌ Error fetching distribution details:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to fetch distribution details`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to load distribution details');
            }
        }
    }

    // Create new distribution
    async createDistribution(distributionData: CreateDistributionRequest): Promise<CreateDistributionResponse> {
        try {
            console.log('🚀 Creating distribution via API...');

            const response = await axiosInstance.post('/samples/distributions', distributionData);

            console.log('✅ Distribution created successfully:', response.data);
            return response.data.data;
        } catch (error: any) {
            console.error('❌ Error creating distribution:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to create distribution`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to create distribution');
            }
        }
    }
}

export default SampleService.getInstance();