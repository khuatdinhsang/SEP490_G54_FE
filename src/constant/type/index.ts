export interface ResponseForm<T> {
    code: number;
    success?: string;
    result: T;
    message?: string;
}