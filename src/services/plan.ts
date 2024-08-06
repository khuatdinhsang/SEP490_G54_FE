import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { activityPost, activityPut, activityRecordResponse, bloodPressurePost, cardinalPost, dietPut, dietRecordResponse, foodIntakePost, listRegisterMedicineData, medicationResponse, medicinePost, medicinePut, mentalData, mentalPost, mentalPutResponse, mentalResponse, stepsNumberPost, timeMeasureDone, weightPost } from '../constant/type/medical';
import { VerifyEmailResponse } from '../constant/type/auth';
import { ResponseForm } from '../constant/type';
import { LANG } from '../page/home/const';

export const planService = {
    getListMental(lang: LANG): Promise<ResponseForm<mentalData[]>> {
        return axiosClient.get(`mental-rules/mobile/${lang}`);
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
    postMedicine(data: medicinePost[]): Promise<ResponseForm<medicationResponse>> {
        return axiosClient.post(`medicine-records`, data);
    },
    getListRegisterMedicine(weekStart: string, lang: LANG): Promise<ResponseForm<listRegisterMedicineData[]>> {
        return axiosClient.get(`medicine-records/mobile/plan-medicine/${weekStart}/${lang}`);
    },
    postCardinal(data: cardinalPost): Promise<ResponseForm<cardinalPost>> {
        return axiosClient.post(`cardinal-records`, data);
    },
    postBloodPressure(data: bloodPressurePost): Promise<ResponseForm<bloodPressurePost>> {
        return axiosClient.post(`blood-pressure`, data);
    },
    postWeight(data: weightPost): Promise<ResponseForm<weightPost>> {
        return axiosClient.post(`weight-records`, data);
    },
    putActivity(data: activityPut): Promise<ResponseForm<activityRecordResponse>> {
        return axiosClient.put(`activity-records`, data);
    },
    putDiet(data: dietPut): Promise<ResponseForm<dietRecordResponse>> {
        return axiosClient.put(`diet-records`, data);
    },
    getListMentalRecords(weekStart: string, lang: LANG): Promise<ResponseForm<mentalData[]>> {
        return axiosClient.get(`mental-records/mobile/mental-rule/${weekStart}/${lang}`);
    },
    putMentalRecords(data: mentalPost): Promise<ResponseForm<mentalPutResponse>> {
        return axiosClient.put(`mental-records`, data);
    },
    getListMedicationRecords(weekStart: string, lang: LANG): Promise<ResponseForm<listRegisterMedicineData[]>> {
        return axiosClient.get(`medicine-records/mobile/medicine-day/${weekStart}/${lang}`);
    },
    getDietRecord(weekStart: string): Promise<ResponseForm<number>> {
        return axiosClient.get(`diet-records/mobile/dish-plan/${weekStart}`);
    },
    putMedicine(data: medicinePut): Promise<ResponseForm<any>> {
        return axiosClient.put(`medicine-records`, data);
    },
    getTimeMeasureDone(): Promise<ResponseForm<timeMeasureDone>> {
        return axiosClient.get(`cardinal-records/get-time-measure-done`);
    },


};