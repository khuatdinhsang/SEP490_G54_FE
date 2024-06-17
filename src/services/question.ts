import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { VerifyEmailResponse } from '../constant/type/auth';
import { questionData } from '../constant/type/question';

const endpoint = '/questions';
export const questionService = {
    getListQuestionByUser(id: number): Promise<VerifyEmailResponse> {
        return axiosClient.get(`${endpoint}/user?userId=${id}`);
    },
    create(data: questionData): Promise<VerifyEmailResponse> {
        console.log("12", data)
        return axiosClient.post(`${endpoint}`, data);
    },
};