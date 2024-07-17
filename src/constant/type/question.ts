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
export interface satResponseDTO {
    sat_sf_c_total: number,
    sat_sf_p_total: number,
    sat_sf_i_total: number,
    sat_sf_c_activityPoint: number,
    sat_sf_c_positivityPoint: number,
    sat_sf_c_supportPoint: number,
    sat_sf_c_experiencePoint: number,
    sat_sf_p_lifeValue: number,
    sat_sf_p_targetAndAction: number,
    sat_sf_p_decision: number,
    sat_sf_p_buildPlan: number,
    sat_sf_p_healthyEnvironment: number,
    sat_sf_i_e_activityPoint: number,
    sat_sf_i_e_activityStressPoint: number,
    sat_sf_i_e_activitySubstantialPoint: number,
    sat_sf_i_e_energy: number,
    sat_sf_i_e_motivation: number,
    sat_sf_i_e_planCheck: number
}
export interface sfResponseDTO {
    sf_mental_modelPoint: number,
    sf_activity_modelPoint: number,
    sf_diet_modelPoint: number,
    sf_medicine_modelPoint: number,
    sf_mentalPoint: number,
    sf_activity_planPoint: number,
    sf_activity_habitPoint: number,
    sf_diet_healthyPoint: number,
    sf_diet_vegetablePoint: number,
    sf_diet_habitPoint: number,
    sf_medicine_followPlanPoint: number,
    sf_medicine_habitPoint: number
}
export interface satEvaluateRes {
    month: number,
    satResponseDTO: satResponseDTO
}
export interface sfEvaluateRes {
    month: number,
    sfResponseDTO: sfResponseDTO
}