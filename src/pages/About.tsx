import { ArrowBack } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import MetaTags from 'react-meta-tags';

const About = () => {
  let navigate = useNavigate();
  return (
    <div className="about-div">
      <MetaTags>
        <title>About QR-Bookmark</title>
        <meta name="description" content="About this project" />
        <meta property="og:title" content="About QR-Bookmark" />
      </MetaTags>
      <h2 className="about-h2">QR-Bookmark</h2>
      <p>Silahkan tulis disini</p>
      <h2 className="about-h2">Get to know the people behind this app.</h2>
      <Stack direction="row" spacing={0} justifyContent="space-evenly" sx={{maxWidth: "670px"}}>
        <Stack alignItems="center">
          <div className="zoom">
            <img className="profile-picture about" alt="jessica-profile" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"}></img>
          </div>
          <p className="p-name">Jessica Mary Listijo</p>
        </Stack>
        <Stack alignItems="center">
          <div className="zoom">
            <img className="profile-picture about" alt="yehuda-profile" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"}></img>
          </div>
          <p className="p-name">Yehuda Nathan</p>
        </Stack>
        <Stack alignItems="center">
          <div className="zoom">
            <img className="profile-picture about" alt="alvin-profile" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"}></img>
          </div>
          <p className="p-name">Edward Alvin</p>
        </Stack>
      </Stack>
      <Button onClick={() => navigate('/')} startIcon={<ArrowBack/>}>Back</Button>
    </div>
  )
}

export default About;