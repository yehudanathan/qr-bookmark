import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Checkbox,
	Container,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import { faker } from '@faker-js/faker';
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
// import moment from "moment";

// import { getUserLinks } from "../../apis/link";
// import { getCurrentUserId } from "../../apis/session";

const DesktopPost = ({links ,sort ,clear ,setSort}) => {
	// const cards = linksWithIndex.map(el => {
	// 	return (
	// 		<Card>
	// 			{el.url}
	// 			{el.title}
	// 			{el.isSelected}
	// 			<button onClick={() => handleSelect(el)} />
	// 		</Card>
	// 	)
	// })

  function createRandomLinks(index) {
    return {
      title: faker.word.adjective()	,
      URL: faker.internet.domainName(),
      dateTime:faker.date.past(),
      favorite:false,
      userID:index,
      index: index,
      isSelected: false,
      display: true
    };
  }

  const mockLinks = [];
  Array.from({ length: 10 }).forEach((v, index) => {
    mockLinks.push(createRandomLinks(index));
  });

	return (
		<Container sx={{ py: { xs: 4, md: 8 } }} maxWidth="md">
			<Grid container spacing={4}>
				{/* Actual code below */}
				{/* {links.map((userLink) => (
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
				{/* <Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<Box
							sx={{
								position: "absolute",
								display: "block",
								width: "100%",
								height: "100%",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "rgba(0,0,0,0.15)",
								zIndex: 2,
							}}
						>
							<input
								type="checkbox"
								className="checkbox"
								id="check1"
								check="false"
								style={{
									position: "absolute",
									display: clear === "Select" ? "block" : "none",
									top: "5px",
									right: "5px",
									width: "20px",
									height: "20px",
								}}
							/>
						</Box>
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
				</Grid> */}
        {/* working testing below */}
        {mockLinks.map((link) => (<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<Box
							sx={{
								position: "absolute",
								display: "block",
								width: "100%",
								height: "100%",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "rgba(0,0,0,0.15)",
								zIndex: 2,
							}}
						>
							<input
								type="checkbox"
								className="checkbox"
								id="check1"
								check="false"
								style={{
									position: "absolute",
									display: clear === "Select" ? "block" : "none",
									top: "5px",
									right: "5px",
									width: "20px",
									height: "20px",
								}}
							/>
						</Box>
						<CardMedia
							component="img"
							height="65%"
							image="https://boardinggate.com.sg/wp-content/uploads/2016/08/dummy-prod-1.jpg"
							alt="Some alt text"
						/>
						<CardContent>
							<Typography
								color="text.secondary"
								sx={{ fontSize: 18, mb: "10px" }}
							>
								Link: {link.URL}
							</Typography>
							<Typography color="text.secondary" sx={{ fontSize: 18 }}>
								Visited on {moment(link.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
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
				</Grid>))}
			</Grid>
		</Container>
	);
};

const Post = ({links ,sort ,clear ,setSort, theme}) => {
	// const isDesktop = useMediaQuery(theme.breakpoints.up("sm")); // return true/false

	return (
		<>
			{/* <button onClick={console.log(links)}>Press me for links</button> */}
			{/* {isDesktop === true ? (
				<DesktopPost links={links} />
			) : (
				<MobilePost links={links} />
			)} */}
			<DesktopPost links={links} sort={sort} clear={clear} setSort={setSort} />
			{/* <MobilePost links={{ alex: "hello" }} /> */}
		</>
	);
};

export default Post;
