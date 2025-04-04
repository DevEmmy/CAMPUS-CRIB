/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { axiosConfig } from "./axiosConfig";
import { errorToast, successToast } from "oasis-toast";
// import { useUserStore } from "../store/UseUserStore";




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

export const updateUser = async (data: any): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.patch("auth/update", data);

    // If response exists and is valid, handle it
    if (response && response.data && response.data.data) {
      successToast("Update successful", "Your details have been updated");
      
      // Make sure we're storing the user object correctly
      // The issue was likely here - we need to make sure we're storing the correct path
      localStorage.setItem("user", JSON.stringify(response.data.data));
      
      // If there's a token in the response, store it separately
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
      }
      
      return response;
    }

    // If no valid response, handle the case and return undefined
    console.log("No valid response data");
    errorToast("An error occurred", "Please try again");
    return undefined;
  } catch (error) {
    errorToast("An error occurred", "Please try again");
    // Catch and log the error, then return undefined
    console.error("Update failed:", error);
    return undefined;
  }
};