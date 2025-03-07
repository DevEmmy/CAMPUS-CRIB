import { axiosConfig } from "./axiosConfig"

export const sendReview = async (comment: string, rating: number, hostel: string) => {
    const  response = await axiosConfig.post('reviews/', {
        comment,
        rating,
        hostel
    })
    return response
} 

export const getReviews = async (hostelId: string) => {
    const reviews = await axiosConfig.get(`reviews/hostel/${hostelId}`)
    return reviews
}