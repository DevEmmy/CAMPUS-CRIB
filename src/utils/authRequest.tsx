import axios, { AxiosResponse } from "axios";
import { axiosConfig } from "./axiosConfig";
import { errorToast, successToast } from "oasis-toast";

interface User {
  token: string;
  user: any;
}

export const signup = async (data: { email: string; password: string }): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/sign-up", data);

    // If response exists and is valid, handle it
    if (response && response.data && response.data.data) {
      successToast("Authentication successful", "Welcome to Campus Crib");
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response;
    }

    // If no valid response, handle the case and return undefined
    console.log("No valid response data");
    errorToast("An error occurred", "Invalid form data");
    return undefined;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const errorMessage = error.response?.data?.message || error.message;
      errorToast("An error occurred", errorMessage);
      console.error("Signup failed:", errorMessage);
    } else {
      // Non-Axios error
      errorToast("An error occurred", `${error}`);
      console.error("Signup failed:", error);
    }
    return undefined;
  }
};

export const login = async (data: { email: string; password: string }): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/sign-in", data);

    // If response exists and is valid, handle it
    if (response && response.data && response.data.data) {
      successToast("Login successful", "Welcome back to Campus Crib");
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response;
    }

    // If no valid response, handle the case and return undefined
    console.log("No valid response data");
    errorToast("An error occurred", "Invalid login data");
    return undefined;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      const errorMessage = error.response?.data?.message || error.message;
      errorToast("An error occurred", errorMessage);
      console.error("Login failed:", errorMessage);
    } else {
      // Non-Axios error
      errorToast("An error occurred", `${error}`);
      console.error("Login failed:", error);
    }
    return undefined;
  }
};