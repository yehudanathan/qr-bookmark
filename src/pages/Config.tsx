import { Button, Card, Box } from "@mui/material";
import { Stack } from "@mui/material";
// import { authLogout } from "../apis/auth";
import geometric from "../static/geometric-4.svg";
import { useNavigate } from "react-router-dom";
import { logOut } from "../firebase/auth/auth_user";

const Config = () => {
  // userFetcher dari sessionStorage
  const user = sessionStorage.getItem("user") || "{}";
  const email = JSON.parse(user)["email"];
  const fullName = JSON.parse(user)["name"];
  let navigate = useNavigate();

  return (
    <Box style={{backgroundImage:`url(${geometric})`, backgroundSize: "cover", height: "calc(100vh - 16px)",}}>
      <Stack alignItems="center">
        <Box style={{backgroundColor: "white", height: "90px", borderRadius: "10%", width: "500px"}}>
          <h1 className="profile-h1">Configure Your Profile</h1>
        </Box>
        <Card style={{backgroundColor: "#ddfbf2"}} sx={{maxWidth: "800px", minWidth: "600px", width: "70%"}} >
          <Stack sx={{padding: 4}} alignItems="center" spacing={1.5}>
            <img className="profile-picture" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"} alt="profile"/>
            {/* profile picture to be changed later, this is just a sample */}
            <h2 className="full-name">{fullName}</h2>
            <Stack alignItems="center" spacing={0.5}>
              <span className="config-span">{email}</span>
              <div className="blank"></div>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="space-evenly">
              <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large">Edit Profile</Button>
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
  );
};

export default Config;
