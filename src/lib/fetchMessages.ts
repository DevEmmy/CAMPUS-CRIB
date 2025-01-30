import { axiosConfig } from "../utils/axiosConfig"

export const fetchMessages = async (id: string) => {
    const response = await axiosConfig.get(`chats/conversations?userId=${id}`)
    const messages = response.data.data
    return messages
 }