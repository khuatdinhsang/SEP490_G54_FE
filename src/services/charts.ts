import { dataChartStepResponse } from './../constant/type/chart';
import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { dataChartWeightResponse } from '../constant/type/chart';
export const chartService = {
    checkIsExistMedication(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`medicine-records/mobile/check-plan/${weekStart}`);
    },
    checkIsExistBloodPressure(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`blood-pressure/mobile/check-plan/${weekStart}`);
    },
    checkIsExistFoodIntake(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`diet-records/mobile/check-plan/${weekStart}`);
    },
    checkIsExistCardinal(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`cardinal-records/mobile/check-plan/${weekStart}`);
    },
    checkIsExistMental(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`mental-records/mobile/check-plan/${weekStart}`);
    },
    checkIsExistWeight(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`weight-records/mobile/check-plan/${weekStart}`);
    },
    checkIsExistActivity(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`activity-records/mobile/check-plan/${weekStart}`);
    },
    checkIsExistStep(weekStart: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`step-records/mobile/check-plan/${weekStart}`);
    },
    getDataWeight(): Promise<ResponseForm<dataChartWeightResponse>> {
        return axiosClient.get(`weight-records/mobile/chart`);
    },
    getDataSteps(): Promise<ResponseForm<dataChartStepResponse>> {
        return axiosClient.get(`step-records/mobile/chart`);
    },

};