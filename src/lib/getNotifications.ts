import { axiosConfig } from "../utils/axiosConfig";



export const getAllNotifications = async () => {
   const notifications =  await axiosConfig.get('notifications/user');
   return notifications
}