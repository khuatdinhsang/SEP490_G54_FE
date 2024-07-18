import axios from 'axios';
import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { mentalData } from '../constant/type/medical';
import { dataPutNotification, notificationsResponse } from '../constant/type/notification';

const endpoint = '/notifications';

export const notificationService = {
    getListNotification(): Promise<ResponseForm<notificationsResponse[]>> {
        return axiosClient.get(`${endpoint}/mobile/get-all`);
    },
    putNotification(data: dataPutNotification): Promise<ResponseForm<string>> {
        return axiosClient.put(`${endpoint}/mobile/status`, data);
    },

};