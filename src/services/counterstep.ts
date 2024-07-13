import {axiosClient} from '../config/axiosClient';
import {ResponseForm} from '../constant/type';

export const counterStepService = {
  getCounterStep(): Promise<ResponseForm<number>> {
    return axiosClient.get('/step-records/get-current-record');
  },
};
