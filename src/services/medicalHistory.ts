import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { HistoryMedicalResponse } from '../constant/type/medical';
import { LANG } from '../page/home/const';

const endpoint = '/medical-history';

export const medicalService = {
    getMedicalHistory(lang: LANG): Promise<ResponseForm<HistoryMedicalResponse>> {
        return axiosClient.get(`${endpoint}/mobile/${lang}`);
    },

};