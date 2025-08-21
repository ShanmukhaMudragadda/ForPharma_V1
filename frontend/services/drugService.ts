import axiosInstance from '../api/axiosConfig';
import { DrugItem, DrugResponse, DrugListResponse } from '../types/drug';

// Interface for search response
export interface DrugSearchResponse {
    success: boolean;
    message: string;
    drugs: DrugItem[];
}

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

    // Search drugs by name, composition, or manufacturer
    async searchDrugs(query: string): Promise<DrugSearchResponse> {
        try {
            const response = await axiosInstance.get<DrugSearchResponse>('/drugs/search', {
                params: { query }
            });

            if (response.data.success) {
                return response.data;
            } else {
                // If search endpoint doesn't exist, fallback to filtering from full list
                const allDrugs = await this.getDrugList();
                const filteredDrugs = allDrugs.filter(drug => {
                    const searchLower = query.toLowerCase();
                    return (
                        drug.name?.toLowerCase().includes(searchLower) ||
                        drug.composition?.toLowerCase().includes(searchLower) ||
                        drug.manufacturer?.toLowerCase().includes(searchLower)
                    );
                });

                return {
                    success: true,
                    message: 'Search results',
                    drugs: filteredDrugs.slice(0, 10) // Limit to 10 results
                };
            }
        } catch (error: any) {
            console.error('Error searching drugs:', error);

            // Fallback to client-side filtering if search endpoint fails
            try {
                const allDrugs = await this.getDrugList();
                const filteredDrugs = allDrugs.filter(drug => {
                    const searchLower = query.toLowerCase();
                    return (
                        drug.name?.toLowerCase().includes(searchLower) ||
                        drug.composition?.toLowerCase().includes(searchLower) ||
                        drug.manufacturer?.toLowerCase().includes(searchLower)
                    );
                });

                return {
                    success: true,
                    message: 'Search results',
                    drugs: filteredDrugs.slice(0, 10)
                };
            } catch (fallbackError) {
                return {
                    success: false,
                    message: 'Failed to search drugs',
                    drugs: []
                };
            }
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