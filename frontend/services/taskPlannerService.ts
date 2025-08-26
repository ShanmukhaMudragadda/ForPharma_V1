import axiosInstance from '../api/axiosConfig';

// Interfaces for Task Planner
export interface TaskPlannerData {
    id: string;
    startDate: string;
    endDate: string;
    approvalStatus: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    statistics: {
        totalTasks: number;
        doctorTasks: number;
        chemistTasks: number;
        tourPlanTasks: number;
    };
    tasks: {
        doctorTasks: TaskItem[];
        chemistTasks: TaskItem[];
        tourPlanTasks: TaskItem[];
        allTasks: TaskItem[];
    };
}

export interface TaskItem {
    id: string;
    taskDate: string;
    startTime: string;
    endTime: string;
    completionStatus: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    approvalStatus: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
    type: 'DOCTOR' | 'CHEMIST' | 'TOUR_PLAN';
    entityName: string;
    entityDetails: string;
    location: string | null;
}

export interface CreateTaskPlannerRequest {
    startDate: string;
    endDate: string;
}

export interface CreateTaskPlannerResponse {
    success: boolean;
    message: string;
    taskPlanner: {
        id: string;
        employeeId: string;
        startDate: string;
        endDate: string;
    };
}

export interface GetTaskPlannerResponse {
    success: boolean;
    message: string;
    data: {
        planners: TaskPlannerData[];
        currentDate: string;
    };
}

export interface DeleteTaskPlannerRequest {
    taskPlannerId: string;
}

class TaskPlannerService {
    // Get all task planners
    async getTaskPlanners(): Promise<TaskPlannerData[]> {
        try {
            console.log('🚀 Fetching task planners from API...');

            const response = await axiosInstance.get<GetTaskPlannerResponse>('/taskPlanners/getTaskPlanner');

            console.log('✅ Task planners response:', response.data);

            if (response.data.success) {
                return response.data.data.planners;
            } else {
                throw new Error(response.data.message || 'Failed to fetch task planners');
            }
        } catch (error: any) {
            console.error('❌ Error fetching task planners:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to fetch task planners`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to load task planners');
            }
        }
    }

    // Create new task planner
    async createTaskPlanner(data: CreateTaskPlannerRequest): Promise<CreateTaskPlannerResponse> {
        try {
            console.log('🚀 Creating task planner via API...', data);

            const response = await axiosInstance.post<CreateTaskPlannerResponse>(
                '/taskPlanners/createTaskPlanner',
                data
            );

            console.log('✅ Task planner created successfully:', response.data);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to create task planner');
            }
        } catch (error: any) {
            console.error('❌ Error creating task planner:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to create task planner`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to create task planner');
            }
        }
    }

    // Delete task planner
    async deleteTaskPlanner(taskPlanner_id: string): Promise<any> {
        try {
            console.log('🚀 Deleting task planner via API...', taskPlanner_id);

            const response = await axiosInstance.post(`/taskPlanners/deleteTaskPlanner/${taskPlanner_id}`);

            console.log('✅ Task planner deleted successfully:', response.data);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to delete task planner');
            }
        } catch (error: any) {
            console.error('❌ Error deleting task planner:', error);

            if (error.response) {
                console.error('❌ Response error:', error.response.data);
                throw new Error(error.response.data.message || `HTTP ${error.response.status}: Failed to delete task planner`);
            } else if (error.request) {
                console.error('❌ Request error - no response received');
                throw new Error('Network request failed - unable to connect to server');
            } else {
                console.error('❌ Setup error:', error.message);
                throw new Error(error.message || 'Failed to delete task planner');
            }
        }
    }

}

export default new TaskPlannerService();