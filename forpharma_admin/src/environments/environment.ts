import Login from "../components/Auth/Login";

const API_BASE_URL = 'http://localhost:3000/api';
console.log('API Base URL:', API_BASE_URL);

const API_ENDPOINTS = {
    CreateOrganization: `${API_BASE_URL}/organization/create`,
    GoogleLogin: `${API_BASE_URL}/user/google-login`,
    Login: `${API_BASE_URL}/user/login`,
};

export default API_ENDPOINTS;
