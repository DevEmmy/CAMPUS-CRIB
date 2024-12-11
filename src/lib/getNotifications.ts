import { axiosConfig } from "../utils/axiosConfig";


export const getAllNotifications = async () => {
    const reponse = await axiosConfig.get('')
    console.log(reponse)
}