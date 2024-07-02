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