import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
interface StepRes {
  currentValue: number,
  planedValue: number
}
export const counterStepService = {
  getCounterStep(): Promise<ResponseForm<StepRes>> {
    return axiosClient.get('/step-records/get-current-record');
  },
};
