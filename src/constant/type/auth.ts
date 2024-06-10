export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    type: 'ADMIN' | 'USER' | 'MEDICAL_SPECIALIST' | 'DELETED';
    token: string;
    idUser: number;
}