import { 
  Button, 
  TextField,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser, updateEmail } from "../firebase/auth/auth_user";
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import DoneIcon from '@mui/icons-material/Done';
import MetaTags from 'react-meta-tags';
import DeleteAccountDialog from "./DeleteAccountDialog";
import ReauthDialog from "./ReauthDialog";
import ChangePassword from "./ChangePassword";

const ConfigureAccount = () => {
  let navigate = useNavigate();
  const user = getUser();
  const currentEmail = user?.email;
  const currentProvider = user?.providerData[0]["providerId"];
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openReauthDialog, setOpenReauthDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [email, setEmail] = useState(currentEmail);

  // console.log("emaileditmode");
  // console.log(emailEditMode);
  // console.log("provider id:");
  // console.log(currentProvider);
  // console.log("provider data:");
  // console.log(user?.providerData);

  const handleBack = () => {
    navigate("/config");
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setOpenDeleteDialog(true);
    if (emailEditMode) {
      toggleEditEmail();
    }
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const handleCloseReauthDialog = () => {
    if (currentEmail === email) {
      alert("Please enter a different email.") // TODO bikin email error dibawah textfield
    } else {
      updateEmail(email as string, () => {
        alert("Email updated successfully");
        navigate("/config");
      });
    }
    setOpenReauthDialog(false);
  }

  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
  }

  const handleVerified = () => {
    if (user?.emailVerified) { // to be restructured in auth_user api
      return <VerifiedIcon sx={{color: "#1179f2"}}/>;
    }
    return <></>;
  }

  const handleEmail = () => {
    if (emailEditMode) {
      return 
      <>
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
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              color="success" 
              inputProps={{style: {fontFamily: "Product Sans"}}}
              helperText="You will be asked for re-authentication."
            />
          </Stack>
          <Button 
            size="small"
            type="submit"
            onClick={handleUpdateEmail}
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
          onClick={toggleEditEmail}
          size="small"
          sx={{minWidth: "15px", height: "28px", borderRadius: "50%"}}
        >
          <EditIcon fontSize="small" sx={{color: "#35363a"}}/>
        </Button>
      </Stack>
    </>;
  }

  const toggleEditEmail = () => {
    if (!emailEditMode) {
      alert("Update your email");
    }
    setEmailEditMode(!emailEditMode);
  }

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    setOpenReauthDialog(true);
  }

  const handleChangePassword = () => {
    if (emailEditMode) {
      toggleEditEmail();
    }
    setOpenChangePasswordDialog(true);
  }

  const handleDisableButton = () => {
    if (currentProvider === 'google.com') {
      return true;
    }
    return false;
  }

  return (
    <>
    <Stack sx={{padding: 3, marginBottom: "10px"}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Configure Your Account</h1>
      <form className="edit-profile" onSubmit={handleUpdateEmail}>
        <Stack alignItems="center" spacing={1}>
          <div className="config-profile account-config">
            <span className="config-span"><strong>Email</strong></span>
            {handleEmail()}
          </div>
          <div className="config-profile edit">
            <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" onClick={handleChangePassword} disabled={handleDisableButton()}>Change Password</Button>
            <Button style={{height:"40px", fontFamily:"Montserrat", width: "100%"}} variant="contained" size="large" color="error" onClick={handleDelete}>Delete Account</Button>
            <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#398564", width: "100%"}} variant="outlined" size="large" onClick={handleBack}>Back</Button>
          </div>  
        </Stack>
      </form>
    </Stack>

    <DeleteAccountDialog openDialog={openDeleteDialog} handleCloseDialog={handleCloseDeleteDialog} />
    <ReauthDialog openDialog={openReauthDialog} handleCloseDialog={handleCloseReauthDialog} />
    <ChangePassword openDialog={openChangePasswordDialog} handleCloseDialog={handleCloseChangePasswordDialog} />
    </>
  )
}

export default ConfigureAccount;