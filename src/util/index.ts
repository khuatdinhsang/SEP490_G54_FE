import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryMedicalResponse } from "../constant/type/medical";
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
