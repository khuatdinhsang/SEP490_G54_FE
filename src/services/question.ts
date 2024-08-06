import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { VerifyEmailResponse } from '../constant/type/auth';
import { detailQuestion, listQuestion, questionData, questionRegular } from '../constant/type/question';
import { ResponseForm } from '../constant/type';
import { LANG } from '../page/home/const';

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
    },
    getListQuestionRegular(lang: LANG): Promise<ResponseForm<questionRegular[]>> {
        return axiosClient.get(`faq/mobile/${lang}`);
    },
};