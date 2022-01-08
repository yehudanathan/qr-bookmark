import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import validator from "validator";

const AddLink = () => {
    const [url, setURL] = useState('');

    // kalo gabut: cari type e apa disini
    const handleSubmit = (e: any) => {
        if (validator.isURL(url)) {
            e.preventDefault();
            alert("URL: " + url);
        } else {
            alert("Please enter a valid URL")
        }
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
*/

export default AddLink;
