import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import validator from "validator";
import TitleDialog from "./TitleDialog";

const AddLink = () => {
    const [url, setURL] = useState('');
    const [showTitleDialog, setShowTitleDialog] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validator.isURL(url)) {
            setShowTitleDialog(true);   
        } else {
            alert("Please enter a valid URL");
            // TODO fielderror
        }
    }

    return (<>
        <TitleDialog open={showTitleDialog} URL={url} handleClose={() => {setShowTitleDialog(false)}}/>
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing = {0} alignItems = "center">
                <TextField
                label="Insert URL"
                sx={{m: 1, width: "50ch", backgroundColor: "white",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                }}
                size="small"
                value={url}
                onChange={e => setURL(e.target.value)}
                color="secondary"
                inputProps={{style: {fontFamily: "Product Sans"}}}
                variant="filled"
                />
                
                <Button
                style={{backgroundColor: "#7c40a9"}}
                variant = "contained"
                size= "large"
                sx={{height:"48px",
                    fontFamily:"Montserrat"}}
                onClick={() => console.log("saved!")}
                type="submit"
                >
                Save
                </Button>
            </Stack>
        </form>
    </>
    )
}

/*
TODO:
- make sure URL is not already in the database. if yes => error
- submit URL to database
*/

export default AddLink;
