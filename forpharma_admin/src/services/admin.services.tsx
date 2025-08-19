import API_ENDPOINTS from '../environments/environment';
import axios from 'axios';

export class AdminService {
    private createOrgUrl = API_ENDPOINTS.CreateOrganization;
    private loginUrl = API_ENDPOINTS.Login;
    private googleLoginUrl = API_ENDPOINTS.GoogleLogin;
    private createUserUrl = API_ENDPOINTS.CreateUser;
    private activateAccountUrl = API_ENDPOINTS.ActivateAccount;
    private fetchUsersUrl = API_ENDPOINTS.GetUsers;
    private getDoctorsUrl = API_ENDPOINTS.GetDoctors;
    private createDoctorUrl = API_ENDPOINTS.CreateDoctor;


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

    async createUser(data: any) {
        try {
            const response = await axios.post(this.createUserUrl, data);
            return response.data; // Returns the user creation result
        } catch (error) {
            console.error('Error creating user:', error);
            throw error; // Propagate the error for further handling
        }
    }

    async activateAccount(email: string, password: string) {
        try {
            const response = await axios.post(this.activateAccountUrl, { email, password });
            return response.data; // Returns the account activation result
        } catch (error) {
            console.error('Error activating account:', error);
            throw error; // Propagate the error for further handling
        }
    }

    async fetchUsers(organizationId: string) {
        try {
            const response = await axios.get(`${this.fetchUsersUrl}?organizationId=${organizationId}`);
            return response.data; // Returns the list of users
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Propagate the error for further handling
        }
    }

    async getDoctors(token: string) {
        try {
            const response = await axios.get(`${this.getDoctorsUrl}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data; // Returns the list of doctors
        } catch (error) {
            console.error('Error fetching doctors:', error);
            throw error; // Propagate the error for further handling
        }   
    }

    async createDoctor(data: any, token: string) {
        try {
            console.log('Creating doctor with data:', data);
            const response = await axios.post(this.createDoctorUrl, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data; // Returns the doctor creation result
        } catch (error) {
            console.error('Error creating doctor:', error);
            throw error; // Propagate the error for further handling
        }
    }
}