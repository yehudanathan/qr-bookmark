import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Favorite from "../static/favorite.png";
import History from "../static/history.png";
import Settings from "../static/settings.png";
import Share from "../static/share.png";
import Sponsor from "../static/sponsor.png";
import Info from "../static/info.png";
import Logout from "../static/logout.png";
import Bookmarks from "../static/bookmark.png";
import {authLogout, isSignedIn} from "../apis/auth";
import {useNavigate} from "react-router-dom";


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
    // console.log(state);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={e => toggleDrawer(anchor, false)}
      onKeyDown={e => toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: "Favorites", path: Favorite, onClick: () => navigate("/links") },
          { text: "Bookmarks", path: Bookmarks, onClick: () => navigate("/links") },
          { text: "Settings", path: Settings, onClick: () => navigate("/config") },
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
      {/* <List>
        {[
          { text: "Share", path: Share },
          { text: "Sponsors", path: Sponsor },
          { text: "About", path: Info },
        ].map((obj) => (
          <ListItem button key={obj.text}>
            <ListItemIcon>
              <img src={obj.path} alt="logo" width="20" height="20"/>
            </ListItemIcon>
            <ListItemText primary={obj.text} />
          </ListItem>
        ))}
      </List> */}
      <List>
        <ListItem button key="About" onClick={() => navigate('/about')}>
          <ListItemIcon>
            <img src={Info} alt="logo" width="20" height="20"/>
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button key="Log out" onClick={() => {authLogout(); navigate('/signin')}}>
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
          onClose={e => toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

// require(
  

  // onToggle={toggleDrawer("Menu", true)}
  //<Hamburger
//   onToggle={(toggled) => {
//     if (toggled) {
//       toggleDrawer("left", !state.left);
//     } else {
//       toggleDrawer("left", !state.left);
//     }
//     console.log("blabla")
//   }}
// />