import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { activityPost, activityPut, activityRecordResponse, bloodPressurePost, cardinalPost, dietPut, dietRecordResponse, foodIntakePost, listRegisterMedicineData, medicationResponse, medicinePost, medicinePut, mentalData, mentalPost, mentalPutResponse, mentalResponse, stepsNumberPost, weightPost } from '../constant/type/medical';
import { VerifyEmailResponse } from '../constant/type/auth';
import { ResponseForm } from '../constant/type';

export const planService = {
    getListMental(): Promise<ResponseForm<mentalData[]>> {
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
    postMedicine(data: medicinePost[]): Promise<ResponseForm<medicationResponse>> {
        return axiosClient.post(`medicine-records`, data);
    },
    getListRegisterMedicine(weekStart: string): Promise<ResponseForm<listRegisterMedicineData[]>> {
        return axiosClient.get(`medicine-records/mobile/plan-medicine/${weekStart}`);
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
    getListMentalRecords(weekStart: string): Promise<ResponseForm<mentalData[]>> {
        return axiosClient.get(`mental-records/mobile/mental-rule/${weekStart}`);
    },
    putMentalRecords(data: mentalPost): Promise<ResponseForm<mentalPutResponse>> {
        return axiosClient.put(`mental-records`, data);
    },
    getListMedicationRecords(weekStart: string): Promise<ResponseForm<listRegisterMedicineData[]>> {
        return axiosClient.get(`medicine-records/mobile/plan-medicine/${weekStart}`);
    },
    getDietRecord(weekStart: string): Promise<ResponseForm<number>> {
        return axiosClient.get(`diet-records/mobile/dish-plan/${weekStart}`);
    },
    putMedicine(data: medicinePut): Promise<ResponseForm<any>> {
        return axiosClient.put(`medicine-records`, data);
    },



};