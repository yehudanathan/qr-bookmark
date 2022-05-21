
import { User } from '../models/User';
/* 
NOTE: mock data is currently used in "../data/users.json".
Code for real data is currently commented for getLatestToken, getLatestUser
*/

export const getLatestToken = () => {
  return sessionStorage.getItem("token");
};

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user") ?? "{}") as User;
};

export const getCurrentUserId = () => {
  return JSON.parse(sessionStorage.getItem("user") ?? "{}").id;
};
