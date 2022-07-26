import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { getUser, reAuthenticate } from "../firebase/auth/auth_user";

const ReauthDialog = ({ openDialog, handleCloseDialog }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  //esline-disable-next-line react-hooks/exhaustive-deps
  const [fieldError, setFieldError] = useState("");
  const user = getUser();
  const currentEmail = user?.email;

  const style = {
    backgroundColor: "#d9efff",
  }

  const errorCodes = {
    "auth/wrong-password" : "Incorrect password.",
    "auth/invalid-credential" : "The credential you provided is invalid. Please sign out and sign in again.",
  }

  const handleCheckPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      const response = await reAuthenticate(currentEmail, password);

      if (response === "reauthenticated") {
        handleCloseDialog();
      } else if (response in errorCodes) {
        // set errors.
        setFieldError(errorCodes[response]);
      } else {
        alert(response);
      }
    }
  }

  return (
    <>
    <Dialog 
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{style}}
    >
      <DialogTitle 
        id="alert-dialog-title"
        sx={{fontFamily: "Product Sans, Montserrat", fontWeight: "bold", fontSize: "20px", color: "#000032", textAlign: "center"}}
      >
        {"Please enter your password."}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleCheckPassword} id="password-form">
          <TextField
            required
            type="password"
            className="error-text-field"
            label="Password"
            sx={{
              m: 1, 
              width: "40ch", 
              backgroundColor: "white", 
              borderTopLeftRadius: "4px", 
              borderTopRightRadius: "4px",
              display: "flex"
            }}
            size="small"
            value={password}
            onChange={e => setPassword(e.target.value)}
            inputProps={{style: {fontFamily: "Product Sans"}}}
          />
          <TextField
            required
            type="password"
            className="error-text-field"
            label="Confirm Password"
            sx={{
              m: 1, 
              width: "40ch", 
              backgroundColor: "white", 
              borderTopLeftRadius: "4px", 
              borderTopRightRadius: "4px",
              display: "flex"
            }}
            size="small"
            value={confirmPassword}
            onChange={e => setConfPassword(e.target.value)}
            inputProps={{style: {fontFamily: "Product Sans"}}}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button 
          style={{
            borderColor: "#398564", 
            height:"40px", 
            fontFamily:"Montserrat", 
            color: "#000032", 
            width: "100px"
          }} 
          type="submit"
          form="password-form"
          >
            Submit
          </Button>
          <Button 
          style={{
            borderColor: "#398564", 
            height:"40px", 
            fontFamily:"Montserrat", 
            color: "#000032", 
            width: "100px"
          }} 
          onClick={handleCloseDialog}
          >
            Cancel
          </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default ReauthDialog;