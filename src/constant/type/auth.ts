import { LANG } from './../../page/home/const/index';
export interface LoginData {
    email: string;
    password: string;
    deviceToken: string,
    language: LANG
}
export interface VerifyForgetPassword {
    email: string,
    password: string;
}
export interface changePassword {
    oldPassword: string,
    newPassword: string;
}
export interface RegisterData {
    email: string;
    password: string;
    name: string,
    cic: string,
    dob: string,
    gender: boolean,
    height: number,
    weight: number,
    phoneNumber: string,
    listMedicalHistory: number[]
}
export interface changeLanguage {
    deviceToken: string,
    language: LANG,
}
export interface VerifyEmailResponse {
    code: number;
    result: string | boolean;
}

export interface heightWeightResponse {
    name: string,
    height: number,
    weight: number,
    medicalUser: {
        id: number,
        name: string
    }
}

export interface LoginResponse {
    type: 'ADMIN' | 'USER' | 'MEDICAL_SPECIALIST' | 'DELETED';
    accessToken: string;
    idUser: number;
    refreshToken: string
}
export interface refreshTokenResponse {
    accessToken: string;
    refreshToken: string
}
export interface RegisterResponse {
    code: number,
    message: string
}
export interface refreshTokenResponse {
    accessToken: string,
    refreshToken: string
}