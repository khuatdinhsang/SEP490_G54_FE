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