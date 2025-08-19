import Login from "../components/Auth/Login";

const API_BASE_URL = 'http://localhost:3000/api';
console.log('API Base URL:', API_BASE_URL);

const API_ENDPOINTS = {
    CreateOrganization: `${API_BASE_URL}/organization/create`,
    GoogleLogin: `${API_BASE_URL}/user/google-login`,
    Login: `${API_BASE_URL}/user/login`,
    CreateUser: `${API_BASE_URL}/user/create`,
    ActivateAccount: `${API_BASE_URL}/user/activate_account`,
    GetUsers: `${API_BASE_URL}/user/get_users`,
    GetDoctors: `${API_BASE_URL}/doctors`,
    CreateDoctor: `${API_BASE_URL}/doctors/create`,
};

export default API_ENDPOINTS;
