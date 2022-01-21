
import { User } from '../models/User';
import axios from 'axios';
import { getLatestToken } from './session';

const baseServerURL = "https://qr-bookmark.herokuapp.com";

export const updateCurrentUser = async (user: User) => {
    try {
        const response = await axios.put(`${baseServerURL}/users/${user.id}`, user, {
        headers: {
            Authorization: `Bearer ${getLatestToken()}`,
        },
        });
        if (response.status === 200) console.log("User updated successfully");
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};