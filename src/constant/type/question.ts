import { TypeQuestion } from ".."

export interface questionData {
    typeUserQuestion: string,
    title: string,
    body: string
}
export interface listQuestionDataResponse {
    id: number,
    appUserName: string,
    webUserName: string | null,
    title: string,
    body: string,
    answer: string,
    questionDate: string,
    answerDate: string | null
}
export interface listQuestion {
    code: number,
    result: listQuestionDataResponse[]
}
export interface detailQuestion {
    code: number,
    result: listQuestionDataResponse
}
export interface listMonthNumberRes {
    monthNumber: number,
    isAnswered: false
}
export interface listQuestionRes {
    type: TypeQuestion,
    formMonthlyQuestionDTOList: questionRes[]
}
export interface questionRes {
    questionNumber: number,
    question: string,
    type?: TypeQuestion,
    answer?: number
}
export interface postQuestionData {
    monthNumber: number,
    monthlyRecordType: TypeQuestion,
    questionNumber: number,
    question: string,
    answer: number
}
export interface resultQuestionRes {
    questionNumber: number,
    question: string,
    type: TypeQuestion,
    answer: number
}
export interface questionRegular {
    id: number,
    question: string,
    answer: string
}