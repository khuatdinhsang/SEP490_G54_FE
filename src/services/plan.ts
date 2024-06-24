import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { activityPost, foodIntakePost, medicinePost, mentalPost, mentalResponse, stepsNumberPost } from '../constant/type/medical';
import { VerifyEmailResponse } from '../constant/type/auth';

export const planService = {
    getListMental(): Promise<mentalResponse> {
        return axiosClient.get(`mental-rules/mobile`);
    },
    postListMental(data: mentalPost): Promise<VerifyEmailResponse> {
        return axiosClient.post(`mental-records`, data);
    },
    postActivity(data: activityPost): Promise<VerifyEmailResponse> {
        return axiosClient.post(`activity-records`, data);
    },
    postDiet(data: foodIntakePost): Promise<VerifyEmailResponse> {
        return axiosClient.post(`diet-records`, data);
    },
    postStepsNumber(data: stepsNumberPost): Promise<VerifyEmailResponse> {
        return axiosClient.post(`step-records`, data);
    },
    postMedicine(data: medicinePost): Promise<VerifyEmailResponse> {
        return axiosClient.post(`medicine-records`, data);
    },

};