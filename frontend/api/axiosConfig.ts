import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';


const router = useRouter();
// Create axios instance
const axiosInstance = axios.create({

    //baseURL: 'http://192.168.0.108:3000/api',
    baseURL: 'http://192.168.10.247:3000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    async (config) => {
        try {

            if (Platform.OS === 'web') {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            else {
                const token = await AsyncStorage.getItem('token')
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
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

            // console.log('Token removed successfully!');

            // console.log('user removed successfully!');
            if (Platform.OS === 'web') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            else {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');
            }

            // await SecureStore.deleteItemAsync('token');
            // await SecureStore.deleteItemAsync('user');
            // Navigate to login screen (you can implement this based on your navigation setup)
            router.replace('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;