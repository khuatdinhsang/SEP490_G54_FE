import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { VerifyEmailResponse } from '../constant/type/auth';
import { detailQuestion, listQuestion, questionData } from '../constant/type/question';

const endpoint = '/questions';
export const questionService = {
    getListQuestionByUser(): Promise<listQuestion> {
        return axiosClient.get(`${endpoint}/user`);
    },
    create(data: questionData): Promise<VerifyEmailResponse> {
        return axiosClient.post(`${endpoint}`, data);
    },
    getDetailQuestion(id: number): Promise<detailQuestion> {
        return axiosClient.get(`${endpoint}/detail/${id}`);
    }
};