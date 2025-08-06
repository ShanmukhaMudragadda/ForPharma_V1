import API_ENDPOINTS from '../environments/environment';
import axios from 'axios';

export class AdminService {
    private createOrgUrl = API_ENDPOINTS.CreateOrganization;
    private loginUrl = API_ENDPOINTS.Login;
    private googleLoginUrl = API_ENDPOINTS.GoogleLogin;


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

    async login(email: string, password: string) {
        try {
            const response = await axios.post(this.loginUrl, { email, password });
            return response.data; // Returns the login result
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Propagate the error for further handling
        }
    }

    async googleLogin(idToken: string) {
        try {
            const response = await axios.post(this.googleLoginUrl, { idToken });
            return response.data; // Returns the Google login result
        } catch (error) {
            console.error('Error during Google login:', error);
            throw error; // Propagate the error for further handling
        }
    }
}