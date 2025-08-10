import axiosInstance from '../api/axiosConfig';

export interface DCRReport {
    dcrId: string;
    customerName: string;
    date: string;
    timings: string;
    status: string;
}

export interface DCRDetails {
    dcrId: string;
    reportDate: string;
    status: string;
    productsDiscussed: string;
    comments: string;
    createdBy: {
        name: string;
        email?: string;
    };
    taskType?: string;
    taskId?: string;
    taskDetails?: any;
    createdAt: string;
    updatedAt: string;
}

export interface TaskDetail {
    taskId: string;
    taskType: string;
    name: string;
    date: string;
    address: string;
    timings: string;
}

export interface CreateDCRRequest {
    taskId: string;
    taskType: string;
    productsDiscussed?: string;
    comments?: string;
    isDraft: boolean;
}

export interface UpdateDCRRequest {
    productsDiscussed?: string;
    comments?: string;
    isDraft: boolean;
}

export interface CreateDCRResponse {
    success: boolean;
    message: string;
    data: {
        dcrId: string;
        status: string;
        reportDate: string;
    };
}

export interface UpdateDCRResponse {
    success: boolean;
    message: string;
    data: {
        dcrId: string;
        status: string;
        reportDate: string;
    };
}

export interface DCRListResponse {
    success: boolean;
    message: string;
    data: DCRReport[];
}

export interface DCRDetailsResponse {
    success: boolean;
    message: string;
    data: DCRDetails;
}

export interface TaskListResponse {
    success: boolean;
    message: string;
    data: TaskDetail[];
}

export interface DCRListParams {
    search?: string;
    dateRange?: string;
    customStartDate?: string;
    customEndDate?: string;
}

class DCRService {
    // Get all DCR reports for logged-in user
    async getDCRList(params?: DCRListParams): Promise<DCRReport[]> {
        try {
            const queryParams = new URLSearchParams();

            if (params?.search) {
                queryParams.append('search', params.search);
            }
            if (params?.dateRange) {
                queryParams.append('dateRange', params.dateRange);
            }
            if (params?.customStartDate) {
                queryParams.append('customStartDate', params.customStartDate);
            }
            if (params?.customEndDate) {
                queryParams.append('customEndDate', params.customEndDate);
            }

            const queryString = queryParams.toString();
            const url = queryString ? `/dcr?${queryString}` : '/dcr';

            const response = await axiosInstance.get<DCRListResponse>(url);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch DCR reports');
            }
        } catch (error: any) {
            console.error('Error fetching DCR list:', error);
            throw error;
        }
    }

    // Get DCR details by ID
    async getDCRDetails(dcrId: string): Promise<DCRDetails> {
        try {
            const response = await axiosInstance.get<DCRDetailsResponse>(`/dcr/${dcrId}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch DCR details');
            }
        } catch (error: any) {
            console.error('Error fetching DCR details:', error);
            throw error;
        }
    }

    // Get available tasks for DCR creation
    async getTasksForDCR(): Promise<TaskDetail[]> {
        try {
            const response = await axiosInstance.get<TaskListResponse>('/dcr/tasks/available');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch tasks');
            }
        } catch (error: any) {
            console.error('Error fetching tasks for DCR:', error);
            throw error;
        }
    }

    // Create a new DCR report
    async createDCR(dcrData: CreateDCRRequest): Promise<CreateDCRResponse['data']> {
        try {
            const response = await axiosInstance.post<CreateDCRResponse>('/dcr', dcrData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to create DCR');
            }
        } catch (error: any) {
            console.error('Error creating DCR:', error);
            throw error;
        }
    }

    // Update an existing DCR report
    async updateDCR(dcrId: string, updateData: UpdateDCRRequest): Promise<UpdateDCRResponse['data']> {
        try {
            const response = await axiosInstance.put<UpdateDCRResponse>(`/dcr/${dcrId}`, updateData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to update DCR');
            }
        } catch (error: any) {
            console.error('Error updating DCR:', error);
            throw error;
        }
    }

    // Delete a DCR report
    async deleteDCR(dcrId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/dcr/${dcrId}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to delete DCR');
            }
        } catch (error: any) {
            console.error('Error deleting DCR:', error);
            throw error;
        }
    }
}

export default new DCRService();