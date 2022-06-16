import { Button, IconButton, Input, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser, updateUser } from "../firebase/auth/auth_user";
import EditIcon from '@mui/icons-material/Edit';

const EditProfile = () => {
  let navigate = useNavigate();

  const user = getUser() || "{}";
  // const defaultURL = "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg";
  const defaultURL = "https://firebasestorage.googleapis.com/v0/b/qr-bookmark-36010.appspot.com/o/fukfuk.png?alt=media&token=abc7fb8f-e5b2-49fe-8d93-73dd94558255";
  const currentName = user === "{}" ? "" : user.displayName;
  const currentPhotoURL = user === "{}" ? defaultURL : user.photoURL;
  const [displayName, setDisplayName] = useState(currentName);
  const [photoURL, setPhotoURL] = useState(currentPhotoURL);

  const handleBack = () => {
    navigate("/config");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // save changes to backend
    updateUser({
      displayName: displayName,
      photoURL: undefined,
    });
    navigate("/config");
  }

  const handleEditPicture = (e) => {
    e.preventDefault();
    alert("To be implemented :)");
  }

  console.log(currentPhotoURL);
  return (
    <>
    <Stack sx={{padding: 3, marginBottom: "10px"}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Configure Your Profile</h1>

      <div className="profile-picture-hover">
        
        
        <label htmlFor="icon-button-file">
          <Button className="profile-picture-hover" component="span" sx={{borderRadius:"50%"}} >
            <img className="profile-picture edit" src={defaultURL as string} alt="profile"/>
          </Button>
        </label>
        
          
        <Input id="icon-button-file" type="file" sx={{display: "none"}} value={photoURL} onChange={handleEditPicture}/>          
        <label htmlFor="icon-button-file">
          <div className="profile-picture-middle">
            {/* <button style={{background: Edit, width: "30px", height: "30px", backgroundSize: "cover", border: "none", cursor: "pointer"}}></button> */}
            <EditIcon sx={{fontSize: 60, cursor:"pointer"}}/>
          </div>
        </label>
      </div>
      
      <form className="edit-profile" onSubmit={handleSubmit}>
      <TextField label="Name" sx={{m: 1, width: "40ch", backgroundColor: "white", borderTopLeftRadius: "4px", borderTopRightRadius: "4px",}} size="small" value={displayName} onChange={e => setDisplayName(e.target.value)} color="success" inputProps={{style: {fontFamily: "Product Sans"}}}/>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" type="submit">Save</Button>
        <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" onClick={handleBack}>Back</Button>
      </Stack>
      </form>
    </Stack>
    
    </>
  )
}

export default EditProfile;