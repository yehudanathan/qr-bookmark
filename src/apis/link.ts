import axios from "axios";
import { Link } from "../models/Link";

const baseServerURL = "https://qr-bookmark.herokuapp.com";

export const getUserLinks = async (userId: number) => {
    const response = await axios.get(`${baseServerURL}/links?userId=${userId}`);
    return response.data;
}

export const postUserLink = async (userId: number, link: Link) => {
    const response = await axios.post(`${baseServerURL}/links`, link);
    return response.data;
}

export const getUserFavoriteLinks = async (userId: number) => {
    const response = await axios.get(`${baseServerURL}/links?userId=${userId}&favorite=true`);
    return response.data;
}