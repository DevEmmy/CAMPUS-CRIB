import { axiosConfig } from "../utils/axiosConfig"

export const fetchMessages = async (id: string, otherUserId: string) => {
    let response;
    if(otherUserId == id){
        response = await axiosConfig.get(`chats/conversation/user/${id}`)
    }else{
        response = await axiosConfig.get(`chats/conversation/${id}`)
    }
    const messages = response.data.data
    
    return messages
 }