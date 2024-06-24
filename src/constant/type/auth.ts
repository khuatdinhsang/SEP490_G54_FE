export interface LoginData {
    email: string;
    password: string;
}
export interface VerifyForgetPassword {
    email: string,
    code: string,
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
export interface VerifyEmailResponse {
    code: number;
    result: string;
}

export interface LoginResponse {
    type: 'ADMIN' | 'USER' | 'MEDICAL_SPECIALIST' | 'DELETED';
    accessToken: string;
    idUser: number;
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