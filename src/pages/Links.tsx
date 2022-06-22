import { getUserLinks, getUserFavoriteLinks } from '../apis/link';
import users from "../data/users.json";
import { Button } from '@mui/material';
import React from 'react';

/* 
NOTE: mock data is currently used in "../data/links.json".
Code for real data has not yet been set up to get links.
*/


const Links = () => {
    const user = sessionStorage.getItem("user") || "{}";
    const email = JSON.parse(user)["email"];
    const userInDB = Object.values(users["registered-users"]).find(user => user["email"] === email) || {};
    // the above userInDB is still for the mock data. back end has not yet been set up
    const userID = userInDB["userId"];
    // console.log("user ID: " + userID);
    
    const handleGetLinks = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        const links = await getUserLinks(userID);
        alert("check console");
        console.log(links);
        return links;
    }
    
    const handleGetFavoriteLinks = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        const favLinks = await getUserFavoriteLinks(userID);
        alert("check console");
        console.log(favLinks);
        return favLinks;
    }

    return (
        <div>
            Links page
            <Button onClick={handleGetLinks}>
                Get Links
            </Button>
            <Button onClick={handleGetFavoriteLinks}>
                Get Favorite Links
            </Button>
        </div>
    )
}

export default Links;
