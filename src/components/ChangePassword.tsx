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
import { updatePassword } from "../firebase/auth/auth_user";

const ChangePassword = ({ openDialog, handleCloseDialog }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  let navigate = useNavigate();

  const style = {
    backgroundColor: "#d9efff",
  }

  const handleCheckPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      await updatePassword(password, () => {
        handleCloseDialog();
        alert("Password successfully changed");
        navigate('/config');
      });
    }
  };

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
        {"Please enter your new password."}
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
};

export default ChangePassword;