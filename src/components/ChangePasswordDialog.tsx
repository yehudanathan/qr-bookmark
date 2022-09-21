import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getUser, reAuthenticate, updatePassword } from "../firebase/auth/auth_user";

const ChangePasswordDialog = ({ openDialog, handleCloseDialog }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfNewPassword] = useState("");

  // const [fieldError, setFieldError] = useState(""); // TODO
  const user = getUser();
  const currentEmail = user?.email;
  let navigate = useNavigate();

  const style = {
    backgroundColor: "#d9efff",
  }

  const errorCodes = {
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "The credential you provided is invalid. Please sign out and sign in again.",
  }

  const handleCheckPassword = async (e) => {
    e.preventDefault();
    const response = await reAuthenticate(currentEmail, oldPassword);

    if (response === "reauthenticated") {
      if (newPassword === confirmNewPassword) {
        updatePassword(newPassword, () => {
          alert("Password updated");
          handleCloseDialog();
          navigate("/config");
        });
      } else {
        alert("New passwords do not match");
      }
    } else if (response in errorCodes) {
      // TODO
      // setFieldError(errorCodes[response]);
    } else {
      alert(response);
    }
  };

  return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "Product Sans, Montserrat", fontWeight: "bold", fontSize: "20px", color: "#000032", textAlign: "center" }}
        >
          {"Please enter your password."}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleCheckPassword} id="password-form">
            <TextField
              required
              type="password"
              className="error-text-field"
              label="Old Password"
              sx={{
                m: 1,
                width: "40ch",
                backgroundColor: "white",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                display: "flex"
              }}
              size="small"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              inputProps={{ style: { fontFamily: "Product Sans" } }}
            />
            <TextField
              required
              type="password"
              className="error-text-field"
              label="New Password"
              sx={{
                m: 1,
                width: "40ch",
                backgroundColor: "white",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                display: "flex"
              }}
              size="small"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              inputProps={{ style: { fontFamily: "Product Sans" } }}
            />
            <TextField
              required
              type="password"
              className="error-text-field"
              label="Confirm New Password"
              sx={{
                m: 1,
                width: "40ch",
                backgroundColor: "white",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                display: "flex"
              }}
              size="small"
              value={confirmNewPassword}
              onChange={e => setConfNewPassword(e.target.value)}
              inputProps={{ style: { fontFamily: "Product Sans" } }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              borderColor: "#398564",
              height: "40px",
              fontFamily: "Montserrat",
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
              height: "40px",
              fontFamily: "Montserrat",
              color: "#000032",
              width: "100px"
            }}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
};

export default ChangePasswordDialog;