import { axiosConfig } from "../utils/axiosConfig";


export const getAllNotifications = async (userId: string) => {
    const notifications = await axiosConfig.get(`notifications/user${userId}`)
   return notifications
}