import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  const handleClick = (e : React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/config');
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <img alt="profile" className="profile-picture small" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"}/>
      {/* gimana caranya biar bisa fetch profile picture wey :( */}
      <Stack sx={{cursor:"pointer"}} onClick={handleClick}>
        <span className="config-span small">ini usernameku</span>
        <span className="config-span smaller">ini emailku</span>
      </Stack>
    </Stack>
  );
}

export default Profile;