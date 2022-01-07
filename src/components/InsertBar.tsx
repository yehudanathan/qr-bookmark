import { Button, Stack, TextField } from "@mui/material";

const InsertBar = () => {
    return (
        <Stack direction="row" spacing = {0} alignItems = "center">
            <TextField 
                placeholder="Insert URL here"
                label="Link"
                sx={{m: 1, width: "50ch", height: "40px"}}
                size="small"
                />
            <Button
                variant = "contained"
                size= "large"
                sx={{height:"40px"}}
                onClick={() => console.log("saved!")}
                >
                Save
            </Button>
        </Stack>
    )
}

/*
todo:
- enter will respond as add
- make sure URL is  not already in the database. if yes => error
*/

export default InsertBar;
