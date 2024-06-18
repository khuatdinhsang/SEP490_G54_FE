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
export interface appointment {
    id: number,
    appUserName: string,
    date: string,
    hospital: string,
    typeMedicalAppointment: TypeMakeHospitalSchedule,
    statusMedicalAppointment: string,
    note: string
}
export interface appointMentResponse {
    code: number,
    result: appointment
}
export interface listAppointMentResponse {
    code: number,
    result: appointment[]
}