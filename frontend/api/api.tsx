// frontend/api/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.180:3000'; // <-- Replace with your backend URL

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    organization: {
      id: string;
      name: string;
    };
  };
}

export async function loginWithEmail(email: string, password: string): Promise<LoginResponse> {
  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
}
export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
  const response = await axios.post(`${API_BASE_URL}/api/auth/googlelogin`, {
    idToken,
  });
  return response.data;
}