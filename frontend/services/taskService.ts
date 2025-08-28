import axiosInstance from "@/api/axiosConfig";


export interface DailyTask {
    id: string;
    type: 'doctor' | 'chemist' | 'tourplan';
    typeId: string;
    name: string;
    details?: string;
    date: string;
    startTime: string;
    endTime: string;
    location?: string;
    completionStatus: string;
    approvalStatus: string;
    plannerId: string;
}

export interface taskCounts {
    total: Number,
    doctors: Number,
    chemists: Number,
    tourPlans: Number
}

export interface statusCounts {
    pending: Number,
    completed: Number,
    rescheduled: Number,
    cancelled: Number
}

export interface GetTaskResponse {
    success: boolean,
    message: string,
    data: {
        date: string,
        tasks: DailyTask,
        summary: {
            counts: taskCounts,
            statusCounts: statusCounts
        }
    }
}

export interface createTask {
    taskPlannerId: string,
    type: string,
    type_id: string,
    date: string,
    startTime: string,
    endTime: string,
    location: string
}

class taskService {
    // Get All the tasks on a given date

    async getTasks(date: string) {
        try {
            console.log('Fetching tasks from backend', { date });

            const response = await axiosInstance.get<GetTaskResponse>(`/tasks/getTasks/${date}`);
            if (response.data.success) {
                console.log(response.data.data)
                return response.data
            }
            else {
                throw new Error(response.data.message || `Failed to fetch tasks on date: ${date}`)
            }

        } catch (error) {
            console.error('Error fetching tasks :', error);
            throw error;
        }
    }

    async getTasksOfPlannerId(plannerId: string) {
        try {
            console.log('Fetching tasks from backend for Task Planner', { plannerId });

            const response = await axiosInstance.get<GetTaskResponse>(`/tasks/getTasksOfPlannerId/${plannerId}`);
            if (response.data.success) {
                console.log(response.data.data)
                return response.data
            }
            else {
                throw new Error(response.data.message || `Failed to fetch tasks Task Planner: ${plannerId}`)
            }

        } catch (error) {
            console.error('Error fetching tasks :', error);
            throw error;
        }
    }

    async createTask(taskdata: createTask) {
        try {
            console.log('creating task');
            const response = await axiosInstance.post(`/tasks/createTask`, taskdata);

            if (response.data.success) {
                return response.data.data
            }
            else {
                throw new Error(response.data.message || 'Error in creating task')
            }

        } catch (error) {
            console.error('Error in creasting task:', error);
            throw error;
        }
    }

    // /deletetask/:type/:task_id'

    async deleteTask(type: string, task_id: string) {
        try {
            console.log(`Deleting ${type} type task task_id : ${task_id}`);
            const response = await axiosInstance.post(`/tasks/deletetask/${type}/${task_id}`);

            if (response.data.success) {
                return response.data.data
            }
            else {
                throw new Error(response.data.message || 'Error in deleting task')
            }
        } catch (error) {
            console.error('Error in deleting task :', error);
            throw error;
        }
    }

}

export default new taskService();

