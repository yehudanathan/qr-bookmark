import { Button, Card, Stack } from "@mui/material";
// import { authLogout } from "../apis/auth";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser, logOut } from "../firebase/auth/auth_user";
import { useState } from "react";
import { Helmet } from 'react-helmet';
import PictGenerator from "../components/PictGenerator";
import MetaTags from "react-meta-tags";
import profilePicture from '../static/profile-picture.png';
// import configIcon from "../static/settings-colored.ico";

const Config = () => {
  // for MOCK DATA. uncomment if backend is not available
  // const user = sessionStorage.getItem("user") || "{}";
  // const email = JSON.parse(user)["email"];
  // const fullName = JSON.parse(user)["name"];

  let navigate = useNavigate();
  const defaultPicture = profilePicture;
  const user = getUser();
  const email = user?.email;
  const fullName = user?.displayName;
  let displayPicture = user?.photoURL;

  if (displayPicture === null) {
    displayPicture = defaultPicture;
  }

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const toggleLoading = () => {setIsLoading(false)};
  const path = useLocation().pathname;

  return (
    <>
    <MetaTags>
      <title>Profile</title>
      <meta name="description" content="Profile page" />
      <meta property="og:title" content="Profile" />
    </MetaTags>

    <Helmet>
      <link id="configIcon" rel="icon" sizes="16x16"/>
    </Helmet>

    <div className="pict-generator-config">
      <PictGenerator onGenerate={toggleLoading} />
    </div>

    <div className="card-config">
      <Stack alignItems="center" spacing={2}>
        <Card style={{backgroundColor: "#ddfbf2", position: "absolute", top: "50px",}} sx={{maxWidth: "800px", minWidth: "600px", width: "70%" }}>

            {path === "/config/edit-profile" ? 
              <Outlet/> :
             <Stack sx={{padding: 3}} alignItems="center" spacing={1.5}>
                <h1 className="profile-h1">Your Profile</h1>
                <img className="profile-picture" src={displayPicture as string} alt="profile"/>
                <h2 className="full-name">{fullName}</h2>
                <Stack alignItems="center" spacing={0.5}>
                  <span className="config-span">{email}</span>
                  <div className="blank"></div>
                </Stack>

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
            }
            
        </Card>
      </Stack>
    </div>
    
    </>
  );
};

export default Config;
