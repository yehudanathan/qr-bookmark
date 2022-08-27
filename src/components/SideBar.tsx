import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import User from "../static/user.png";
import Info from "../static/info.png";
import Logout from "../static/logout.png";
import Bookmarks from "../static/bookmark.png";
import Home from "../static/home.png";
import { useNavigate } from "react-router-dom";
import { logOut } from "../firebase/auth/auth_user";


export default function TemporaryDrawer() {
  let navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
      onKeyDown={() => toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: "Dashboard", path: Home, onClick: () => navigate("/") },
          { text: "Bookmarks", path: Bookmarks, onClick: () => navigate("/links") },
          { text: "Profile", path: User, onClick: () => navigate("/config") },
        ].map((obj) => (
          <ListItem button key={obj.text} onClick={obj.onClick}>
            <ListItemIcon>
              <img src={obj.path} alt="logo" width="20" height="20"/>
            </ListItemIcon>
            <ListItemText primary={obj.text} sx={{fontFamily: "Product Sans", fontSize: "17px", color: "black"}}/>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key="About" onClick={() => navigate('/about')}>
          <ListItemIcon>
            <img src={Info} alt="logo" width="20" height="20"/>
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button key="Log out" onClick={() => {logOut(); navigate('/signin')}}>
          <ListItemIcon>
            <img src={Logout} alt="logo" width="20" height="20"/>
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Box>
  );
  
  const path = process.env.PUBLIC_URL + '/hamb-blue.png';
  return (
    <div>
      <React.Fragment>
        <button style={{background: `url("${path}") `, width: "30px", height: "30px", backgroundSize: 'cover', border: 'none', cursor: 'pointer'}} onClick={e => toggleDrawer("left", true)}></button>
        <Drawer
          anchor="left"
          open={state.left}
          onClose={() => toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}