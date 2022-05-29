import { Box } from "@mui/material";
import React from "react";
import Post from "./Post";

const Feed = () => {
	return (
		<Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" }}}>
			<Post sx={{maxWidth:"30px"}} />
			<Post />
			<Post />
			<Post />
			<Post />
		</Box>
	);
};

export default Feed;
