import { axiosConfig } from "../utils/axiosConfig"

export const updateBookmark = async (hostelId: string, action: string) => {
 const response = await axiosConfig.post(`/auth/bookmark`, {action, hostelId})
 return response
}

export const fetchBookmarks = async () => {
    const response = await axiosConfig.get(`/auth/bookmark`)
    return response.data.data
}