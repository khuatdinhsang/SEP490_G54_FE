import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreen } from '../store/screen.slice';
import { DateTime } from 'luxon';

export const useResetScreenAtStartOfWeek = () => {
    const dispatch = useDispatch();
    // dispatch(setScreen(4));
    const checkAndResetScreen = () => {
        // dispatch(setScreen(1));
        const now = DateTime.local().setZone('UTC+7'); // Lấy thời gian hiện tại và chuyển sang múi giờ UTC+7 (Việt Nam)
        const dayOfWeek = now.weekday; // Lấy ngày trong tuần (1 là Thứ Hai, ..., 7 là Chủ Nhật)
        const hours = now.hour; // Lấy giờ hiện tại
        const minutes = now.minute; // Lấy phút hiện tại
        console.log("13", dayOfWeek, hours, minutes);

        // Kiểm tra nếu là Thứ Hai và đúng giờ 0:00
        if (dayOfWeek === 1 && hours === 0 && minutes === 0) {
            console.log("vao day")
            dispatch(setScreen(1)); // Gọi hàm setScreen để thiết lập màn hình
        }
    };
    useEffect(() => {
        const intervalId = setInterval(checkAndResetScreen, 30000);
        return () => clearInterval(intervalId);
    }, []);
};
