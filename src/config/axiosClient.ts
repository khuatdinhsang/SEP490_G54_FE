import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';
export const baseURL = 'http://10.0.2.2:8080/api';
const axiosClient = axios.create({
    baseURL: baseURL,
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
        return Promise.reject(error.response.data.errors[0].message);
    }
);


axiosClient.interceptors.response.use(
    // Thực hiện các thay đổi trước khi phản hồi được trả về
    async (response) => {
        return response.data;
    },
    // Xử lý lỗi khi nhận phản hồi
    async (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            const accessToken = await AsyncStorage.getItem('accessToken');
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken && accessToken) {
                try {
                    console.log("vao day")
                    const response = await authService.refreshToken(refreshToken, accessToken);
                    console.log("res", response);
                    // const { accessToken } = response.data.data;
                    // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    // await AsyncStorage.setItem('accessToken', accessToken);
                    return axiosClient(originalRequest); // Gọi lại request ban đầu với accessToken mới
                } catch (refreshError: any) {
                    console.log("56", refreshError.response.data)
                    // await AsyncStorage.removeItem('refreshToken');
                    return Promise.reject(error);
                }
            } else {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
// axiosClient.interceptors.response.use(
//     (response) => response.data,
//     async (error) => {
//         console.error('Response error:', error.response ? error.response.data : error.message);
//         return Promise.reject(error);
//     }
// );
export { axiosClient };