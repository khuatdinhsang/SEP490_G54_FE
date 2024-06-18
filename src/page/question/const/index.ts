export type dataQuestion = {
    id: number;
    content: string,
    date: string,
    status: number,
    title: string,
    answer: string
}
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