import { TypeActivityRecord } from "../../page/planManagement/const";
import { TypeMakeHospitalSchedule, TypeStatusMedicalAppointment } from "../../page/profile/const";
import { TypeTimeMeasure } from "../../page/recordHealthData/contant";

export interface HistoryMedicalResponse {
    id: number;
    name: string;
    type: string,
    deleted: boolean,
    imageUrl: string
}
export interface medicalAppointmentData {
    location: string,
    type: TypeMakeHospitalSchedule | undefined,
    note: string,
    date: string
}
export interface appointment {
    id: number,
    appUserName: string,
    date: string,
    hospital: string,
    typeMedicalAppointment: TypeMakeHospitalSchedule,
    statusMedicalAppointment: TypeStatusMedicalAppointment,
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
export interface mentalData {
    id: number,
    title: number,
    description: string,
    deleted: boolean
}
export interface mentalResponse {
    code: number,
    result: mentalData[]
}
export interface mentalPost {
    status: boolean,
    weekStart?: string,
    mentalRuleId: number[],
    date: string
}
export interface activityPost {
    planType: TypeActivityRecord | undefined,
    weekStart: string,
    planDuration: number,
    schedule: string[]
}
export interface foodIntakePost {
    dishPerDay: number,
    weekStart: string
}
export interface stepsNumberPost {
    plannedStepPerDay: number,
    weekStart: string
}
export interface medicinePost {
    weekStart: string,
    medicineTypeId: number | undefined,
    schedule: string[],
}
export interface listRegisterMedicineData {
    date: string
    id: number,
    medicineId: number,
    medicineName: string
}
export interface cardinalPost {
    id?: number,
    timeMeasure: TypeTimeMeasure,
    weekStart: string,
    date: string,
    cholesterol: number | null,
    bloodSugar: number | null,
    hba1c: number | null
}
export interface bloodPressurePost {
    id?: number,
    weekStart: string,
    date: string,
    systole: number,
    diastole: number
}
export interface weightPost {
    id?: number,
    weekStart: string,
    date: string,
    weight: number
}


export interface activityRecordResponse {
    id: number,
    weekStart: string,
    planType: TypeActivityRecord
    actualType: TypeActivityRecord,
    planDuration: number,
    actualDuration: number,
    date: string
}
export interface timeMeasureDone {
    beforeBreakfast: boolean,
    afterBreakfast: boolean,
    beforeLunch: boolean,
    afterLunch: boolean,
    beforeDinner: boolean,
    afterDinner: boolean
}
export interface activityPut {
    actualType: TypeActivityRecord | undefined,
    actualDuration: number,
    date: string,
}
export interface dietPut {
    actualValue: number,
    date: string
}
export interface dietRecordResponse {
    id: number,
    weekStart: string,
    date: string
    actualValue: number
    disPerDay: number,
}
export interface medicationResponse {
    id: number,
    appUserName: string,
    weekStart: string,
    medicineType: string,
    hour: string,
    date: string,
    status: true
}

export interface mentalPutResponse {
    appUserId: number,
    status: boolean,
    weekStart: string,
    mentalRuleId: number,
    date: string
}

export interface medicinePut {
    status: boolean,
    date: string,
    ids: number[]
}