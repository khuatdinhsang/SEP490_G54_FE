import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { LoginData, LoginResponse, RegisterData, RegisterResponse, VerifyEmailResponse } from '../constant/type/auth';

const endpoint = '/auth';

export const authService = {
    login(data: LoginData): Promise<ResponseForm<LoginResponse>> {
        return axiosClient.post(`${endpoint}/login`, data);
    },
    register(data: RegisterData): Promise<RegisterResponse> {
        return axiosClient.post(`${endpoint}/register`, data);
    },
    verifyEmailApi(email: string): Promise<VerifyEmailResponse> {
        return axiosClient.get(`${endpoint}/email/${email}`);
    },
};