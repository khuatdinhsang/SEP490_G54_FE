import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { HistoryMedicalResponse } from '../constant/type/medical';
import { ResponseWeeklyReview } from '../constant/type/weekly';
import { listMonthNumberRes, listQuestionRes, postQuestionData } from '../constant/type/question';
import { TypeQuestion } from '../constant';

const endpoint = '/monthly-question';

export const monthlyQuestionService = {
    getListMonthNumber(): Promise<ResponseForm<listMonthNumberRes[]>> {
        return axiosClient.get(`${endpoint}/mobile/list-month-number`);
    },
    getListQuestion(type: TypeQuestion): Promise<ResponseForm<listQuestionRes>> {
        return axiosClient.get(`form-question/mobile/get-form-monthly/${type}`);
    },
    postListQuestion(data: postQuestionData[]): Promise<{ code: number }> {
        return axiosClient.post(`${endpoint}`, data);
    },
};