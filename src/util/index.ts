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