import { RoomPreferences } from "@mui/icons-material";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import Feed from "../components/Bookmark/Feed";
import Navbar from "../components/Bookmark/Navbar";
import Post from "../components/Bookmark/Post";
import Preferences from "../components/Bookmark/Preferences";
import LeftBar from "../components/Bookmark/LeftBar";
import RightBar from "../components/Bookmark/RightBar";

const Bookmark = () => {
	const [mode, setMode] = useState("light");

	const dualTheme = createTheme({
		palette: {
			mode: mode,
		},
	});

	return (
		<ThemeProvider theme={dualTheme}>
      {/* <p>2</p> */}
			<Box bgcolor={"background.default"} color={"text.primary"} sx={{m:"-12px"}}>
				<Navbar />
				<Preferences />
				<Stack direction="row" spacing={2} justifyContent="space-between">
          <LeftBar/>
					<Post />
          <RightBar/>
				</Stack>
			</Box>
		</ThemeProvider>
	);
};

export default Bookmark;
