import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { LoginData, LoginResponse } from '../constant/type/auth';

const endpoint = '/auth';

export const authService = {
    login(data: LoginData): Promise<ResponseForm<LoginResponse>> {
        return axiosClient.post(`${endpoint}/login`, data);
    },
};