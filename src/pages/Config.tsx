import { Button, Card, Box } from "@mui/material";
import { Stack } from "@mui/material";
// import { authLogout } from "../apis/auth";
import geometric from "../static/geometric-4.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUser, logOut } from "../firebase/auth/auth_user";
import { useState } from "react";
import EditProfile from "../components/EditProfile";

const Config = () => {
  // userFetcher dari sessionStorage
  // for MOCK DATA. uncomment if backend is not available
  // const user = sessionStorage.getItem("user") || "{}";
  // const email = JSON.parse(user)["email"];
  // const fullName = JSON.parse(user)["name"];

  const user = getUser() || "{}";
  const email = user === "{}" ? "" : user.email;
  const fullName = user === "{}" ? "" : user.displayName;

  let navigate = useNavigate();

  // const [editProfile, setEditProfile] = useState(false);

  // const handleEditProfile = () => {
  //   setEditProfile(!editProfile);
    
  // }

  return (
    <>
    <Box style={{backgroundImage:`url(${geometric})`, backgroundSize: "cover", height: "calc(100vh - 16px)",}}>
      {/* background image to be changed, this geometric is ugly D: */}
      <Stack alignItems="center" spacing={2}>
        <Card style={{backgroundColor: "#ddfbf2", position: "absolute", top: "50px",}} sx={{maxWidth: "800px", minWidth: "600px", width: "70%" }}>
          <Stack sx={{padding: 3}} alignItems="center" spacing={1.5}>
            <h1 className="profile-h1">Your Profile</h1>
            <img className="profile-picture" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"} alt="profile"/>
            {/* profile picture to be changed later, this is just a sample */}
            <h2 className="full-name">{fullName}</h2>
            <Stack alignItems="center" spacing={0.5}>
              <span className="config-span">{email}</span>
              <div className="blank"></div>
            </Stack>
            <Outlet/>
            <Stack direction="row" spacing={2} justifyContent="space-evenly">
              <Link to="edit-profile" style={{textDecoration: "none"}}>
                <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" onClick={() => {navigate("/edit-profile");}}>Edit Profile</Button>
              </Link>
              <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large">Reset Bookmarks</Button>
              <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large">Delete Account</Button>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="space-evenly">
              <Button style={{height:"40px", fontFamily:"Montserrat", color: "#398564"}} variant="text" size="large" onClick={() =>{logOut(); navigate("/signin");}}>Log out</Button>
              <Button style={{height:"40px", fontFamily:"Montserrat", color: "#398564"}} variant="text" size="large" onClick={() => navigate("/")}>Back</Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
    </>
  );
};

export default Config;
