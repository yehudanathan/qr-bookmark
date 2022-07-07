import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { deleteUser } from "../firebase/auth/auth_user";

const DeleteAccountDialog = ({ openDialog, handleCloseDialog }) => {
  const style = {
    backgroundColor: "#ffffff",
  }

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    deleteUser(() => {});
    // todo: prompt for reauthentication 
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
        <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#bd2222", width: "100px"}} onClick={handleDeleteAccount}>Delete</Button>
        <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#bd2222", width: "100px"}} onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default DeleteAccountDialog;