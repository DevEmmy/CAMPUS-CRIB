/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosConfig } from "../utils/axiosConfig"

export const fetchUserById = async (id: string | any) => {
    const response = await axiosConfig.get(`auth/agent/${id}`)
    return response.data.data
}

export const fetchUser = async () => {
  const response = localStorage.getItem("user");
  const user = JSON.parse(response as string);
  return user;
};
