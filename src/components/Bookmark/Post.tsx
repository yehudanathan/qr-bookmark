import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Checkbox,
	Container,
	Grid,
	IconButton,
} from "@mui/material";
import { faker } from '@faker-js/faker';
import { useState } from "react";
import moment from "moment";
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CustomFab from "../CustomFab";
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
// import { getUserLinks } from "../../apis/link";
// import { getCurrentUserId } from "../../apis/session";

const Post = ({links ,sort ,clear ,setSort, theme}) => {
// const isDesktop = useMediaQuery(theme.breakpoints.up("sm")); // return true/false
	const [selectionMode, setSelectionMode] = useState(false);

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

	const activateSelectionMode = () => {
		setSelectionMode(true);
	}

	const deactivateSelectionMode = () => {
		setSelectionMode(false);
	}

	const clearAllSelection = () => {
		// TODO
	}
	
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

	const mockLinks : any = [];
	Array.from({ length: 10 }).forEach((v, index) => mockLinks.push(createRandomLinks(index)));
	
	const handleFab = () => {
		if (selectionMode) {
			return (<>
				<CustomFab 
					color="primary" 
					iconComponent={<CloseIcon sx={{ fontSize: "30px" }} />} 
					onClick={() => {deactivateSelectionMode(); clearAllSelection();}} 
				/>
			</>);
		}
		return (<>
			<CustomFab 
				color="primary" 
				iconComponent={<AddIcon sx={{ fontSize: "30px" }}/>} 
				onClick={() => {alert("Addition in progress! :)")}}
			/>
		</>);
	}

	return (<>
		{/* {isDesktop ? <DesktopPost links={links} /> :	<MobilePost links={links} />} */}
		{/* <MobilePost links={{ alex: "hello" }} /> */}

		<Container sx={{ py: { xs: 4, md: 8 } }} maxWidth="md">
			<Grid container spacing={4}>
				{mockLinks.map((link : any) => (
					<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<div className="checkbox-hover">
							{/* TODO checks whether select mode is enabled, if yes will display all the checkboxes */}
							{/* inspired by outlook */}
							{selectionMode ? 
								<input
									type="checkbox"
									className="active-checkbox"
								/> : <input
									type="checkbox"
									className="link-checkbox"
									onClick={activateSelectionMode}
								/>
							}
						</div>
						<a href={'https://' + link.URL}>
							<CardMedia
								component="img"
								height="65%"
								image="https://boardinggate.com.sg/wp-content/uploads/2016/08/dummy-prod-1.jpg"
								alt="Some alt text"
								/>
						</a>
							<CardContent>
							<h3 className="text-truncate">
								{link.URL}
							</h3>
							<p className="datetime-post">
								visited {moment(link.dateTime).fromNow()}
							</p>
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
						<IconButton aria-label="details" >
							<InfoIcon />
						</IconButton>
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
		{handleFab()}
	</>);
	};

export default Post;
