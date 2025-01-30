import { axiosConfig } from "../utils/axiosConfig"

export const fetchConversations = async () => {
    const response = await axiosConfig.get('chats/conversations')
    const conversations = response.data.data
    return conversations
 }