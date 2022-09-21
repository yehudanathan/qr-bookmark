import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  TextField,
  DialogContentText,
  Checkbox,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import { useState } from "react";
import { pushLink } from "../firebase/database/links";
import { Link } from '../firebase/models/Link';
import LinkIcon from '@mui/icons-material/Link';
import moment from "moment";
import { useLocation, useNavigate } from "react-router";

const TitleDialog = ({ open, handleClose, URL }) => {
  const location = useLocation().pathname;
  const [title, setTitle] = useState("");
  const [favorite, setFavorite] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const link: Link = {
      dateTime: moment(new Date()).toISOString(),
      favorite: favorite,
      isDeleted: false,
      title: title,
      URL: URL
    }
    pushLink(link);
    alert("Link saved successfully");
    handleClose();
    if (location === '/links') {
      window.location.reload();
    } else {
      navigate("/links");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <Stack justifyContent="center">
        <DialogTitle
          sx={{
            paddingBottom: "0px",
            textAlign: "center"
          }}
        >
          <h3 className="title-dialog">Please insert a title for this bookmark:</h3>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "3px" }}>
          <Stack alignItems="center" direction="row" justifyContent="center" spacing={0.5}>
            <LinkIcon sx={{ fontSize: "16px" }} />
            <DialogContentText>
              <p className="title-url">{URL}</p>
            </DialogContentText>
          </Stack>
          <form onSubmit={handleSubmit} id="title-form">
            <TextField
              sx={{
                m: 1,
                width: "40ch",
                backgroundColor: "white",
                display: "flex"
              }}
              required
              autoFocus
              label="Title"
              variant="standard"
              value={title}
              size="medium"
              color="secondary"
              inputProps={{ style: { fontFamily: "Product Sans" } }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Stack justifyContent="align-left" sx={{ paddingLeft: "8px" }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox
                    color="secondary"
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
                height: "40px",
                fontFamily: "Montserrat",
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
                height: "40px",
                fontFamily: "Montserrat",
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
  );
}

export default TitleDialog;