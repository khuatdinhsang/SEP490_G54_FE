import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { LoginData, LoginResponse, RegisterData, RegisterResponse, VerifyEmailResponse, VerifyForgetPassword } from '../constant/type/auth';

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
    forgetPassword(email: string): Promise<VerifyEmailResponse> {
        return axiosClient.get(`forget-password/email/${email}`);
    },
    verifyForgetPassword(data: VerifyForgetPassword): Promise<VerifyEmailResponse> {
        return axiosClient.post(`forget-password/email/verify`, data);
    },
};