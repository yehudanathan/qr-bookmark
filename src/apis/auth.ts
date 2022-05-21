import axios from "axios";
import { AuthUser } from "../models/AuthUser";
import { getCurrentUser, getLatestToken } from "./session";

const baseServerURL = "https://qr-bookmark.herokuapp.com";

export const authRegister = async (user: AuthUser) => {
  try {
    const response = await axios.post(`${baseServerURL}/register`, user);
    if (response.status === 201) return "Registered";
    return response.data;
  } catch (error : any) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const authLogin = async (user: AuthUser) => {
  try {
    const response = await axios.post(`${baseServerURL}/login`, user);
    if (response.status === 200) console.log("User logged in successfully");
    else if (response.status === 400) return ("Incorrect password");
    sessionStorage.setItem("token", response.data.accessToken);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    return "Logged in";
  } catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
};

export const authLogout = async () => {
  console.log("User logged out successfully");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  return true;
};

export const isSignedIn = async () => {
  console.log("running isSignedIn");
  const token = getLatestToken();
  const user = getCurrentUser();
  if (token && user) {
    try {
      const response = await axios.get(`${baseServerURL}/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};
