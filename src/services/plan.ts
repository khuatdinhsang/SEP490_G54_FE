import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { mentalPost, mentalResponse } from '../constant/type/medical';
import { VerifyEmailResponse } from '../constant/type/auth';

export const planService = {
    getListMental(): Promise<mentalResponse> {
        return axiosClient.get(`mental-rules/mobile`);
    },
    postListMental(data: mentalPost): Promise<VerifyEmailResponse> {
        return axiosClient.post(`mental-records`, data);
    }

};