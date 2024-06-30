export interface dataChartWeightResponse {
    avgValue: number,
    valueToday: number,
    weightResponseList: valueWeight[]
}
export interface valueWeight {
    value: number,
    date: string
}