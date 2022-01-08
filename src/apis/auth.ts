import axios from "axios";
import { User } from "../models/User";
const baseServerURL = "https://qr-bookmark.herokuapp.com";

export const authRegister = async (user: User) => {
  const response = await axios.post(`${baseServerURL}/register`, user);
  return response.data;
};

export const authSignIn = async (user: User) => {
  const response = await axios.post(`${baseServerURL}/login`, user);
  return response.data;
};
