import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { putLesson1, putLesson2, putLesson3, putLesson4, putLesson5, putLesson6, putLesson7 } from '../constant/type/lesson';
export const lessonService = {
    getLessonUnLocked(): Promise<ResponseForm<{ lesson: number, statusCheck: boolean }>> {
        return axiosClient.get(`user-lessons/unlocked-lessons`);
    },
    getLesson1(): Promise<ResponseForm<putLesson1>> {
        return axiosClient.get("user-week1-information/lesson1");
    },
    putLesson1(data: putLesson1): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson1", data);
    },
    getLesson2(): Promise<ResponseForm<putLesson2>> {
        return axiosClient.get("user-week1-information/lesson2");
    },
    putLesson2(data: putLesson2): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson2", data);
    },
    getLesson3(): Promise<ResponseForm<putLesson3>> {
        return axiosClient.get("user-week1-information/lesson3");
    },
    putLesson3(data: putLesson3): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson3", data);
    },
    getLesson4(): Promise<ResponseForm<putLesson4>> {
        return axiosClient.get("user-week1-information/lesson4");
    },
    putLesson4(data: putLesson4): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson4", data);
    },
    getLesson5(): Promise<ResponseForm<putLesson5>> {
        return axiosClient.get("user-week1-information/lesson5");
    },
    putLesson5(data: putLesson5): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson5", data);
    },
    getLesson6(): Promise<ResponseForm<putLesson6>> {
        return axiosClient.get("user-week1-information/lesson6");
    },
    putLesson6(data: putLesson6): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson6", data);
    },
    getLesson7(): Promise<ResponseForm<putLesson7>> {
        return axiosClient.get("user-week1-information/lesson7");
    },
    putLesson7(data: putLesson7): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson7", data);
    },

};