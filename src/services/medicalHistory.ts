import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { HistoryMedicalResponse } from '../constant/type/medical';

const endpoint = '/medical-history';

export const medicalService = {
    getMedicalHistory(): Promise<ResponseForm<HistoryMedicalResponse>> {
        return axiosClient.get(`${endpoint}/mobile`);
    },

};