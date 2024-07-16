import axios from 'axios';
import { axiosClient, baseURL } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { LoginData, LoginResponse, RegisterData, RegisterResponse, VerifyEmailResponse, VerifyForgetPassword, changePassword } from '../constant/type/auth';

const endpoint = '/auth';

export const authService = {
    login(data: LoginData): Promise<ResponseForm<LoginResponse>> {
        return axiosClient.post(`${endpoint}/login`, data);
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
        console.log("a", data)
        return axiosClient.post(`forget-password/email/change-password`, data);
    },
    changePassword(data: changePassword): Promise<VerifyEmailResponse> {
        return axiosClient.put(`accounts/change-password`, data);
    },
    refreshToken(refreshToken: string, accessToken: string): Promise<ResponseForm<LoginResponse>> {
        console.log("vao day may lan")
        return axios.get(`${baseURL}${endpoint}/refresh-token/${refreshToken}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        });
    },

};