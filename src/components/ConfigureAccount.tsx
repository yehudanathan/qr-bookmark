import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser } from "../firebase/auth/auth_user";
import { Helmet } from 'react-helmet';
import EditIcon from '@mui/icons-material/Edit';
import MetaTags from 'react-meta-tags';

const ConfigureAccount = () => {
  let navigate = useNavigate();
  const user = getUser();
  const email = user?.email;
  const [openDialog, setOpenDialog] = useState(false);

  const handleBack = () => {
    navigate("/config");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("In progress");
  }

  const handleDelete = (e) => {
    e.preventDefault();
    // openAlertDialog();
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const style = {
    backgroundColor: "#ffffff",
  }

  return (
    <>
    <Stack sx={{padding: 3, marginBottom: "10px"}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Configure Your Account</h1>
      <form className="edit-profile" onSubmit={handleSubmit}>
        {/* <TextField label="Name" sx={{m: 1, width: "40ch", backgroundColor: "white", borderTopLeftRadius: "4px", borderTopRightRadius: "4px",}} size="small" value={displayName} onChange={e => setDisplayName(e.target.value)} color="success" inputProps={{style: {fontFamily: "Product Sans"}}}/> */}
        {/* <Stack justifyContent="flex-start" spacing={0.5} alignItems="center"> */}
        <Stack alignItems="center" spacing={1}>
          <div className="config-profile account-config">
            <span className="config-span"><strong>Email</strong></span>
            <span className="config-span">{email}</span>
            <span className="config-span"><strong>Password</strong></span>
            <span className="config-span">{email}</span>
          </div>
          <div className="config-profile edit">
            <Button style={{height:"40px", fontFamily:"Montserrat", width: "100%"}} variant="contained" size="large" color="error" onClick={handleDelete}>Delete Account</Button>
            {/* <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" type="submit">Save</Button> */}
            <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#398564", width: "100%"}} variant="outlined" size="large" onClick={handleBack}>Back</Button>
          </div>  
        </Stack>
        {/* </Stack> */}
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