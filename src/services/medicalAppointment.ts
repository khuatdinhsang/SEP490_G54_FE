import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { HistoryMedicalResponse, medicalAppointmentData } from '../constant/type/medical';

const endpoint = '/medical-appointment';

export const medicalAppointmentService = {
    create(data: medicalAppointmentData): Promise<any> {
        return axiosClient.post(`${endpoint}`, data);
    },

};