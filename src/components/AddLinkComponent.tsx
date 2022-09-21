import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import TitleDialog from "./TitleDialog";
import validator from "validator";

const AddLinkComponent = () => {
    const [url, setUrl] = useState('');
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

    return (
        <div>
            <TitleDialog open={showTitleDialog} URL={url} handleClose={() => { setShowTitleDialog(false) }} />
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={0} alignItems="center">
                    <TextField
                        label="Insert URL"
                        sx={{
                            m: 1, width: "50ch", backgroundColor: "white",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                        }}
                        size="small"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        color="secondary"
                        inputProps={{ style: { fontFamily: "Product Sans" } }}
                        variant="filled"
                    />

                    <Button
                        style={{ backgroundColor: "#7c40a9" }}
                        variant="contained"
                        size="large"
                        sx={{
                            height: "48px",
                            fontFamily: "Montserrat"
                        }}
                        onClick={() => console.log("saved!")}
                        type="submit"
                    >
                        Save
                    </Button>
                </Stack>
            </form>
        </div>
    )
}

export default AddLinkComponent;
