import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import validator from "validator";
import { Pictures } from "../models/Pictures";
import { User } from '../models/User';
import { authRegister } from '../apis/auth';

// const fake_user : User = {
//     email: "sososo@soso.so",
//     name: "Soso",
//     password: "soso",
//     displayPicture: Pictures.DEFAULT
// }
const AddLink = () => {
    const [url, setURL] = useState('');

    // kalo gabut: cari type e apa disini
    const handleSubmit = async (e: any) => {
        // if (validator.isURL(url)) {
        //     e.preventDefault();
        //     alert("URL: " + url);
        // } else {
        //     alert("Please enter a valid URL")
        // }
        // console.log("proceeding 2");
        // e.preventDefault();
        // const res = await authRegister(fake_user);
        // console.log(res);
    }

    return (
        <form className="form-control" onSubmit={handleSubmit}>
            <Stack direction="row" spacing = {0} alignItems = "center">
                <TextField 
                    label="Insert URL"
                    sx={{m: 1, width: "50ch", height: "40px"}}
                    size="small"
                    value={url}
                    onChange={e => setURL(e.target.value)}
                    />
                <Button
                    variant = "contained"
                    size= "large"
                    sx={{height:"40px"}}
                    onClick={() => console.log("saved!")}
                    type="submit"
                    >
                    Save
                </Button>
            </Stack>
        </form>
        
    )
}

/*
todo:
- make sure URL is not already in the database. if yes => error
- submit URL to database
*/

export default AddLink;
