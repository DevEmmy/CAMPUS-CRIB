import { axiosConfig } from "./axiosConfig"

export const messaging = async (data: any) => {
    const response = await axiosConfig.post('chats/message', data)
    return response;
}