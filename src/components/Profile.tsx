import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUser } from "../firebase/auth/auth_user";
import profilePicture from '../static/profile-picture.png';

const Profile = () => {
  const defaultPicture = profilePicture;
  const user = getUser();
  const email = user?.email;
  const fullName = user?.displayName;
  let navigate = useNavigate();
  let displayPicture = user?.photoURL;
  
  if (displayPicture === null)  {
    displayPicture = defaultPicture;
  }

  const handleClick = (e : React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/config');
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <img alt="profile" className="profile-picture small" src={displayPicture as string}/>
      <Stack>
        <span className="config-span small profile-section" onClick={handleClick}>{fullName}</span>
        <span className="config-span smaller profile-section">{email}</span>
      </Stack>
    </Stack>
  );
}

export default Profile;