import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { HistoryMedicalResponse } from '../constant/type/medical';
import { ResponseWeeklyReview } from '../constant/type/weekly';
import { listMonthNumberRes, listQuestionRes, postQuestionData, resultQuestionRes, satEvaluateRes, sfEvaluateRes } from '../constant/type/question';
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
    getResultListQuestion(monthNumber: number, type: TypeQuestion): Promise<ResponseForm<resultQuestionRes[]>> {
        return axiosClient.get(`${endpoint}/mobile/get-answer/${monthNumber}/${type}`);
    },
    getChartSAT(monthNumber: number): Promise<ResponseForm<satEvaluateRes[]>> {
        return axiosClient.get(`${endpoint}/mobile/screen-2-month-sat/get-detail/${monthNumber}`);
    },
    getChartSF(monthNumber: number): Promise<ResponseForm<sfEvaluateRes[]>> {
        return axiosClient.get(`${endpoint}/mobile/screen-2-month-sf/get-detail/${monthNumber}`);
    },
};