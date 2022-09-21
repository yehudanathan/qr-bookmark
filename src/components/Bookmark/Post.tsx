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
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CustomFab from "../CustomFab";
import InfoDialog from "./InfoDialog";
import AddLinkDialog from "./AddLinkDialog";
import QrScanner from "../QrScanner";
import moment from "moment";

const Post = ({
	links,
	favorite,
	handleFavorite,
	selectMode,
	activateSelectMode,
	deactivateSelectMode,
	clearSelection,
	setSelectAll,
	setSelect,
	selected,
	openAddLinkDialog,
	setOpenAddLinkDialog,
	openQrReader,
	setOpenQrReader,
	deleteLink,
	displayInfo,
	setDisplayInfo,
}) => {
	// const isDesktop = useMediaQuery(theme.breakpoints.up("sm")); // return true/false

	const redirectLink = (url) => {
		if (url.startsWith("http")) {
			return url;
		}
		return "https://" + url;
	}

	const handleDeleteLink = async () => {
		const indexToDelete: number[] = [];
		selected.map((value, index) =>
			(value === true ? indexToDelete.push(index) : "")
		);

		deleteLink(indexToDelete);
	}

	const handleShare = (linkIndex) => {
		const linkOfInterest = links.filter((link) => link.index === linkIndex)[0];
		const URL = linkOfInterest.URL;
		const title = linkOfInterest.title;
		const text = title + '\n' + URL;
		navigator.clipboard.writeText(text).then(() => {
			alert("Copied to clipboard!");
		})
	}

	const handleDisplay = (linkIndex) => {
		const currentState = displayInfo[linkIndex];
		const newDisplayInfo = [...displayInfo.slice(0, linkIndex), !currentState, ...displayInfo.slice(linkIndex + 1)];
		setDisplayInfo(newDisplayInfo);
	}

	const handleFab = () => {
		if (selectMode) {
			return (
				<div>
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
						onClick={() => { deactivateSelectMode(); clearSelection(); setSelectAll(false) }}
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
				</div>
			);
		}
		return (
			<div>
				<CustomFab
					color="" // TODO
					iconComponent={<AddAPhotoIcon sx={{ fontSize: "30px" }} />}
					onClick={() => { setOpenQrReader(true); }}
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
					iconComponent={<AddIcon sx={{ fontSize: "30px" }} />}
					onClick={() => { setOpenAddLinkDialog(true); }}
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
			</div>
		);
	}

	return (
		<div>
			{/* {isDesktop ? <DesktopPost links={links} /> :	<MobilePost links={links} />} */}
			<QrScanner open={openQrReader} setOpen={setOpenQrReader} />
			<AddLinkDialog open={openAddLinkDialog} handleClose={() => { setOpenAddLinkDialog(false); }} />
			<Container sx={{ paddingTop: "30px" }} maxWidth="md" >
				<Grid container spacing={4} sx={{ paddingBottom: "50px" }} >
					{links.length === 0 ?
						<>
							<div className="empty-link">
								<h3 className="empty">No links to display.</h3>
							</div>
						</> :
						links.filter((link) => link.isDeleted !== true)
							.map((link) => {
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
													sx={{
														width: "20%",
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
													onClick={() => handleDisplay(link.index)}
												>
													<InfoIcon />
												</IconButton>
												<IconButton aria-label="add to favorites">
													<Checkbox
														icon={<FavoriteBorder />}
														checkedIcon={<Favorite sx={{ color: "red" }} />}
														checked={favorite[link.index] ?? false}
														onChange={() => handleFavorite(link.index)}
													/>
												</IconButton>
												<IconButton
													aria-label="share"
													onClick={() => handleShare(link.index)}
												>
													<Share />
												</IconButton>
											</CardActions>
										</Card>
									</Grid>
								</>)
							})}
					{displayInfo.map((value, index) => {
						const currentLink = links.filter((link) => link.index === index)[0];
						return (
							<InfoDialog
								displayDialog={value}
								handleCloseDialog={() => handleDisplay(index)}
								title={currentLink.title}
								URL={currentLink.URL}
								dateTime={currentLink.dateTime}
							/>
						);
					})}
				</Grid>
			</Container>
			{handleFab()}
		</div>
	);
};

export default Post;
