import axios from "axios";
import { AuthUser } from "../models/AuthUser";
import { User } from '../models/User';
import { getCurrentUser, getLatestToken } from "./session";

const baseServerURL = "https://qr-bookmark.herokuapp.com";

export const authRegister = async (user: AuthUser) => {
  try {
    const response = await axios.post(`${baseServerURL}/register`, user);
    if (response.status === 200) console.log("User registered successfully");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authLogin = async (user: AuthUser) => {
  const response = await axios.post(`${baseServerURL}/login`, user);
  if (response.status === 200) console.log("User logged in successfully");
  sessionStorage.setItem("token", response.data.accessToken);
  sessionStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
};

export const authLogout = async () => {
    console.log("User logged out successfully");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return true;
};

export const isSignedIn = async () => {
    const token = getLatestToken();
    const user = getCurrentUser();
    if (token && user) {
        try {
            const response = await axios.get(`${baseServerURL}/users/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
}