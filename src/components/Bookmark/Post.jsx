import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Checkbox,
	IconButton,
	Typography,
} from "@mui/material";
import React from "react";

import { getUserLinks } from "../../apis/link";
import { getCurrentUserId } from "../../apis/session";

const mobilePost = () => {
  const links = await getUserLinks(getCurrentUserId());

	return (
		<Card sx={{ margin: "5px", display: { xs: "flex", sm: "none" } }}>
			<CardMedia
				component="img"
				height="5%"
				image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
				alt="Travelling"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{}
					Link: Visited on ______
				</Typography>
			</CardContent>
			<CardActions
				disableSpacing
				sx={{ position: "absolute", bottom: "10px", right: "10px" }}
			>
				<IconButton aria-label="add to favorites">
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite sx={{ color: "red" }} />}
					/>
				</IconButton>
				<IconButton aria-label="share">
					<Share />
				</IconButton>
			</CardActions>
		</Card>
	);
};

const desktopPost = () => {
	return (
		<Card sx={{ margin: "5px", display: { xs: "none", sm: "flex" } }}>
			<CardMedia
				component="img"
				height="5%"
				image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
				alt="Travelling"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Link: _____________ Visited on ______
				</Typography>
			</CardContent>
			<CardActions
				disableSpacing
				sx={{ position: "absolute", bottom: "10px", right: "10px" }}
			>
				<IconButton aria-label="add to favorites">
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite sx={{ color: "red" }} />}
					/>
				</IconButton>
				<IconButton aria-label="share">
					<Share />
				</IconButton>
			</CardActions>
		</Card>
	);
};

const Post = () => {
	return (
		<>
			<button onClick={console.log(links)}>Press me for links</button>
		</>
	);
};

export default Post;
