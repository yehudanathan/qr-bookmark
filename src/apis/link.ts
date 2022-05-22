/* 
NOTE: mock data is currently used in "../data/links.json".
Cannot use postUserLink while using mock data.
Code for real data is currently commented for getUserLinks, getUserFavoriteLinks
*/

import axios from "axios";
import { Link } from "../models/Link";
import linkDB from "../data/links.json";

const baseServerURL = "https://qr-bookmark.herokuapp.com";

export const getUserLinks = async (userId: number) => {
    // const response = await axios.get(`${baseServerURL}/links?userId=${userId}`);
    // return response.data;
    console.log("loading mock data (User links)...");
    const links = Object.values(linkDB["links"]).filter(l => l.userID === userId);
    // console.log(links);
    return links;
    // this returns an array of links, to be processed at frontend side
}

export const postUserLink = async (userId: number, link: Link) => {
    const response = await axios.post(`${baseServerURL}/links`, link);
    return response.data;
}

export const getUserFavoriteLinks = async (userId: number) => {
    // const response = await axios.get(`${baseServerURL}/links?userId=${userId}&favorite=true`);
    // return response.data;
    console.log("loading mock data (Favorite links)...");
    const links = Object.values(linkDB["links"]).filter(l => l.userID === userId && l.favorite === true);
    // console.log(links);
    return links;
}