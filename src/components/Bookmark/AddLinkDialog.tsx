import { 
  Button,
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogActions,
  Stack, 
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import { useState } from "react";
import { pushLink } from "../../firebase/database/links";
import { Link } from '../../firebase/models/Link';
import validator from "validator";
import moment from "moment";

const AddLinkDialog = ({open, handleClose}) => {
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [favorite, setFavorite] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.isURL(url)) {
      const link : Link = {
        dateTime: moment(new Date()).toISOString(),
        favorite: favorite,
        isDeleted: false,
        title: title,
        URL: url,
      }
      pushLink(link);
      alert("Link saved successfully");
      handleClose();
      window.location.reload();
    } else {
      alert("Please enter a valid URL.");
      // TODO
    }
  };

  return (<>
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <Stack >
          <DialogTitle
            sx={{
              paddingBottom: "0px",
              textAlign: "center"
            }}
          >
            <h1>Create new bookmark</h1>
          </DialogTitle>
          <DialogContent sx={{paddingBottom: "3px"}}>
              <form onSubmit={handleSubmit} id="title-form">
                <TextField
                  label="URL"
                  sx={{
                    m: 1, 
                    width: "40ch", 
                    backgroundColor: "white", 
                    display: "flex"
                  }}
                  size="medium"
                  value={url}
                  onChange={e => setURL(e.target.value)}
                  color="primary"
                  required
                  inputProps={{style: {fontFamily: "Product Sans"}}}
                  variant="standard"
                />
                <TextField
                  sx={{
                    m: 1, 
                    width: "40ch", 
                    backgroundColor: "white", 
                    display: "flex"
                  }}
                  required
                  label="Title"
                  variant="standard"
                  value={title}
                  size="medium"
                  color="primary"
                  inputProps={{style: {fontFamily: "Product Sans"}}}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Stack justifyContent="align-left" sx={{paddingLeft: "8px"}}>
                  <FormGroup>
                    <FormControlLabel 
                      control={<Checkbox
                        color="primary"
                        checked={favorite}
                        onChange={() => setFavorite(!favorite)}
                      />}
                      label={<p className="favorite-title-dialog">Set link as favorite</p>}
                    />
                  </FormGroup>
                </Stack>  
              </form>
          </DialogContent>
          <Stack alignItems="center" direction="row" justifyContent="center" spacing={0.5}>
            <DialogActions>
              <Button
                style={{
                  borderColor: "#398564", 
                  height:"40px", 
                  fontFamily:"Montserrat", 
                  color: "#000032", 
                  width: "100px",
                  display: "flex",
                }} 
                type="submit"
                form="title-form"
              >
                Save
              </Button>
              <Button 
                style={{
                  borderColor: "#398564", 
                  height:"40px", 
                  fontFamily:"Montserrat", 
                  color: "#000032", 
                  width: "100px",
                  display: "flex"
                }} 
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </Stack>
        </Stack>
    </Dialog>
  </>);
}

export default AddLinkDialog;