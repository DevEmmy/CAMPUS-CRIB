import { axiosConfig } from "./axiosConfig"

export const signup = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
        const response = await axiosConfig.post('auth/sign-up', data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }

}

export const login = async (data: {email: string; password: string}) => {
    try {
        const response = await axiosConfig.post('auth/sign-in', data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}