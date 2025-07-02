/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { axiosConfig } from "./axiosConfig";
import { errorToast, successToast } from "oasis-toast";
// import { useUserStore } from "../store/UseUserStore";

interface User {
  data: any;
  token: string;
  user: any;
}

interface ForgotPasswordResponse {
  message: string;
  data: {
    resetToken: string;
  };
  status: number;
}

interface ResetPasswordResponse {
  message: string;
  data: null;
  status: number;
}

export const signup = async (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/sign-up", data);

    if (response && response.data && response.data.data) {
      successToast("Authentication successful", "Welcome to Campus Crib");
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response;
    }

    console.log("No valid response data");
    errorToast("An error occurred", "Invalid form data");
    return undefined;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      errorToast("An error occurred", errorMessage);
      console.error("Signup failed:", errorMessage);
    } else {
      errorToast("An error occurred", `${error}`);
      console.error("Signup failed:", error);
    }
    return undefined;
  }
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/sign-in", data);

    if (response && response.data && response.data.data) {
      successToast("Login successful", "Welcome back to Campus Crib");
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response;
    }

    console.log("No valid response data");
    errorToast("An error occurred", "Invalid login data");
    return undefined;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      errorToast("An error occurred", errorMessage);
      console.error("Login failed:", errorMessage);
    } else {
      errorToast("An error occurred", `${error}`);
      console.error("Login failed:", error);
    }
    return undefined;
  }
};

export const updateUser = async (
  data: any
): Promise<AxiosResponse<User> | undefined> => {
  try {
    const response = await axiosConfig.patch("auth/update", data);

    if (response && response.data && response.data.data) {
      successToast("Update successful", "Your details have been updated");

      localStorage.setItem("user", JSON.stringify(response.data.data));

      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
      }

      return response;
    }

    console.log("No valid response data");
    errorToast("An error occurred", "Please try again");
    return undefined;
  } catch (error) {
    errorToast("An error occurred", "Please try again");
    console.error("Update failed:", error);
    return undefined;
  }
};

export const forgotPassword = async (
  email: string
): Promise<AxiosResponse<ForgotPasswordResponse> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/forgot-password", { email });

    if (response && response.data) {
      successToast(
        "Reset link sent",
        "Check your email for password reset instructions"
      );
      return response;
    }

    console.log("No valid response data");
    errorToast("An error occurred", "Please try again");
    return undefined;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      errorToast("An error occurred", errorMessage);
      console.error("Forgot password failed:", errorMessage);
    } else {
      errorToast("An error occurred", `${error}`);
      console.error("Forgot password failed:", error);
    }
    return undefined;
  }
};

export const resetPassword = async (
  resetToken: string,
  newPassword: string
): Promise<AxiosResponse<ResetPasswordResponse> | undefined> => {
  try {
    const response = await axiosConfig.post("auth/reset-password", {
      resetToken,
      newPassword,
    });

    if (response && response.data) {
      successToast(
        "Password reset successful",
        "You can now log in with your new password"
      );
      return response;
    }

    console.log("No valid response data");
    errorToast("An error occurred", "Please try again");
    return undefined;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      errorToast("An error occurred", errorMessage);
      console.error("Reset password failed:", errorMessage);
    } else {
      errorToast("An error occurred", `${error}`);
      console.error("Reset password failed:", error);
    }
    return undefined;
  }
};
