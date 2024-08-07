import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { mentalData } from '../constant/type/medical';
import { LANG } from '../page/home/const';

const endpoint = '/medicine-types';

export const medicineService = {
    getListMedicineType(lang: LANG): Promise<ResponseForm<mentalData[]>> {
        return axiosClient.get(`${endpoint}/mobile/${lang}`);
    },

};