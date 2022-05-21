/* 
NOTE: mock data is currently used in "../data/users.json".
Cannot use authRegister while using mock data.
Code for real data is currently commented for authLogin, isSignedIn
*/

import axios from "axios";
import { AuthUser } from "../models/AuthUser";
import { getCurrentUser, getLatestToken } from "./session";
import users from "../data/users.json";

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
  // try {
  //   const response = await axios.post(`${baseServerURL}/login`, user);
  //   if (response.status === 200) console.log("User logged in successfully");
  //   else if (response.status === 400) return ("Incorrect password");
  //   sessionStorage.setItem("token", response.data.accessToken);
  //   sessionStorage.setItem("user", JSON.stringify(response.data.user));
  //   return "Logged in";
  // } catch (error : any) {
  //   console.log(error.response.data);
  //   return error.response.data;
  // }
  console.log("loading mock data...");
  const emails = Object.values(users["registered-users"]).map(a => a.email);
  console.log(emails);
  if (user.email === emails.find(u => u === user.email)) {
    console.log("email found in mock data");
    const passwords = Object.values(users["registered-users"]).map(us => {if (us.email === user.email) return us.password;});
    console.log(passwords);
    if (user.password === passwords.find(p => p === user.password)) {
      console.log("password correct");
      sessionStorage.setItem("token", "this-is-a-mock-token");
      sessionStorage.setItem("user", JSON.stringify(user));
      return "Logged in";
    } else {
      console.log("password incorrect");
      return "Incorrect password";
    }
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
    // try {
    //   const response = await axios.get(`${baseServerURL}/users/${user.id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   if (response.status === 200) {
    //     sessionStorage.setItem("user", JSON.stringify(response.data));
    //     return true;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
    sessionStorage.setItem("user", JSON.stringify(user));
    return true;
  }
  return false;
};