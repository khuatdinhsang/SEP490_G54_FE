import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryMedicalResponse } from "../constant/type/medical";
import { DateTime } from 'luxon';
import { valueWeight } from "../constant/type/chart";
interface OutputData {
    id: number;
    name: string;
}

interface TransformedItem {
    type: string;
    data: OutputData[];
}
export const transformData = (data: HistoryMedicalResponse[]): TransformedItem[] => {
    return data.reduce<TransformedItem[]>((acc, item) => {
        const typeObject = acc.find(obj => obj.type === item.type);
        if (typeObject) {
            typeObject.data.push({ id: item.id, name: item.name });
        } else {
            acc.push({
                type: item.type,
                data: [{ id: item.id, name: item.name }]
            });
        }

        return acc;
    }, []);
};

export const twoDigit = (num: number) => num.toString().padStart(2, '0');
export const getISO8601ForSelectedDays = (hours: string, minutes: string, days: number[]): string[] => {
    const baseDate = new Date();
    //baseDate.getDay() lấy ra ngày trong tuần của đối tượng Date hiện tại, từ 0 (Chủ Nhật) đến 6 (Thứ Bảy).
    return days.map(day => {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + (day - baseDate.getDay() + 7) % 7);
        date.setHours(Number(hours), Number(minutes), 0, 0);
        return date.toISOString().replace('.000Z', '') + '.000';
    });
};
export const removeAsyncStorageWhenLogout = async () => {
    try {
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('idUser');
    } catch (error) {
        console.error('error', error);
    }
};
export const getMondayOfCurrentWeek = () => {
    const today = new Date();
    // Lấy ngày (0 là Chủ Nhật, 1 là Thứ Hai, ..., 6 là Thứ Bảy)
    const dayOfWeek = today.getDay();
    // Tính số ngày đã qua từ thứ Hai (nếu Chủ Nhật thì là 6, còn lại là dayOfWeek - 1)
    const diff = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    // Tạo ngày thứ Hai đầu tuần
    const monday = new Date(today);
    monday.setDate(today.getDate() - diff);
    return monday.toISOString();
}

export const convertToUTC = (time: string, offset: number) => {
    const [hour, minute, second] = time.split(':').map(Number);
    const localDate = DateTime.fromObject({ hour, minute, second }, { zone: `UTC+${offset}` });
    const utcDate = localDate.toUTC();
    return utcDate.toFormat('HH:mm:ss');
}
export const convertFromUTC = (time: string, offset: number) => {
    const [hour, minute, second] = time.split(':').map(Number);
    const utcDate = DateTime.fromObject({ hour, minute, second }, { zone: 'utc' });
    const localDate = utcDate.setZone(`UTC+${offset}`);
    return localDate.toFormat('HH:mm:ss');
}
export const getPreviousMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek + 6;
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysToLastMonday);
    return lastMonday.toISOString();
}
export const convertObjectToArray = (obj: { [key: string]: boolean }): number[] => {
    return Object.keys(obj)
        .filter(key => obj[key])
        .map(key => parseInt(key, 10));
}
export interface OutputDataChart {
    x: string;
    y: number;
    label?: string
}

export const transformDataToChart = (inputArray: valueWeight[], unitLabel: string): OutputDataChart[] => {
    return inputArray.map((input: valueWeight) => {
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const isToday = todayMonth === date.getMonth() + 1 && todayDate === date.getDate();
        return {
            x: `${month}/${day}`,
            y: input.value,
            ...(isToday && { label: `${input.value} ${unitLabel}` })
        };
    });
};
export const getValueMaxChart = (inputArray: valueWeight[]): number => {
    if (inputArray.length === 0) {
        return 0;
    }
    const maxValue = Math.max(...inputArray.map(item => item.value));
    return roundUpToNearest(maxValue, 20);
}
export const roundUpToNearest = (value: number, increment: number): number => {
    return Math.ceil(value / increment) * increment;
};