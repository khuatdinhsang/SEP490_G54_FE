import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryMedicalResponse, medicinePost } from "../constant/type/medical";
import { DateTime } from 'luxon';
import { monthlyQuestionRes, SatResponseDTO, SfResponseDTO, valueActivity, valueCardinal, valueMental, valueSteps, valueWeight, WeekData } from "../constant/type/chart";
import { IMAGE } from "../constant/image";
import { ImageProps } from "react-native";
import { satEvaluateRes, sfEvaluateRes } from "../constant/type/question";
import colors from "../constant/color";
import { offsetTime } from "../constant";
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
    const selectedHours = Number(hours);
    const selectedMinutes = Number(minutes);
    return days.map(day => {
        let dt: any = DateTime.local();
        dt = dt.set({ hour: selectedHours, minute: selectedMinutes, second: 0 });
        dt = dt.plus({ days: day - dt.weekday }).setZone('UTC-7', { keepLocalTime: true });
        return dt.toISO({ suppressMilliseconds: true }).split(".")[0];
    });
};;
export const removeAsyncStorageWhenLogout = async () => {
    try {
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('accessToken');
        // await AsyncStorage.removeItem('idUser');
    } catch (error) {
        console.error('error', error);
    }
};
export const getMondayOfCurrentWeek = (): string => {
    const today = DateTime.local();
    const dayOfWeek = today.weekday;
    const daysToLastMonday = dayOfWeek === 1 ? 0 : dayOfWeek - 1;
    const lastMonday = today.minus({ days: daysToLastMonday }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const lastMondayUtc = lastMonday.setZone('UTC+7', { keepLocalTime: true });
    return lastMondayUtc.toISO() || "";
};
// export const convertToUTC = (time: string, offset: number) => {
//     const [hour, minute, second] = time.split(':').map(Number);
//     const localDate = DateTime.fromObject({ hour, minute, second }, { zone: `UTC+${offset}` });
//     const utcDate = localDate.toUTC();
//     return utcDate.toFormat('HH:mm:ss');
// }
// export const convertFromUTC = (time: string, offset: number) => {
//     const [hour, minute, second] = time.split(':').map(Number);
//     const utcDate = DateTime.fromObject({ hour, minute, second }, { zone: 'utc' });
//     const localDate = utcDate.setZone(`UTC+${offset}`);
//     return localDate.toFormat('HH:mm:ss');
// }
// export const getPreviousMonday = () => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();
//     const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek + 6;
//     const lastMonday = new Date(today);
//     lastMonday.setDate(today.getDate() - daysToLastMonday);
//     return lastMonday.toISOString();
// }
export const getPreviousMonday = (): string => {
    const today = DateTime.local();
    const daysToLastMonday = today.weekday === 1 ? 14 : today.weekday + 6; // Tính số ngày cần trừ để lấy ngày thứ Hai của tuần trước trước đó
    const lastMonday = today.minus({ days: daysToLastMonday }); // Lấy ngày thứ Hai của tuần trước trước đó
    const lastMondayUtc = lastMonday.setZone('UTC+7', { keepLocalTime: true }); // Chuyển sang múi giờ UTC+7 và giữ nguyên thời gian địa phương
    return lastMondayUtc.toISO() || ""; // Trả về chuỗi ISO 8601 đại diện cho ngày thứ Hai của tuần trước trước đó theo múi giờ UTC+7
};
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
    return inputArray.map((input: valueWeight, index: number) => {
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        return {
            x: `${month}/${day}`,
            y: input.value,
            ...(index === inputArray.length - 1 && { label: `${input.value} ${unitLabel}` })
        };
    });
};

export const roundUpToNearest = (value: number, increment: number): number => {
    return Math.ceil(value / increment) * increment;
};

export const transformDataToChartStep = (inputArray: valueSteps[], unitLabel: string): OutputDataChart[] => {
    return inputArray.map((input: valueSteps, index: number) => {
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        return {
            x: `${month}/${day}`,
            y: input.valuePercent > 100 ? 100 : input.valuePercent,
            ...(index === inputArray.length - 1 && { label: `${input.valuePercent > 100 ? 100 : input.valuePercent} ${unitLabel}` })
        };
    });
};

export const transformDataToChartActivity = (inputArray: valueActivity[]): OutputDataChart[] => {
    return inputArray.map((input: valueActivity) => {
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        return {
            x: `${month}/${day}`,
            y: convertMinutesToHours(input.duration),
            label: input.type
        };
    });
};


export const transformDataToChartMental = (inputArray: valueMental[], unitLabel: string): OutputDataChart[] => {
    return inputArray.map((input: valueMental, index: number) => {
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        return {
            x: `${month}/${day}`,
            y: input.point,
            ...(index === inputArray.length - 1 && { label: `${input.point} ${unitLabel}` })
        };
    });
};
export const transformDataToChartHBA1C = (inputArray: valueCardinal[], unitLabel: string): OutputDataChart[] => {
    return inputArray.map((input: valueCardinal, index: number) => {
        const date = new Date(input.date);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        return {
            x: `${month}/${day}`,
            y: input.data,
            ...(index === inputArray.length - 1 && { label: `${input.data} ${unitLabel}` })
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
export const convertMinutesToHours = (minutes: number): number => {
    const hours = minutes / 60;
    return parseFloat(hours.toFixed(1));
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
export const generateRandomId = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
interface Medicine {
    indexDay: number[];
    medicineTitle: string;
    medicineTypeId: number;
    time: string;
    weekTime: string[];
    weekday: string[];
}
export const getWeekTimeForCurrentWeek = (medicines: Medicine[]): medicinePost[] => {
    const weekdaysMap: { [key: string]: number } = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6
    };

    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - currentDay));

    return medicines.map(medicine => {
        const { time, weekday, medicineTypeId, indexDay } = medicine;
        const weekTimes = weekday.map(day => {
            const targetDay = weekdaysMap[day];
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + targetDay);
            return `${date.toISOString().split('T')[0]}T${time}.000+00:00`;
        });
        return {
            weekStart: getMondayOfCurrentWeek().split("T")[0],
            schedule: weekTimes,
            medicineTypeId: medicineTypeId,
        };
    });
}

export const padNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
}

export interface TransformedData {
    x: string,
    y1: number,
    y2: number,
    y3?: number,
    y4?: number,
    color?: string
}
type DataTypeChart = {
    firstWeek: {
        satResponseDTO: SatResponseDTO;
        sfResponseDTO: SfResponseDTO;
    };
    chart3Month: Array<{
        satResponseDTO: SatResponseDTO;
        sfResponseDTO: SfResponseDTO;
    }>;
};
export const convertToChart1Monthly = (data: DataTypeChart): TransformedData[] => {
    const result = [
        {
            x: '핵심 역량',
            y1: data.firstWeek?.satResponseDTO?.sat_sf_c_total ?? 0,
            y2: data.chart3Month[2]?.satResponseDTO?.sat_sf_c_total ?? 0,
            y3: data.chart3Month[1]?.satResponseDTO?.sat_sf_c_total ?? 0,
            y4: data.chart3Month[0]?.satResponseDTO?.sat_sf_c_total ?? 0
        },
        {
            x: '준비 역량',
            y1: data.firstWeek?.satResponseDTO?.sat_sf_p_total ?? 0,
            y2: data.chart3Month[2]?.satResponseDTO?.sat_sf_p_total ?? 0,
            y3: data.chart3Month[1]?.satResponseDTO?.sat_sf_p_total ?? 0,
            y4: data.chart3Month[0]?.satResponseDTO?.sat_sf_p_total ?? 0
        },
        {
            x: '실행 전략',
            y1: data.firstWeek?.satResponseDTO?.sat_sf_i_total ?? 0,
            y2: data.chart3Month[2]?.satResponseDTO?.sat_sf_i_total ?? 0,
            y3: data.chart3Month[1]?.satResponseDTO?.sat_sf_i_total ?? 0,
            y4: data.chart3Month[0]?.satResponseDTO?.sat_sf_i_total ?? 0
        }
    ];
    return result
}
export const convertToChart2Monthly = (data: DataTypeChart): TransformedData[] => {
    const result = [
        {
            x: '긍정적 마음',
            y1: data.firstWeek?.sfResponseDTO?.sf_mental_modelPoint ?? 0,
            y2: data.chart3Month[2]?.sfResponseDTO?.sf_mental_modelPoint ?? 0,
            y3: data.chart3Month[1]?.sfResponseDTO?.sf_mental_modelPoint ?? 0,
            y4: data.chart3Month[0]?.sfResponseDTO?.sf_mental_modelPoint ?? 0
        },
        {
            x: '운동',
            y1: data.firstWeek?.sfResponseDTO?.sf_activity_modelPoint ?? 0,
            y2: data.chart3Month[2]?.sfResponseDTO?.sf_activity_modelPoint ?? 0,
            y3: data.chart3Month[1]?.sfResponseDTO?.sf_activity_modelPoint ?? 0,
            y4: data.chart3Month[0]?.sfResponseDTO?.sf_activity_modelPoint ?? 0
        },
        {
            x: '식이',
            y1: data.firstWeek?.sfResponseDTO?.sf_diet_modelPoint ?? 0,
            y2: data.chart3Month[2]?.sfResponseDTO?.sf_diet_modelPoint ?? 0,
            y3: data.chart3Month[1]?.sfResponseDTO?.sf_diet_modelPoint ?? 0,
            y4: data.chart3Month[0]?.sfResponseDTO?.sf_diet_modelPoint ?? 0
        },
        {
            x: '약물복용',
            y1: data.firstWeek?.sfResponseDTO?.sf_medicine_modelPoint ?? 0,
            y2: data.chart3Month[2]?.sfResponseDTO?.sf_medicine_modelPoint ?? 0,
            y3: data.chart3Month[1]?.sfResponseDTO?.sf_medicine_modelPoint ?? 0,
            y4: data.chart3Month[0]?.sfResponseDTO?.sf_medicine_modelPoint ?? 0
        }
    ];
    return result;
}
export const dateNow = (date: Date) => {
    const utcTime = date.getTime();
    // Cộng thêm 7 giờ (7 * 60 * 60 * 1000 milliseconds) để chuyển sang UTC+7
    const vietnamTime = new Date(utcTime + offsetTime * 60 * 60 * 1000);
    const year = vietnamTime.getUTCFullYear();
    const month = String(vietnamTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(vietnamTime.getUTCDate()).padStart(2, '0');
    const hours = String(vietnamTime.getUTCHours()).padStart(2, '0');
    const minutes = String(vietnamTime.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
export const convertToChart1SAT = (data: satEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '핵심역량',
            y1: data[1]?.satResponseDTO?.sat_sf_c_total ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_c_total ?? 0,
        },
        {
            x: '준비역량',
            y1: data[1]?.satResponseDTO?.sat_sf_p_total ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_p_total ?? 0,
        },
        {
            x: '실행전략',
            y1: data[1]?.satResponseDTO?.sat_sf_i_total ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_i_total ?? 0,
        },
    ];
    return result
}
export const convertToChart1SF = (data: sfEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '긍정적마음',
            y1: data[1]?.sfResponseDTO?.sf_mental_modelPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_mental_modelPoint ?? 0,
        },
        {
            x: '운동',
            y1: data[1]?.sfResponseDTO?.sf_activity_modelPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_activity_modelPoint ?? 0,
        },
        {
            x: '식이',
            y1: data[1]?.sfResponseDTO?.sf_diet_modelPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_diet_modelPoint ?? 0,
        },
        {
            x: '약물복용',
            y1: data[1]?.sfResponseDTO?.sf_medicine_modelPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_medicine_modelPoint ?? 0,
        },
    ];
    return result
}
export const convertToChart2SAT = (data: satEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '자기주도성',
            y1: data[1]?.satResponseDTO?.sat_sf_c_activityPoint ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_c_activityPoint ?? 0,
        },
        {
            x: '긍정적사고',
            y1: data[1]?.satResponseDTO?.sat_sf_c_positivityPoint ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_c_positivityPoint ?? 0,
        },
        {
            x: '지지관계형성',
            y1: data[1]?.satResponseDTO?.sat_sf_c_supportPoint ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_c_supportPoint ?? 0,
        },
        {
            x: '비슷한경험공유',
            y1: data[1]?.satResponseDTO?.sat_sf_c_experiencePoint ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_c_experiencePoint ?? 0,
        },
    ];
    return result
}
export const convertToChart2SF = (data: sfEvaluateRes[]): TransformedData[] => {
    const result = [

        {
            x: '긍정적인마음',
            y1: data[1]?.sfResponseDTO?.sf_mentalPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_mentalPoint ?? 0,
        },

    ];
    return result
}
export const convertToChart3SAT = (data: satEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '삶의가치추구',
            y1: data[1]?.satResponseDTO?.sat_sf_p_lifeValue ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_p_lifeValue ?? 0,
        },
        {
            x: '목표/행동설정',
            y1: data[1]?.satResponseDTO?.sat_sf_p_targetAndAction ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_p_targetAndAction ?? 0,
        },
        {
            x: '합리적의사결정',
            y1: data[1]?.satResponseDTO?.sat_sf_p_decision ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_p_decision ?? 0,
        },
        {
            x: '우선순위중심계획',
            y1: data[1]?.satResponseDTO?.sat_sf_p_buildPlan ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_p_buildPlan ?? 0,
        },
        {
            x: '건강한환경조성',
            y1: data[1]?.satResponseDTO?.sat_sf_p_healthyEnvironment ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_p_healthyEnvironment ?? 0,
        },
    ];
    return result
}
export const convertToChart3SF = (data: sfEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '운동점검 및 계획',
            y1: data[1]?.sfResponseDTO?.sf_activity_planPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_activity_planPoint ?? 0,
        },
        {
            x: '운동일상화',
            y1: data[1]?.sfResponseDTO?.sf_diet_habitPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_diet_habitPoint ?? 0,
        },
    ];
    return result
}
export const convertToChart4SAT = (data: satEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '자기주도',
            y1: data[1]?.satResponseDTO?.sat_sf_i_e_activityPoint ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_i_e_activityPoint ?? 0,
        },
        {
            x: '스트레스대처',
            y1: data[1]?.satResponseDTO?.sat_sf_i_e_activityStressPoint ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_i_e_activityStressPoint ?? 0,
        },
        {
            x: '끈기있는실행',
            y1: data[1]?.satResponseDTO?.sat_sf_i_e_activitySubstantialPoint ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_i_e_activitySubstantialPoint ?? 0,
        },

    ];
    return result
}
export const convertToChart4SF = (data: sfEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '건강한식이패턴',
            y1: data[1]?.sfResponseDTO?.sf_diet_healthyPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_diet_healthyPoint ?? 0,
        },
        {
            x: '야채/과일위주 선택',
            y1: data[1]?.sfResponseDTO?.sf_diet_vegetablePoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_diet_vegetablePoint ?? 0,
        },
        {
            x: '건강한 식이습관 형성',
            y1: data[1]?.sfResponseDTO?.sf_diet_habitPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_diet_habitPoint ?? 0,
        },
    ];
    return result
}
export const convertToChart5SAT = (data: satEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '에너지보존',
            y1: data[1]?.satResponseDTO?.sat_sf_i_e_energy ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_i_e_energy ?? 0,
        },
        {
            x: '자기동기부여',
            y1: data[1]?.satResponseDTO?.sat_sf_i_e_motivation ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_i_e_motivation ?? 0,
        },
        {
            x: '점검',
            y1: data[1]?.satResponseDTO?.sat_sf_i_e_planCheck ?? 0,
            y2: data[0]?.satResponseDTO?.sat_sf_i_e_planCheck ?? 0,
        },

    ];
    return result
}
export const convertToChart5SF = (data: sfEvaluateRes[]): TransformedData[] => {
    const result = [
        {
            x: '약물 순응도',
            y1: data[1]?.sfResponseDTO?.sf_medicine_followPlanPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_medicine_followPlanPoint ?? 0,
        },
        {
            x: '약물효과',
            y1: data[1]?.sfResponseDTO?.sf_medicine_habitPoint ?? 0,
            y2: data[0]?.sfResponseDTO?.sf_medicine_habitPoint ?? 0,
        },

    ];
    return result
}