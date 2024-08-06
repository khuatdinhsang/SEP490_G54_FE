import axios from 'axios';
import { axiosClient, baseURL } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { LoginData, LoginResponse, RegisterData, RegisterResponse, VerifyEmailResponse, VerifyForgetPassword, changeLanguage, changePassword, heightWeightResponse, refreshTokenResponse } from '../constant/type/auth';

const endpoint = '/auth';

export const authService = {
    login(data: LoginData): Promise<ResponseForm<LoginResponse>> {
        return axiosClient.post(`${endpoint}/login`, data);
    },
    logout(): Promise<ResponseForm<string>> {
        return axiosClient.get(`${endpoint}/logout`);
    },
    register(data: RegisterData): Promise<RegisterResponse> {
        return axiosClient.post(`${endpoint}/mobile/register`, data);
    },
    verifyEmailApi(email: string): Promise<VerifyEmailResponse> {
        return axiosClient.get(`${endpoint}/verify-mail/${email}`);
    },
    checkRegisterEmail(email: string, code: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`${endpoint}/check-register-email/${email}/${code}`);
    },
    checkForgetPasswordEmail(email: string, code: string): Promise<ResponseForm<boolean>> {
        return axiosClient.post(`forget-password/email/verify`, { email: email, code: code });
    },
    forgetPassword(email: string): Promise<VerifyEmailResponse> {
        return axiosClient.get(`forget-password/email/${email}`);
    },
    verifyForgetPassword(data: VerifyForgetPassword): Promise<VerifyEmailResponse> {
        return axiosClient.post(`forget-password/email/change-password`, data);
    },
    changePassword(data: changePassword): Promise<VerifyEmailResponse> {
        return axiosClient.put(`accounts/change-password`, data);
    },
    getHeightWeight(): Promise<ResponseForm<heightWeightResponse>> {
        return axiosClient.get(`app-user/mobile/get-height-weight`);
    },
    refreshToken(refreshToken: string, accessToken: string): Promise<any> {
        return axios.get(`${baseURL}${endpoint}/refresh-token/${refreshToken}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        });
    },
    checkExpiredRefreshToken(refreshToken: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`${baseURL}${endpoint}/check-refresh-token/${refreshToken}`)
    },
    changeLanguage(data: changeLanguage): Promise<ResponseForm<boolean>> {
        console.log("dat51", data)
        return axiosClient.put(`${baseURL}/notifications/mobile/change-language`, data)
    },

};