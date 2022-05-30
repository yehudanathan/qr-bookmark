import { RoomPreferences } from "@mui/icons-material";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import Feed from "../components/Bookmark/Feed";
// import Heading from "../components/Bookmark/Heading";
import Navbar from "../components/Bookmark/Navbar";
import Post from "../components/Bookmark/Post";
import Preferences from "../components/Bookmark/Preferences";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

const Bookmark = () => {
	const [mode, setMode] = useState("light");

	const theme = createTheme({
		palette: {
			mode: mode,
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Box bgcolor={"background.default"} color={"text.primary"}>
				<Navbar />
				<Preferences />
        {/* <Heading/> */}
				<Stack direction="row" spacing={2} justifyContent="space-between">
          <LeftBar/>
					<Feed />
          <RightBar/>
				</Stack>
			</Box>
		</ThemeProvider>
	);
};

export default Bookmark;
