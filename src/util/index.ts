import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryMedicalResponse } from "../constant/type/medical";
import { DateTime } from 'luxon';
import { valueActivity, valueMental, valueSteps, valueWeight } from "../constant/type/chart";
import { IMAGE } from "../constant/image";
import { ImageProps } from "react-native";
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

export const transformDataToChartWeight = (inputArray: valueWeight[], unitLabel: string): OutputDataChart[] => {
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
export const getValueMaxChartWeight = (inputArray: valueWeight[], value: number): number => {
    if (inputArray.length === 0) {
        return 0;
    }
    const maxValue = Math.max(...inputArray.map(item => item.value));
    return roundUpToNearest(maxValue, value);
}
export const roundUpToNearest = (value: number, increment: number): number => {
    return Math.ceil(value / increment) * increment;
};

export const transformDataToChartStep = (inputArray: valueSteps[], unitLabel: string): OutputDataChart[] => {
    return inputArray.map((input: valueSteps) => {
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const isToday = todayMonth === date.getMonth() + 1 && todayDate === date.getDate();
        return {
            x: `${month}/${day}`,
            y: input.valuePercent,
            ...(isToday && { label: `${input.valuePercent} ${unitLabel}` })
        };
    });
};
export const getValueMaxChartStep = (inputArray: valueSteps[]): number => {
    if (inputArray.length === 0) {
        return 0;
    }
    const maxValue = Math.max(...inputArray.map(item => item.valuePercent));
    return roundUpToNearest(maxValue, 20);
}

export const transformDataToChartActivity = (inputArray: valueActivity[], unitLabel: string): OutputDataChart[] => {
    return inputArray.map((input: valueActivity) => {
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        return {
            x: `${month}/${day}`,
            y: input.duration,
            label: `${unitLabel}`
        };
    });
};
export const getValueMaxChartActivity = (inputArray: valueActivity[], value: number): number => {
    if (inputArray.length === 0) {
        return 0;
    }
    const maxValue = Math.max(...inputArray.map(item => item.duration));
    return roundUpToNearest(maxValue, value);
}

export const transformDataToChartMental = (inputArray: valueMental[], unitLabel: string): OutputDataChart[] => {
    return inputArray.map((input: valueMental) => {
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const isToday = todayMonth === date.getMonth() + 1 && todayDate === date.getDate();
        return {
            x: `${month}/${day}`,
            y: input.point,
            ...(isToday && { label: `${input.point} ${unitLabel}` })
        };
    });
};
export const extractDayAndMonth = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    return `${month}/${day}`;
}
export const formatDateRange = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const endDate = new Date(date);
    endDate.setDate(day + 6);
    const formattedStart = `${month}/${day}`;
    const formattedEnd = `${endDate.getMonth() + 1}/${endDate.getDate()}`;
    return `${formattedStart}-${formattedEnd}`;
}

export const renderIconWeeklyReview = (a: number): ImageProps => {
    if (a < 0) {
        return IMAGE.EVALUATE.SAD1;
    }
    if (a < 50) {
        return IMAGE.EVALUATE.SAD;
    } else if (a >= 50 && a < 90) {
        return IMAGE.EVALUATE.CONG2;
    } else if (a >= 90 && a < 100) {
        return IMAGE.EVALUATE.CONG3;
    } else if (a === 100) {
        return IMAGE.EVALUATE.CONG1;
    } else {
        return IMAGE.EVALUATE.CONG1;
    }
}
export const renderTextWeeklyReview = (a: number): string => {
    if (a === 0) {
        return "common.text.noData";
    }
    if (a < 50) {
        return "common.text.low";
    } else if (a >= 50 && a < 90) {
        return "common.text.medium";
    } else if (a >= 90 && a < 100) {
        return "common.text.high";
    } else if (a === 100) {
        return "common.text.excellent";
    } else {
        return "common.text.noData";
    }
}
export const convertMinutesToHoursAndMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0 && remainingMinutes > 0) {
        return `${hours}시간 ${remainingMinutes}분`;
    } else if (hours > 0) {
        return `${hours}시간`;
    } else {
        return `${remainingMinutes}분`;
    }
}
interface DataPoint {
    y: number;
    label?: string;
}
export const transformDataToChartNoX = (values: number[]): DataPoint[] => {
    const transformedData: DataPoint[] = values.map(value => ({ y: value }));
    if (transformedData.length > 0) {
        const lastValue = transformedData[transformedData.length - 1].y;
        transformedData[transformedData.length - 1] = {
            y: lastValue,
            label: `${lastValue}%`
        };
    }
    return transformedData;
}
