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
import { Link } from "../../firebase/models/Link";
import moment from "moment";
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomFab from "../CustomFab";
// for MOCK DATA below
// import { getUserLinks } from "../../apis/link";
// import { getCurrentUserId } from "../../apis/session";

const Post = ({ 
	links,
	sort, 
	clear, 
	setSort, 
	theme, 
	selectMode,
	activateSelectMode,
	deactivateSelectMode,
	clearSelection,
	handleSelectAll,
	allSelected
}) => {
	// const isDesktop = useMediaQuery(theme.breakpoints.up("sm")); // return true/false

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
	
	// function createRandomLinks(index) {
	// 	return {
	// 		title: faker.word.adjective()	,
	// 		URL: faker.internet.domainName(),
	// 		dateTime:faker.date.past(),
	// 		favorite:false,
	// 		userID:index,
	// 		index: index,
	// 		isSelected: false,
	// 		display: true
	// 	};
	// }

	// const mockLinks : any = [];
	// Array.from({ length: 10 }).forEach((v, index) => mockLinks.push(createRandomLinks(index)));
	
	const handleFab = () => {
		if (selectMode) {
			return (<>
				<CustomFab
					color="" // TODO...
					iconComponent={<DeleteIcon sx={{ fontSize: "30px" }} />}
					onClick={() => {alert("Delete bookmarks in progress")}}
					style={{
						minWidth: "70px",
						minHeight: "70px",
						margin: "0px",
						top: "auto",
						right: "110px",
						bottom: "20px",
						left: "auto",
						position: "fixed",
					}}
				/>
				<CustomFab 
					color="primary" 
					iconComponent={<CloseIcon sx={{ fontSize: "30px" }} />} 
					onClick={() => {deactivateSelectMode(); clearSelection();}} 
					style={{
						minWidth: "70px",
						minHeight: "70px",
						margin: "0px",
						top: "auto",
						right: "20px",
						bottom: "20px",
						left: "auto",
						position: "fixed",
					}}
				/>
			</>);
		}
		return (<>
			<CustomFab 
				color="primary" 
				iconComponent={<AddIcon sx={{ fontSize: "30px" }}/>} 
				onClick={() => {alert("Addition in progress! :)")}}
				style={{
					minWidth: "70px",
					minHeight: "70px",
					margin: "0px",
					top: "auto",
					right: "20px",
					bottom: "20px",
					left: "auto",
					position: "fixed",
				}}
			/>
		</>);
	}

	return (<>
		{/* {isDesktop ? <DesktopPost links={links} /> :	<MobilePost links={links} />} */}
		{/* <MobilePost links={{ alex: "hello" }} /> */}

		<Container sx={{ py: { xs: 4, md: 8 } }} maxWidth="md">
			<Grid container spacing={4}>
				{links.map((link : any) => (
					<Grid item xs={12} sm={6} md={4} sx={{ height: "450px" }}>
					<Card
						sx={{
							height: "100%",
							margin: "5px",
							position: "relative",
						}}
					>
						<div className="checkbox-hover">
							{selectMode ? 
								<input
									type="checkbox"
									className="active-checkbox"
									value={link.isSelected}
									onClick={() => {
										link.isSelected = !link.isSelected;
										if (allSelected()) {
											handleSelectAll();
										} else {
											clearSelection();
										}
									}}
								/> : <input
									type="checkbox"
									className="link-checkbox"
									onClick={() => {
										activateSelectMode(); 
										link.isSelected = !link.isSelected;
										if (allSelected()) {
											handleSelectAll();
										} else {
											clearSelection();
										}
									}}
									value={link.isSelected}
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
								{link.title}
							</h3>
							<p className="datetime-post">
								saved {moment(link.dateTime).fromNow()}
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
