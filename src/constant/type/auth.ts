export interface LoginData {
    email: string;
    password: string;
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
export interface VerifyEmailResponse {
    code: number;
    result: string;
}

export interface LoginResponse {
    type: 'ADMIN' | 'USER' | 'MEDICAL_SPECIALIST' | 'DELETED';
    token: string;
    idUser: number;
}
export interface RegisterResponse {
    code: number,
    message: string
}