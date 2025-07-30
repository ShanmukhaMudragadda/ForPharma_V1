import API_ENDPOINTS from '../environments/environment';
import axios from 'axios';

export class AdminService {
    private createOrgUrl = API_ENDPOINTS.CreateOrganization;


    async createOrganization(data: {
        name: string;
        email: string;
        address?: string;
        website?: string;
        adminEmail: string;
        adminPassword: string;
        adminFirstName: string;
        adminLastName?: string;
    }) {
        try {
            const response = await axios.post(this.createOrgUrl, data);
            return response.data; // Returns the organization creation result
        } catch (error) {
            console.error('Error creating organization:', error);
            throw error; // Propagate the error for further handling
        }
    }
}