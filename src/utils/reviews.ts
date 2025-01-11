import { axiosConfig } from "./axiosConfig"

export const sendReview = async (review: string, rating: number) => {
    const  response = await axiosConfig.post('reviews/', {
        review,
        rating
    })
    return response
} 

export const getReviews = async () => {
    const reviews = await axiosConfig.get('reviews/hostel/:hostelId')
    return reviews
}