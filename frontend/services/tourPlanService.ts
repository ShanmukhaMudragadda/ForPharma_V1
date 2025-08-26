import axiosInstance from "@/api/axiosConfig";

class tourPlanService {
    async getTourPlans() {
        try {
            console.log('Fetching all Tour Plans');
            const response = await axiosInstance.get('/tourPlan/getToutPlans');
            if (response.data.success) {
                return response.data.tourPlans
            }
            else {
                throw new Error(response.data.message || `Failed to fetch Tour Plans`)
            }

        } catch (error) {
            console.error('Error fetching Tour Plans :', error);
            throw error;
        }
    }
}

export default new tourPlanService();
