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