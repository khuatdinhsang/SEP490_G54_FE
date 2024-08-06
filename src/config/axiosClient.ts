import { refreshTokenResponse } from './../constant/type/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';
import { createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import { SCREENS_NAME } from '../navigator/const';
import { navigate, navigationRef } from '../util/navigation';
import { jwtDecode } from 'jwt-decode';
export const baseURL = 'http://54.179.151.16:8080/api';
// export const baseURL = 'http://10.0.2.2:8080/api';
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// const isTokenExpired = (token: string): boolean => {
//   try {
//     const decoded: { exp: number } = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp < currentTime;
//   } catch (error) {
//     return true;
//   }
// };
axiosClient.interceptors.request.use(
  async (config: any) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error.response.data.errors[0].message);
  },
);

axiosClient.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  async (error) => {
    const handleLogout = async () => {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('deviceToken');
      await AsyncStorage.removeItem('language');
    };
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken && accessToken) {
        try {
          const response = await authService.refreshToken(refreshToken, accessToken);
          const newAccessToken = response.data.result.accessToken;
          const newRefreshToken = response.data.result.refreshToken
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          await AsyncStorage.setItem('accessToken', newAccessToken);
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
          return axiosClient(originalRequest);
        } catch (refreshError: any) {
          await handleLogout()
          return Promise.reject(error);
        }
      } else {
        await handleLogout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
// axiosClient.interceptors.response.use(
//   response => response.data,
//   async error => {
//     console.error(
//       'Response error:',
//       error.response ? error.response.data : error.message,
//     );
//     return Promise.reject(error);
//   },
// );
export { axiosClient };