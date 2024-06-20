
export interface questionResponse {
    id: number,
    appUserName: string,
    webUserName: string | null,
    title: string,
    body: string,
    answer: string,
    questionDate: string,
    answerDate: string | null
}