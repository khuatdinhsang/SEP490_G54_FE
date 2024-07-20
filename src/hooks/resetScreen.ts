import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreen } from '../store/screen.slice';
import { DateTime } from 'luxon';

// export const useResetScreenAtStartOfWeek = () => {
//     const dispatch = useDispatch();
//     dispatch(setScreen(1));
//     const checkAndResetScreen = () => {
//         const now = DateTime.local().setZone('UTC+7');
//         const dayOfWeek = now.weekday;
//         const hours = now.hour;
//         const minutes = now.minute;
//         console.log("13", dayOfWeek, hours, minutes);

//         // Kiểm tra nếu là Thứ Hai và đúng giờ 0:00
//         if (dayOfWeek === 1 && hours === 0 && minutes === 0) {
//             console.log("vao day")
//             dispatch(setScreen(1));
//         }
//     };
//     useEffect(() => {
//         const intervalId = setInterval(checkAndResetScreen, 30000);
//         return () => clearInterval(intervalId);
//     }, []);
// };
