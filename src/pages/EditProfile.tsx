import { Button, Input, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser, updateUser } from "../firebase/auth/auth_user";
import EditIcon from '@mui/icons-material/Edit';
import { uploadFile } from "../firebase/storage/upload_manager";
import { getDownloadURLFromSnapshot, getUploadPercentageFromSnapshot } from "../firebase/storage/utils";
import MetaTags from 'react-meta-tags';
import profilePicture from '../static/profile-picture.png';

const EditProfile = () => {
  let navigate = useNavigate();

  const defaultPicture = profilePicture;
  const user = getUser();
  const currentName = user?.displayName;
  const currentPhotoURL = user?.photoURL === null || user?.photoURL === undefined ? defaultPicture : user?.photoURL;
  const [displayName, setDisplayName] = useState(currentName);

  const handleBack = () => {
    navigate("/config");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // save changes to backend
    updateUser({
      displayName: displayName,
      photoURL: undefined,
    }, () => {
      navigate("/config"); 
      alert("Profile updated!");
    });
  }

  const handleEditPicture = async (e) => {
    e.preventDefault();
    await uploadFile(e.target.files[0], async (snapshot) => {
      try {  
        console.log("Uploading file...");
        const uploadProgress = getUploadPercentageFromSnapshot(snapshot);
        console.log(uploadProgress + "% uploaded");
        if (uploadProgress === 100) {
          const downloadURL = await getDownloadURLFromSnapshot(snapshot);
          console.log("URL:");
          console.log(downloadURL);
          updateUser({
            photoURL: downloadURL as string,
          }, () => {alert("Profile picture updated!"); navigate("/config");});
        }
      } catch (error) {
        console.log(error);
        alert("Error uploading file");
      }
    });
  };

  return (
    <>
    <MetaTags>
      <title>Edit Profile</title>
      <meta name="description" content="Configure your profile" />
      <meta property="og:title" content="Configure Your Profile" />
    </MetaTags>

    <Stack sx={{padding: 3, marginBottom: "10px"}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Configure Your Profile</h1>

      <div className="profile-picture-hover">    
        <label htmlFor="icon-button-file">
          <Button className="profile-picture-hover" component="span" sx={{borderRadius:"50%"}} >
            <img className="profile-picture edit" src={currentPhotoURL as string} alt="profile"/>
          </Button>
        </label>
        <Input id="icon-button-file" type="file" sx={{display: "none"}} onChange={handleEditPicture}/>          
        <label htmlFor="icon-button-file">
          <div className="profile-picture-middle">
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