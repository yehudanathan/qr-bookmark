import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUser } from "../firebase/auth/auth_user";

const Profile = () => {
  // FOR MOCK DATA. uncomment if backend is not available
  // const user = sessionStorage.getItem("user") || "{}";
  // const email = JSON.parse(user)["email"];
  // const fullName = JSON.parse(user)["name"];

  const user = getUser() || "{}";
  const email = user === "{}" ? "" : user.email;
  const fullName = user === "{}" ? "" : user.displayName;

  let navigate = useNavigate();

  const handleClick = (e : React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/config');
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <img alt="profile" className="profile-picture small" src={"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"}/>
      {/* gimana caranya biar bisa fetch profile picture wey :( */}
      <Stack>
        <span className="config-span small profile-section" onClick={handleClick}>{fullName}</span>
        <span className="config-span smaller profile-section">{email}</span>
      </Stack>
    </Stack>
  );
}

export default Profile;