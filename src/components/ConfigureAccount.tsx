import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser } from "../firebase/auth/auth_user";
import { Helmet } from 'react-helmet';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import DoneIcon from '@mui/icons-material/Done';
import MetaTags from 'react-meta-tags';

const ConfigureAccount = () => {
  let navigate = useNavigate();
  const user = getUser();
  const email = user?.email;
  const [openDialog, setOpenDialog] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(email);

  const handleBack = () => {
    navigate("/config");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("In progress");
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleVerified = () => {
    if (user?.emailVerified) { // to be restructured in auth_user api
      return <VerifiedIcon sx={{color: "#1179f2"}}/>;
    }
    return <></>;
  }

  const handleEmail = () => {
    if (emailEditMode) {
      return <>
      <Stack direction="row" spacing={0.5} alignItems="baseline" sx={{marginTop:"-13px"}}>
        <Stack>
          <TextField 
            className="error-text-field"
            label="Input your new email" 
            sx={{
              m: 1, 
              width: "40ch", 
              backgroundColor: "white", 
              borderTopLeftRadius: "4px", 
              borderTopRightRadius: "4px",
              display: "flex"
            }} 
            size="small" 
            value={currentEmail} 
            onChange={e => setCurrentEmail(e.target.value)} 
            color="success" 
            inputProps={{style: {fontFamily: "Product Sans"}}}
            helperText="You will be signed out and asked for re-verification."
          />
          <div className="blank"></div>
        </Stack>
        <Button 
          onClick={handleEditEmail}
          size="small"
          sx={{minWidth: "15px", height: "28px", borderRadius: "50%"}}
        >
          <DoneIcon fontSize="small" sx={{color: "#35363a"}}/>
        </Button>
      </Stack>
      </>;
    }
    
    return <>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{marginTop:"-3px"}}>
        {handleVerified()}
        <span className="config-span">{email}</span>
        <Button 
          onClick={handleEditEmail}
          size="small"
          sx={{minWidth: "15px", height: "28px", borderRadius: "50%"}}
        >
          <EditIcon fontSize="small" sx={{color: "#35363a"}}/>
        </Button>
      </Stack>
    </>;
  }

  const handleEditEmail = () => {
    if (!emailEditMode) {
      alert("Update your email");
    }
    setEmailEditMode(!emailEditMode);
  }

  const handleChangePassword = () => {
    alert("Changing password");
  }

  const style = {
    backgroundColor: "#ffffff",
  }

  return (
    <>
    <Stack sx={{padding: 3, marginBottom: "10px"}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Configure Your Account</h1>
      <form className="edit-profile" onSubmit={handleSubmit}>
        <Stack alignItems="center" spacing={1}>
          <div className="config-profile account-config">
            <span className="config-span"><strong>Email</strong></span>
            {handleEmail()}
          </div>
          <div className="config-profile edit">
            <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" onClick={handleChangePassword}>Change Password</Button>
            <Button style={{height:"40px", fontFamily:"Montserrat", width: "100%"}} variant="contained" size="large" color="error" onClick={handleDelete}>Delete Account</Button>
            <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#398564", width: "100%"}} variant="outlined" size="large" onClick={handleBack}>Back</Button>
          </div>  
        </Stack>
      </form>
    </Stack>

    <Dialog 
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{style}}
    >
      <DialogTitle 
        id="alert-dialog-title"
        sx={{fontFamily: "Gotham Medium", fontWeight: "bold", fontSize: "28px", color: "#730c0c"}}
      >
        {"Delete your account?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="alert-dialog-description"
          sx={{fontFamily: "Product Sans", fontSize: "17px", color: "#000000"}}
        >
          This action cannot be undone and your bookmarks will be permanently deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#bd2222", width: "100px"}} onClick={() => alert("Delete in progress")}>Delete</Button>
        <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#bd2222", width: "100px"}} onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default ConfigureAccount;