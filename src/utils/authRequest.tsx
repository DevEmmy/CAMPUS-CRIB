import { AxiosResponse } from "axios";
import { User } from "../types/user";
import { axiosConfig } from "./axiosConfig";
import { errorToast, successToast } from "oasis-toast";

export const signup = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string | null;
}): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/sign-up", data);

    // If response exists and is valid, handle it
    if (response && response.data && response.data) {
      successToast("Authentication successful", "Welcome to Campus Crib")
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response;
    }

    // If no valid response, handle the case and return undefined
    console.log("No valid response data");
    errorToast("An error occured", "Please try again")
    return undefined;
  } catch (error) {
    errorToast("An error occured", "Please try again")
    // Catch and log the error, then return undefined
    console.error("Signup failed:", error);
    return undefined;
  }
};


export const login = async (data: { email: string; password: string }): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/sign-in", data);

    // If response exists and is valid, handle it
    if (response && response.data && response.data.data) {
      successToast("Authentication successful", "Welcome to Campus Crib")
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response;
    }

    // If no valid response, handle the case and return undefined
    console.log("No valid response data");
    errorToast("An error occured", "Please try again")
    return undefined;
  } catch (error) {
    errorToast("An error occured", "Please try again")
    // Catch and log the error, then return undefined
    console.error("Login failed:", error);
    return undefined;
  }
};

