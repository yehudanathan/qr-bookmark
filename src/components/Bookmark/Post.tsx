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
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CustomFab from "../CustomFab";
import InfoDialog from "./InfoDialog";
import AddLinkDialog from "./AddLinkDialog";
import moment from "moment";
import QRScanner from "../QRScanner";
// for MOCK DATA below
// import { getUserLinks } from "../../apis/link";
// import { getCurrentUserId } from "../../apis/session";

const Post = ({ 
	links,
	favorite,
	sort, 
	clear, 
	setSort, 
	theme, 
	selectMode,
	activateSelectMode,
	deactivateSelectMode,
	clearSelection,
	allSelected,
	handleSelectAll,
	setSelectAll,
	setSelect,
	selected,
	openAddLinkDialog,
	setOpenAddLinkDialog,
	openQrReader,
	setOpenQrReader,
	deleteLink
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

	// const linkPreview = async (url) => {
	// 	const fallbackImage =  "https://cdn-icons-png.flaticon.com/512/3214/3214746.png";
	// 	try {
	// 		const response = await fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`);
	// 		const json = await response.json();
	// 		const metadata = json.metadata;
	// 		if (metadata.image === null || metadata === null) {
	// 			console.log("error catched, in try block")
	// 			return fallbackImage;
	// 		}
	// 		return metadata.image;
	// 	} catch (error) {
	// 		console.log("error catched")
	// 		return fallbackImage;
	// 	}
	// }
	
	const redirectLink = (url) => {
		if (url.startsWith("http")) {
			return url;
		}
		return "https://" + url;
	}

	const handleDeleteLink = async () => {
		const indexToDelete : number[] = [];
		selected.map((value, index) => {
			if (value === true) {
				indexToDelete.push(index);
			}
		});

		deleteLink(indexToDelete);
	}

	const handleFab = () => {
		if (selectMode) {
			return (<>
				<CustomFab
					color="" // TODO...
					iconComponent={<DeleteIcon sx={{ fontSize: "30px" }} />}
					onClick={handleDeleteLink}
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
					onClick={() => {deactivateSelectMode(); clearSelection(); setSelectAll(false)}} 
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
				color="" // TODO
				iconComponent={<AddAPhotoIcon sx={{ fontSize: "30px" }}/>} 
				onClick={() => {setOpenQrReader(true);}}
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
				iconComponent={<AddIcon sx={{ fontSize: "30px" }}/>} 
				onClick={() => {setOpenAddLinkDialog(true);}}
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

		
		<QRScanner open={openQrReader} setOpen={setOpenQrReader}/>
		<AddLinkDialog open={openAddLinkDialog} handleClose={() => {setOpenAddLinkDialog(false);}} />
		<Container sx={{ paddingTop: "30px" }} maxWidth="md" >
			<Grid container spacing={4} sx={{paddingBottom: "50px"}} >
				{links.filter((link) => link.isDeleted !== true).map((link) => {
					// const getLinkPreview = await linkPreview(link.URL);
					return (<>
						<Grid item xs={12} sm={6} md={4} sx={{ height: "300px" }}>
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
										checked={selected[link.index] ?? false}
										onClick={() => {
											setSelect(link.index);
										}}
									/> : <input
										type="checkbox"
										className="link-checkbox"
										checked={selected[link.index] ?? false}
										onClick={() => {
											activateSelectMode(); 
											setSelect(link.index);
										}}
									/>
								}
							</div>
								<a href={redirectLink(link.URL)}>
									<div className="media-background"></div>
									<CardMedia
										component="img"
										sx={{width: "20%",
											height: "auto", 
											objectFit: "cover",
											opacity: "60%",
											position: "absolute",
											top: "15%",
											left: "40%",
										}}
										height="30%"
										image={"https://cdn-icons-png.flaticon.com/512/3214/3214746.png"}
										alt="Some alt text"
										/>
										{/* <img src={getLinkPreview} alt="URL"></img> */}
									{/* <LinkPreview url={link.URL}/> */}
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
							<IconButton 
								aria-label="details" 
								onClick={() => {
									// handle open and close dialog
								}}
							>
								<InfoIcon />
							</IconButton>
								<IconButton aria-label="add to favorites">
									<Checkbox
										icon={<FavoriteBorder />}
										checkedIcon={<Favorite sx={{ color: "red" }} />}
										checked={favorite[link.index] ?? false}
										onClick={() => alert("favorite feature IP")}
									/>
								</IconButton>
								<IconButton aria-label="share">
									<Share />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
					<InfoDialog
						displayDialog={false}
						handleCloseDialog={() => {alert("inprogress")}}
						title={link.title}
						URL={link.URL}
						dateTime={link.dateTime}
					/>
					</>)
				})}
			</Grid>
		</Container>
		{handleFab()}
	</>);
	};

export default Post;
