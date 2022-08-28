import { Card, Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { getUser } from "../firebase/auth/auth_user";
import { useState } from "react";
import { Helmet } from 'react-helmet';
import PictGenerator from "../components/PictGenerator";
import MetaTags from "react-meta-tags";
import profilePicture from '../static/profile-picture.png';
import ProfileInConfig from "../components/ProfileInConfig";
// import { authLogout } from "../apis/auth";

const Config = () => {
  // for MOCK DATA. uncomment if backend is not available
  // const user = sessionStorage.getItem("user") || "{}";
  // const email = JSON.parse(user)["email"];
  // const fullName = JSON.parse(user)["name"];

  const defaultPicture = profilePicture;
  const user = getUser();
  let displayPicture = user?.photoURL;

  if (displayPicture === null) {
    displayPicture = defaultPicture;
  }

  // what is this state use for?
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // why we need this function? isnt () => setIsLoading(false); on the usage is good enough?
  const toggleLoading = () => {setIsLoading(false)};
  const path = useLocation().pathname;

  // Think this shouldnt be put here, should be put in the jsx itself { path !== ..... ? <></> : <ProfileInConfig />} kind
  // and why we need the path checking here? shouldnt the routes is the one handling this?
  const handleRendering = () => {
    if (path !== '/config/' && path !== '/config') {
      return <></>;
    }
    return <ProfileInConfig/>;
  }

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
        <Card 
        style={{backgroundColor: "#ddfbf2", position: "absolute", top: "50px",}} 
        sx={{maxWidth: "800px", minWidth: "600px", width: "70%" }}>
          {handleRendering()}
          <Outlet />
        </Card>
      </Stack>
    </div>
    
    </>
  );
};

export default Config;
