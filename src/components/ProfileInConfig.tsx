import { Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logOut } from "../firebase/auth/auth_user";
import profilePicture from '../static/profile-picture.png';

const ProfileInConfig = () => {
  let navigate = useNavigate();
  const defaultPicture = profilePicture;
  const user = getUser();
  const email = user?.email;
  const fullName = user?.displayName;
  let displayPicture = user?.photoURL;

  if (displayPicture === null) {
    displayPicture = defaultPicture;
  }

  return (
    <Stack sx={{padding: 3}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Your Profile</h1>
      <img className="profile-picture" src={displayPicture} alt="profile"/>
      <h2 className="full-name">{fullName}</h2>
      <Stack alignItems="center" spacing={0.5}>
        <span className="config-span">{email}</span>
        <div className="blank"></div>
      </Stack>

      <div className="config-profile">
        <Link to="edit-profile" style={{textDecoration: "none"}}>
          <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat", width: "100%"}} variant="contained" size="large" onClick={() => {navigate("/edit-profile");}}>Edit Profile</Button>
        </Link>
        <Link to="account" style={{textDecoration: "none"}}>
          <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat", width: "100%"}} variant="contained" size="large" onClick={() => {navigate("/account");}}>Configure Account</Button>
        </Link>
        <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#398564", marginBottom: "10px"}} variant="outlined" size="large" onClick={() =>{logOut(); navigate("/signin");}}>Log out</Button>
        <Button style={{borderColor: "#398564", height:"40px", fontFamily:"Montserrat", color: "#398564", marginBottom: "10px"}} variant="outlined" size="large" onClick={() => navigate("/")}>Back</Button>
      </div>
    </Stack>
  )
}

export default ProfileInConfig;