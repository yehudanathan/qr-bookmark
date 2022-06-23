import { Button, Input, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser, updateUser } from "../firebase/auth/auth_user";
import { uploadFile } from "../firebase/storage/upload_manager";
import { getDownloadURLFromSnapshot, getUploadPercentageFromSnapshot } from "../firebase/storage/utils";
import { Helmet } from 'react-helmet';
import EditIcon from '@mui/icons-material/Edit';
import MetaTags from 'react-meta-tags';
import profilePicture from '../static/profile-picture.png';

const ConfigureAccount = () => {
  let navigate = useNavigate();
  const handleBack = () => {
    navigate("/config");
  }

  const handleSubmit = () => {
    alert("In progress");
  }

  return (
    <>
    <Stack sx={{padding: 3, marginBottom: "10px"}} alignItems="center" spacing={1.5}>
      <h1 className="profile-h1">Configure Your Account</h1>
      <form className="edit-profile" onSubmit={handleSubmit}>
        {/* <TextField label="Name" sx={{m: 1, width: "40ch", backgroundColor: "white", borderTopLeftRadius: "4px", borderTopRightRadius: "4px",}} size="small" value={displayName} onChange={e => setDisplayName(e.target.value)} color="success" inputProps={{style: {fontFamily: "Product Sans"}}}/> */}
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" type="submit">Save</Button>
          <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" onClick={handleBack}>Back</Button>
        </Stack>
      </form>
    </Stack>
    </>
  )
}

export default ConfigureAccount;