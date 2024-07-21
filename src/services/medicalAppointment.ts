import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { medicalAppointmentData, appointMentResponse, listAppointMentResponse, appointment } from '../constant/type/medical';

const endpoint = '/medical-appointment';

export const medicalAppointmentService = {
    create(data: medicalAppointmentData): Promise<appointMentResponse> {
        return axiosClient.post(`${endpoint}`, data);
    },
    getAll(): Promise<ResponseForm<appointment[]>> {
        return axiosClient.get(`${endpoint}/mobile`);
    }

};