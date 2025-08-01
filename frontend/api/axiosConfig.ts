import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Create axios instance
const axiosInstance = axios.create({
    // baseURL: 'http://192.168.11.22:3000/api', // Using your backend URL
    baseURL: 'http://192.168.1.29:3000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            // const token = await SecureStore.getItemAsync('token');
            const token = await AsyncStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            console.error('Error getting auth token:', error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            await AsyncStorage.removeItem('token');
            console.log('Token removed successfully!');
            await AsyncStorage.removeItem('user');
            console.log('user removed successfully!');
            // await SecureStore.deleteItemAsync('token');
            // await SecureStore.deleteItemAsync('user');
            // Navigate to login screen (you can implement this based on your navigation setup)
            // router.replace('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
