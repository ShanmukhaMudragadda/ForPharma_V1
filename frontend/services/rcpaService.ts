import axiosInstance from '../api/axiosConfig';

export interface RcpaReport {
    id: string;
    chemistName: string;
    chemistAddress: string;
    observationDate: string;
    totalPrescriptions: number;
    startDate?: string;
    endDate?: string;
    reportingPeriod?: string;
}

export interface AuditItem {
    id: string;
    ourProduct: {
        id: string;
        name: string;
        quantity: number;
        packSize: string;
        manufacturer: string;
    };
    competitor: {
        id: string;
        name: string;
        quantity: number;
        packSize: string;
        manufacturer: string;
    };
}

export interface RCPADetailsResponse {
    rcpaId: string;
    chemistId: string;
    chemistName: string;
    observationDate: string;
    createdBy: {
        name: string;
        email: string;
    };
    totalPrescriptions: number;
    itemsAudited: number;
    competitorsFound: number;
    region: string;
    briefRemarks: string;
    auditItems: AuditItem[];
    chemistDetails: {
        email?: string;
        phone?: string;
        address: string;
        type?: string;
    };
    reportingPeriod: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface RcpaDrugData {
    id: string;
    drugName: string;
    drugId?: string;
    competitorDrugName?: string;
    ownQuantity: number;
    competitorQuantity: number;
    ownPackSize: string;
    competitorPackSize: string;
    isOwnDrug: boolean;
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
    price?: number;
    composition?: string;
    manufacturer?: string;
    category?: string;
    // Note: packSize removed - will be entered manually by user
}

// Frontend-specific interfaces for create RCPA
export interface CreateRcpaAuditItem {
    id: string;
    companyDrug: Drug | null;
    companyQuantity: number;
    companyPackSize: string; // User will enter this manually
    competitorDrug: string;
    competitorQuantity: number;
    competitorPackSize: string; // User will enter this manually
}

export interface CreateRcpaRequest {
    chemistId: string;
    reportingPeriod: 'WEEKLY' | 'MONTHLY';
    startDate: string;
    endDate: string;
    totalPrescriptions?: number;
    remarks?: string;
    drugData?: {
        drugId?: string;
        competitorDrugName?: string;
        ownQuantity: number;
        competitorQuantity: number;
        ownPackSize: string;
        competitorPackSize: string;
    }[];
}

export interface UpdateRcpaRequest {
    totalPrescriptions?: number;
    remarks?: string;
    drugData?: {
        drugId?: string;
        competitorDrugName?: string;
        ownQuantity: number;
        competitorQuantity: number;
        ownPackSize: string;
        competitorPackSize: string;
    }[];
}

export interface CreateRcpaResponse {
    success: boolean;
    message: string;
    data: {
        rcpaId: string;
        chemistName: string;
        reportingPeriod: string;
        totalPrescriptions: number;
        drugCount: number;
        createdBy: string;
    };
}

export interface UpdateRcpaResponse {
    success: boolean;
    message: string;
    data: {
        rcpaId: string;
        totalPrescriptions: number;
        updatedAt: string;
    };
}

export interface RcpaListResponse {
    success: boolean;
    message: string;
    data: RcpaReport[];
}

export interface RcpaDetailsResponse {
    success: boolean;
    message: string;
    data: RCPADetailsResponse;
}

class RcpaService {
    // Get all RCPA reports for logged-in user
    async getRcpaList(): Promise<RcpaReport[]> {
        try {
            const response = await axiosInstance.get<RcpaListResponse>('/rcpa');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch RCPA reports');
            }
        } catch (error: any) {
            console.error('Error fetching RCPA list:', error);
            throw error;
        }
    }

    // Get RCPA report details by ID
    async getRcpaDetails(rcpaId: string): Promise<RCPADetailsResponse> {
        try {
            const response = await axiosInstance.get<RcpaDetailsResponse>(`/rcpa/${rcpaId}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch RCPA details');
            }
        } catch (error: any) {
            console.error('Error fetching RCPA details:', error);
            throw error;
        }
    }

    // Get chemists for RCPA creation (using existing chemist API)
    async getChemistsForRcpa(): Promise<Chemist[]> {
        try {
            const response = await axiosInstance.get<ChemistListResponse>('/chemists');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error('Failed to fetch chemists');
            }
        } catch (error: any) {
            console.error('Error fetching chemists for RCPA:', error);
            throw error;
        }
    }

    // Get drugs for RCPA creation - No pack size (user will enter manually)
    async getDrugsForRcpa(): Promise<Drug[]> {
        try {
            const response = await axiosInstance.get<{ success: boolean, data: any[] }>('/rcpa/drugs');

            if (response.data.success) {
                // Transform the response - pack size will be entered manually
                return response.data.data.map(drug => ({
                    id: drug.id,
                    name: drug.name,
                    price: drug.price,
                    composition: drug.composition,
                    manufacturer: drug.manufacturer,
                    category: drug.category
                }));
            } else {
                throw new Error('Failed to fetch drugs');
            }
        } catch (error: any) {
            console.error('Error fetching drugs for RCPA:', error);
            throw error;
        }
    }

    // Create a new RCPA report
    async createRcpa(rcpaData: CreateRcpaRequest): Promise<CreateRcpaResponse['data']> {
        try {
            const response = await axiosInstance.post<CreateRcpaResponse>('/rcpa', rcpaData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to create RCPA report');
            }
        } catch (error: any) {
            console.error('Error creating RCPA report:', error);
            throw error;
        }
    }

    // Update RCPA report
    async updateRcpa(rcpaId: string, rcpaData: UpdateRcpaRequest): Promise<UpdateRcpaResponse['data']> {
        try {
            const response = await axiosInstance.put<UpdateRcpaResponse>(`/rcpa/${rcpaId}`, rcpaData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to update RCPA report');
            }
        } catch (error: any) {
            console.error('Error updating RCPA report:', error);
            throw error;
        }
    }

    // Delete RCPA report
    async deleteRcpa(rcpaId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/rcpa/${rcpaId}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to delete RCPA report');
            }
        } catch (error: any) {
            console.error('Error deleting RCPA report:', error);
            throw error;
        }
    }
}

export default new RcpaService();