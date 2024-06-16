import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { VerifyEmailResponse } from '../constant/type/auth';

const endpoint = '/questions';
const api = "http://10.0.2.2:8080/api"
export const questionService = {
    getListQuestionByUser(id: number, token: string | null): Promise<VerifyEmailResponse> {
        return axios.get(`${api}/${endpoint}/user?userId=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    },

};