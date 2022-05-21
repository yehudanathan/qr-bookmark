
import { User } from '../models/User';

export const getLatestToken = () => {
  return sessionStorage.getItem("token");
};

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user") ?? "{}") as User;
};

export const getCurrentUserId = () => {
  return JSON.parse(sessionStorage.getItem("user") ?? "{}").id;
};
