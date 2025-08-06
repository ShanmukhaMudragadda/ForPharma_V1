
import axios from 'axios';
import axiosInstance from './axiosConfig'; // Import the configured Axios instance

// The API_BASE_URL is now handled by axiosInstance, so we don't need it here.
// const API_BASE_URL = 'http://192.168.11.22:3000'; 

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

/**
 * Logs in a user with email and password using the pre-configured axiosInstance.
 * The request URL is now a relative path, as the base URL is set in axiosConfig.
 * * @param email The user's email address.
 * @param password The user's password.
 * @returns A promise that resolves to the login response data.
 */
export async function loginWithEmail(email: string, password: string): Promise<LoginResponse> {
  console.log("inside login with email");
  const response = await axiosInstance.post(`/user/login`, {
    email,
    password,
  });
  return response.data;
}

/**
 * Logs in a user with a Google ID token.
 * The request URL is now a relative path.
 * * @param idToken The Google ID token.
 * @returns A promise that resolves to the login response data.
 */
export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
  const response = await axiosInstance.post(`/api/user/google_login`, {
    idToken,
  });
  return response.data;
}
