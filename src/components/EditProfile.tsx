import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser, updateUser } from "../firebase/auth/auth_user";
import Edit from "../static/edit.png";

const EditProfile = () => {
  let navigate = useNavigate();

  const user = getUser() || "{}";
  const currentName = user === "{}" ? "" : user.displayName;
  const [displayName, setDisplayName] = useState(currentName);

  const handleBack = () => {
    navigate("/config");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // save changes to backend
    updateUser({
      displayName: displayName,
      photoURL: null,
    });
    navigate("/config");
  }

  const handleEditPicture = (e) => {
    e.preventDefault();
    alert("To be implemented :)");
  }

  return (
    <>
    <Stack sx={{padding: 3}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Configure Your Profile</h1>
      <div className="profile-picture-hover">
        <button className="profile-picture-hover" onClick={handleEditPicture} style={{cursor: "pointer"}}>
          <img className="profile-picture edit" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"} alt="profile"/>
        </button>
        
        <div className="profile-picture-middle">
          {/* <button style={{background: Edit, width: "30px", height: "30px", backgroundSize: "cover", border: "none", cursor: "pointer"}}></button> */}
          <img src={Edit} alt="edit" width="30" height="30" style={{cursor: "pointer"}}/>
        </div>
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