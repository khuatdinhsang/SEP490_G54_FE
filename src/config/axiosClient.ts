import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axiosClient = axios.create({
    baseURL: 'http://10.0.2.2:8080/api',
    // baseURL: 'http://18.142.95.164:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
axiosClient.interceptors.request.use(
    async (config: any) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        console.error('Response error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export { axiosClient };