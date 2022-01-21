import React from "react";
import { Button, Card, Container } from "@mui/material";
import { Stack } from "@mui/material";
import { Pictures } from "../models/Pictures";

const Config = () => {
  // userFetcher dari sessionStorage

  return (
    <Container>
      <Stack>
        <h1>Profile Config</h1>
        <Card>
          <Stack sx={{padding: 1}} alignItems="center" >
            <img src={Pictures.DEFAULT} alt="profile" width={100}/>
            <span className="config span">Username: {"HAHAHA"}</span>
            <span className="config span">Email: {}</span>
            <Button fullWidth>Edit Profile</Button>
            <Button fullWidth>Reset Bookmarks</Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default Config;
