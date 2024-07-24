import { axiosClient } from '../config/axiosClient';
import { ResponseForm } from '../constant/type';
import { putLesson } from '../constant/type/lesson';
export const lessonService = {
    getLessonUnLocked(): Promise<ResponseForm<number>> {
        return axiosClient.get(`user-lessons/unlocked-lessons`);
    },
    putLesson(lesson: string, data: putLesson): Promise<{ code: number }> {
        return axiosClient.put(`user-week1-information/${lesson}`, data);
    },

};