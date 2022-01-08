import { User } from '../models/User';
const baseServerURL = "https://qr-bookmark.herokuapp.com";

export const getUserLinks = async (user: User) => {
    const response = await fetch(`${baseServerURL}/links`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${user.token}`,
        },
    });
    
    return response.json() ?? response;
}