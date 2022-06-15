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
	Container,
	Grid,
	IconButton,
	styled,
	Typography,
	useMediaQuery,
} from "@mui/material";
import React from "react";

import { getUserLinks } from "../../apis/link";
import { getCurrentUserId } from "../../apis/session";

// Box for small device
// const MobileBox = styled(Box)(({ theme }) => ({
// 	marginBottom: "5px",
// 	justifyContent: "center",
// }));

let num = 1;

const MobilePost = () => {
	// const links = await getUserLinks(getCurrentUserId());
	return (
		// <MobileBox>
		<Container sx={{ py: { xs: 4, md: 8 }, ml:"-16px"}} maxWidth="md">
			{/* {arrUserLinks.map((userLink) => (
          <Card sx={{ margin: "5px", position:"relative" }}>
            <CardMedia
              component="img"
              height="5%"
              image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
              alt={userLink.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {`Link: ${userLink.URL}`}
                {`Visited on ${userLink.dateTime}`}
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
        ))} */}
			{/* working dummy below */}
			<Card
				sx={{
					height: "450px",
					mx: "5px",
					mb: "15px",
					position: "relative",
				}}
			>
				<CardMedia
					component="img"
					height="65%"
					image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
					alt="Some alt text"
				/>
				<CardContent>
					<Typography color="text.secondary" sx={{ fontSize: 18, mb: "10px" }}>
						Link: -------
					</Typography>
					<Typography color="text.secondary" sx={{ fontSize: 18 }}>
						Visited on -------
					</Typography>
				</CardContent>
				<CardActions
					disableSpacing
					sx={{ position: "absolute", bottom: "0px", right: "5px", p: "0px" }}
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
			<Card
				sx={{
					height: "450px",
					mx: "5px",
					mb: "15px",
					position: "relative",
				}}
			>
				<CardMedia
					component="img"
					height="65%"
					image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
					alt="Some alt text"
				/>
				<CardContent>
					<Typography color="text.secondary" sx={{ fontSize: 18, mb: "10px" }}>
						Link: -------
					</Typography>
					<Typography color="text.secondary" sx={{ fontSize: 18 }}>
						Visited on -------
					</Typography>
				</CardContent>
				<CardActions
					disableSpacing
					sx={{ position: "absolute", bottom: "0px", right: "5px", p: "0px" }}
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
			<Card
				sx={{
					height: "450px",
					mx: "5px",
					mb: "15px",
					position: "relative",
				}}
			>
				<CardMedia
					component="img"
					height="65%"
					image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
					alt="Some alt text"
				/>
				<CardContent>
					<Typography color="text.secondary" sx={{ fontSize: 18, mb: "10px" }}>
						Link: -------
					</Typography>
					<Typography color="text.secondary" sx={{ fontSize: 18 }}>
						Visited on -------
					</Typography>
				</CardContent>
				<CardActions
					disableSpacing
					sx={{ position: "absolute", bottom: "0px", right: "5px", p: "0px" }}
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
		</Container>
		// </MobileBox>
	);
};

// // Box for big devices
// const DesktopBox = styled(Box)(({ theme }) => ({
// 	flexWrap: "wrap",
// 	gap: "10px",
// 	justifyContent: "center",
// }));

const DesktopPost = ({ arrUserLinks }) => {
	return (
		// <DesktopBox>
		<Container sx={{ py: { xs: 4, md: 8 } }} maxWidth="md">
			<Grid container spacing={4}>
				{/* Actual code below */}
				{/* {arrUserLinks.map((userLink) => (
          <Grid
					item
					key={userLink}
					xs={12}
					sm={6}
					md={4}
					sx={{ height: "450px" }}
				>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<CardMedia
							component="img"
							height="65%"
							image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
							alt={userLink.title}
						/>
						<CardContent>
							<Typography color="text.secondary" sx={{ fontSize: 18, mb:"10px" }}>
              {`Link: ${userLink.URL}`}
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
              {`Visited on ${userLink.dateTime}`}
							</Typography>
						</CardContent>
						<CardActions
							disableSpacing
							sx={{ position: "absolute", bottom: "0px", right: "5px", p: "0px" }}
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
				</Grid>
        ))} */}
				{/* working dummy below */}
				<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<CardMedia
							component="img"
							height="65%"
							image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
							alt="Some alt text"
						/>
						<CardContent>
							<Typography
								color="text.secondary"
								sx={{ fontSize: 18, mb: "10px" }}
							>
								Link: -------
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
								Visited on -------
							</Typography>
						</CardContent>
						<CardActions
							disableSpacing
							sx={{
								position: "absolute",
								bottom: "0px",
								right: "5px",
								p: "0px",
							}}
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
				</Grid>
				<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<CardMedia
							component="img"
							height="65%"
							image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
							alt="Some alt text"
						/>
						<CardContent>
							<Typography
								color="text.secondary"
								sx={{ fontSize: 18, mb: "10px" }}
							>
								Link: -------
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
								Visited on -------
							</Typography>
						</CardContent>
						<CardActions
							disableSpacing
							sx={{
								position: "absolute",
								bottom: "0px",
								right: "5px",
								p: "0px",
							}}
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
				</Grid>
				<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<CardMedia
							component="img"
							height="65%"
							image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
							alt="Some alt text"
						/>
						<CardContent>
							<Typography
								color="text.secondary"
								sx={{ fontSize: 18, mb: "10px" }}
							>
								Link: -------
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
								Visited on -------
							</Typography>
						</CardContent>
						<CardActions
							disableSpacing
							sx={{
								position: "absolute",
								bottom: "0px",
								right: "5px",
								p: "0px",
							}}
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
				</Grid>
				<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<CardMedia
							component="img"
							height="65%"
							image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
							alt="Some alt text"
						/>
						<CardContent>
							<Typography
								color="text.secondary"
								sx={{ fontSize: 18, mb: "10px" }}
							>
								Link: -------
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
								Visited on -------
							</Typography>
						</CardContent>
						<CardActions
							disableSpacing
							sx={{
								position: "absolute",
								bottom: "0px",
								right: "5px",
								p: "0px",
							}}
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
				</Grid>
				<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<CardMedia
							component="img"
							height="65%"
							image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
							alt="Some alt text"
						/>
						<CardContent>
							<Typography
								color="text.secondary"
								sx={{ fontSize: 18, mb: "10px" }}
							>
								Link: -------
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
								Visited on -------
							</Typography>
						</CardContent>
						<CardActions
							disableSpacing
							sx={{
								position: "absolute",
								bottom: "0px",
								right: "5px",
								p: "0px",
							}}
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
				</Grid>
				<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<CardMedia
							component="img"
							height="65%"
							image="https://images.pexels.com/photos/11943236/pexels-photo-11943236.jpeg?cs=srgb&dl=pexels-stephen-tam-11943236.jpg&fm=jpg"
							alt="Some alt text"
						/>
						<CardContent>
							<Typography
								color="text.secondary"
								sx={{ fontSize: 18, mb: "10px" }}
							>
								Link: -------
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
								Visited on -------
							</Typography>
						</CardContent>
						<CardActions
							disableSpacing
							sx={{
								position: "absolute",
								bottom: "0px",
								right: "5px",
								p: "0px",
							}}
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
				</Grid>
			</Grid>
		</Container>
		// </DesktopBox>
	);
};

// const arrUserLinks = await getUserLinks(getCurrentUserId());

const Post = (theme) => {
	// const isDesktop = useMediaQuery(theme.breakpoints.up("sm")); // return true/false

	return (
		<>
			{/* <button onClick={console.log(links)}>Press me for links</button> */}
			{/* {isDesktop === true ? (
				<DesktopPost arrUserLinks={arrUserLinks} />
			) : (
				<MobilePost arrUserLinks={arrUserLinks} />
			)} */}
			{/* <DesktopPost arrUserLinks={{ alex: "hello" }} /> */}
			<MobilePost arrUserLinks={{ alex: "hello" }} />
		</>
	);
};

export default Post;
