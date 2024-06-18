import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { medicalAppointmentData, appointMentResponse, listAppointMentResponse } from '../constant/type/medical';

const endpoint = '/medical-appointment';

export const medicalAppointmentService = {
    create(data: medicalAppointmentData): Promise<appointMentResponse> {
        return axiosClient.post(`${endpoint}`, data);
    },
    getAll(): Promise<listAppointMentResponse> {
        return axiosClient.get(`${endpoint}/mobile`);
    }

};