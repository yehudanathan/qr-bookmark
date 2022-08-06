import { ArrowBack, CropFree } from "@mui/icons-material";
import { Button, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { Helmet } from 'react-helmet';
import { useState } from "react";
import MetaTags from 'react-meta-tags';
import PictGenerator from "../components/PictGenerator";

const About = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toggleLoading = () => {setIsLoading(false)};
  let navigate = useNavigate();

  return (<>
    <MetaTags>
      <title>About QR-Bookmark</title>
      <meta name="description" content="About this project" />
      <meta property="og:title" content="About QR-Bookmark" />
    </MetaTags>

    <Helmet>
      <link id="aboutIcon" rel="icon" sizes="16x16"/>
    </Helmet>

    <div className="about-div">
    </div>

    <div className="card-config">
      <Card sx={{
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingLeft: "50px",
        paddingRight: "50px",
        maxWidth: "600px", 
        minWidth: "400px", 
        position: "absolute", 
        top: "50px",
        left: "25%" // TODO
      }}>
        <Stack direction="row" alignItems="center" spacing={0.5}
          sx={{marginBottom: "20px",
          transform: "translateX(-5px)"
        }}
        >
          <CropFree sx={{fontSize: "40px"}}/>
          <h2 className="about-h2">QR-Bookmark</h2>
        </Stack>
        <p>is a simple bookmark manager that allows user to scan QR codes containing URLs and save them. This web application was developed using React.js and Firebase.</p>

        <h2 className="get-to-know">Get to know the people behind this app.</h2>
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
        <Button variant="contained" onClick={() => navigate('/')} startIcon={<ArrowBack/>}
          sx={{marginTop: "60px",
            color: "white",
            backgroundColor: "#115e90",
          }}
          >Back</Button>
      </Card>
    </div>
  </>
  )
}

export default About;