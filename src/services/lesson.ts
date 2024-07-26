import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { putLesson1, putLesson2, putLesson3, putLesson4 } from '../constant/type/lesson';
export const lessonService = {
    getLessonUnLocked(): Promise<ResponseForm<number>> {
        return axiosClient.get(`user-lessons/unlocked-lessons`);
    },
    putLesson1(data: putLesson1): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson1", data);
    },
    putLesson2(data: putLesson2): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson2", data);
    },
    putLesson3(data: putLesson3): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson3", data);
    },
    putLesson4(data: putLesson4): Promise<{ code: number }> {
        return axiosClient.put("user-week1-information/lesson4", data);
    },

};