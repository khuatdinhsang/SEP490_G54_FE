import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreen } from '../store/screen.slice';

export const useResetScreenAtStartOfWeek = () => {
    const dispatch = useDispatch();
    // dispatch(setScreen(6));
    const checkAndResetScreen = () => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        console.log("13", dayOfWeek, hours, minutes)
        if (dayOfWeek === 1 && hours === 0 && minutes === 0) {
            dispatch(setScreen(1));
        }
    };
    useEffect(() => {
        const intervalId = setInterval(checkAndResetScreen, 60000);
        return () => clearInterval(intervalId);
    }, []);
};
