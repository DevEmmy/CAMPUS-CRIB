import { axiosConfig } from "./axiosConfig"

export const sendReview = async (review: string, rating: number, hostelId: string) => {
    const  response = await axiosConfig.post('reviews/', {
        review,
        rating,
        hostelId
    })
    return response
} 

export const getReviews = async () => {
    const reviews = await axiosConfig.get('reviews/hostel/:hostelId')
    return reviews
}