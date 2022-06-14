import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser, updateUser } from "../firebase/auth/auth_user";

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

  return (
    <>
    <form className="edit-profile" onSubmit={handleSubmit}>
      <TextField label="Name" sx={{m: 1, width: "40ch", backgroundColor: "white", borderTopLeftRadius: "4px", borderTopRightRadius: "4px",}} size="small" value={displayName} onChange={e => setDisplayName(e.target.value)} color="success" inputProps={{style: {fontFamily: "Product Sans"}}}/>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" type="submit">Save</Button>
        <Button style={{backgroundColor: "#398564", height:"40px", fontFamily:"Montserrat"}} variant="contained" size="large" onClick={handleBack}>Back</Button>
      </Stack>
    </form>
    </>
  )
}

export default EditProfile;