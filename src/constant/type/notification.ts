import { Notification } from "..";

export interface notificationsResponse {
    typeNotification: Notification,
    status: boolean
}
export interface dataPutNotification {
    notificationStatusList: notificationsResponse[]
    deviceToken: string
}
