import { axiosConfig } from "../utils/axiosConfig";


const notifications = await axiosConfig.get('notifications/user')
export const getAllNotifications = async () => {
   return notifications
}