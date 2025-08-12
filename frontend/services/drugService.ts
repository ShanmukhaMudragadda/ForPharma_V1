// services/drugService.ts
import axiosInstance from '../api/axiosConfig';
import { DrugItem, DrugResponse, DrugListResponse } from '../types/drug';

class DrugService {
    // Get all drugs
    async getDrugList(): Promise<DrugItem[]> {
        try {
            const response = await axiosInstance.get<DrugListResponse>('/drugs/getDrugsList');

            if (response.data.success) {
                return response.data.data || [];
            } else {
                throw new Error(response.data.message || 'Failed to fetch drugs');
            }
        } catch (error: any) {
            console.error('Error fetching drugs:', error);
            throw error;
        }
    }

    // Get drug details by ID
    async getDrugDetails(drugId: string): Promise<DrugResponse> {
        try {
            const response = await axiosInstance.get(`/drugs/getDrugDetails/${drugId}`);

            if (response.data.success) {
                return response.data.drug;
            } else {
                throw new Error(response.data.message || 'Failed to fetch drug details');
            }
        } catch (error: any) {
            console.error('Error fetching drug details:', error);
            throw error;
        }
    }

    // Get promotional materials for drug
    async getDrugPromotionalMaterials(drugId: string): Promise<any[]> {
        try {
            // Since marketingMaterials is stored in the drug table itself
            const drug = await this.getDrugDetails(drugId);
            return drug.marketingMaterials || [];
        } catch (error) {
            console.error('Error fetching promotional materials:', error);
            return [];
        }
    }

    // Create new drug
    async createDrug(drugData: Partial<DrugItem>): Promise<DrugResponse> {
        try {
            const response = await axiosInstance.post('/drugs/create', drugData);

            if (response.data.success) {
                return response.data.drug;
            } else {
                throw new Error(response.data.message || 'Failed to create drug');
            }
        } catch (error: any) {
            console.error('Error creating drug:', error);
            throw error;
        }
    }

    // Update drug
    async updateDrug(drugId: string, drugData: Partial<DrugItem>): Promise<DrugResponse> {
        try {
            const response = await axiosInstance.put(`/drugs/updateDrug/${drugId}`, drugData);

            if (response.data.success) {
                return response.data.drug;
            } else {
                throw new Error(response.data.message || 'Failed to update drug');
            }
        } catch (error: any) {
            console.error('Error updating drug:', error);
            throw error;
        }
    }

    // Delete drug (soft delete)
    async deleteDrug(drugId: string): Promise<void> {
        try {
            const response = await axiosInstance.delete(`/drugs/delete/${drugId}`);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete drug');
            }
        } catch (error: any) {
            console.error('Error deleting drug:', error);
            throw error;
        }
    }
}

export default new DrugService();
export { DrugService };