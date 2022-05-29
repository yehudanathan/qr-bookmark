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


const Post = () => {
	return (
		<Card sx={{ margin: "5px"}}>
			<CardMedia
				component="img"
				height="20%"
				image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
				alt="Travelling"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					This impressive paella is a perfect party dish and a fun meal to cook
					together with your guests. Add 1 cup of frozen peas along with the
					mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
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

export default Post;
