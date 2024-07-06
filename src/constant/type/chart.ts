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
    date: string
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
export interface dataChartCardinalResponse {
    hba1cDataToday: number,
    cholesterolDataToday: number,
    hba1cList: valueCardinal[],
    cholesterolList: valueCardinal[],
    bloodSugarList: valueCardinal[],
    detailDataBloodSugar: Record<string, any>;
}