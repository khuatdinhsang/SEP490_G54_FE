import { TypeMakeHospitalSchedule } from "../../page/profile/const";

export interface HistoryMedicalResponse {
    id: number;
    name: string;
    type: string,
    deleted: boolean
}
export interface medicalAppointmentData {
    location: string,
    type: TypeMakeHospitalSchedule | undefined,
    note: string,
    date: Date
}