import { TypeTimeDay } from './../../page/recordHealthData/contant/index';
import { TypeTimeMeasure } from "../../page/recordHealthData/contant"

export interface dataChartWeightResponse {
    avgValue: number,
    valueToday: number,
    weightResponseList: valueWeight[]
}
export interface valueWeight {
    value: number,
    date: string
}
export interface valueSteps {
    valuePercent: number,
    date: string
}
export interface dataChartStepResponse {
    valueToday: number,
    stepResponseList: valueSteps[]
}
export interface dataChartDietResponse {
    avgValue: number,
    dietResponseList: valueWeight[]
}
export interface dataChartMedicineResponse {
    doneToday: number,
    totalToday: number,
    medicineResponseList: valueSteps[]
}
export interface valueActivity {
    duration: number,
    type: string,
    date: string
}
export interface dataChartActivityResponse {
    durationToday: number,
    typeToDay: string,
    activityResponseList: valueActivity[]
}
export interface valueMental {
    point: number,
    date: string
}
export interface dataChartMentalResponse {
    avgPoint: number,
    mentalResponseList: valueMental[]
}
export interface valueBloodPressure {
    systole: number,
    diastole: number,
    date: string,
    label?: string
}

export interface dataChartBloodPressureResponse {
    systoleToday: number,
    diastoleToday: number,
    bloodPressureResponseList: valueBloodPressure[]
}
export interface valueCardinal {
    data: number,
    date: string
}
export interface valueBloodSugar {
    afterEat?: number,
    beforeEat?: number,
    date: string
}
export interface dataChartCardinalResponse {
    hba1cDataToday: number,
    cholesterolDataToday: number,
    hba1cList: valueCardinal[],
    cholesterolList: valueCardinal[],
    bloodSugarList: valueBloodSugar[],
    detailDataBloodSugar: BloodSugarDetails
}
export interface BloodSugarDetails {
    [TypeTimeDay.DINNER]: BloodSugarMeasurement[];
    [TypeTimeDay.MORNING]: BloodSugarMeasurement[];
    [TypeTimeDay.LUNCH]: BloodSugarMeasurement[];
};
export interface BloodSugarMeasurement {
    data: number;
    typeTimeMeasure: TypeTimeMeasure;
};

export interface dataChartWeeklyReview {
    percentage: number[],
    weekStart: string[]
}
export interface SatResponseDTO {
    sat_sf_c_total: number;
    sat_sf_p_total: number;
    sat_sf_i_total: number;
};

export interface SfResponseDTO {
    sf_mental_modelPoint: number;
    sf_activity_modelPoint: number;
    sf_diet_modelPoint: number;
    sf_medicine_modelPoint: number;
};

export interface WeekData {
    satResponseDTO: SatResponseDTO;
    sfResponseDTO: SfResponseDTO;
};
export interface monthlyQuestionRes {
    firstWeek: WeekData;
    chart3Month: WeekData[];
}