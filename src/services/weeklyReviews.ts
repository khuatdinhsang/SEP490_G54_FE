import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { HistoryMedicalResponse } from '../constant/type/medical';
import { ResponseWeeklyReview } from '../constant/type/weekly';

const endpoint = '/weekly-reviews';

export const weeklyReviewService = {
    getWeeklyReviews(): Promise<ResponseForm<string[]>> {
        return axiosClient.get(`${endpoint}/mobile/week-starts`);
    },
    getDetailWeeklyReviews(weekStart: string): Promise<ResponseForm<ResponseWeeklyReview>> {
        return axiosClient.get(`${endpoint}/mobile/review/${weekStart}`);
    }

};