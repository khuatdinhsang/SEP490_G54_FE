import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { mentalData } from '../constant/type/medical';

const endpoint = '/medicine-types';

export const medicineService = {
    getListMedicineType(): Promise<ResponseForm<mentalData[]>> {
        return axiosClient.get(`${endpoint}/mobile`);
    },

};