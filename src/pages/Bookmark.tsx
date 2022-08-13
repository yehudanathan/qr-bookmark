import { Box, createTheme, PaletteMode, Stack, ThemeProvider } from "@mui/material";
import { updateLinks, getLinks, getLinksOrderByTime, getLinksOrderByTitle } from "../firebase/database/links";
import { useEffect, useState } from "react";
// import { Link } from '../firebase/models/Link';
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import Navbar from "../components/Bookmark/Navbar";
import Post from "../components/Bookmark/Post";
import Preferences from "../components/Bookmark/Preferences";
import LeftBar from "../components/Bookmark/LeftBar";
import RightBar from "../components/Bookmark/RightBar";
import moment from "moment";
// import update from 'react-addons-update';

const Bookmark = () => {
	// eslint-disable-next-line no-unused-vars
	const [mode, setMode] = useState("light");
	const [links, setLinks] = useState<any[]>([]);
	const [selected, setSelected] = useState<boolean[]>([]);
	const [favorite, setFavorite] = useState<boolean[]>([]);
	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(new Date());
	const [sort, setSort] = useState("");
	const [clear, setClear] = useState("");
	const [selectionMode, setSelectionMode] = useState(selected.includes(true));
	const [selectAll, setSelectAll] = useState(selected.every((value) => value === true) && selected.length !== 0);
	const [openAddLinkDialog, setOpenAddLinkDialog] = useState(false);
	const [openQrReader, setOpenQrReader] = useState(false);
	const [displayInfo, setDisplayInfo] = useState<boolean[]>([]);

	useEffect(() => {
		async function fetchData() {
			// initialize by fetching links
			const links = await getLinks();
			
			if (links === null) {
				console.log("links is null bruh");
				return;
			}
			
			const newData : any = Object.values(links)
			.filter((link) => link.isDeleted !== true)
			.map((link, index) => (
				{
					...link,
					index: index,
				}
			));
			setLinks(newData);

			const selectedArray : boolean[] = [];
			const favoriteArray : boolean[] = [];
			const displayInfoArray : boolean[] = [];

			newData.forEach((link) => {
				selectedArray.push(false);
				favoriteArray.push(link.favorite);
				displayInfoArray.push(false);
			});
			setSelected(selectedArray);
			setFavorite(favoriteArray);
			setDisplayInfo(displayInfoArray);
		}
		fetchData();
	}, []);

	const activateSelectionMode = () => {
		setSelectionMode(true);
	}

	const deactivateSelectionMode = () => {
		setSelectionMode(false);
	}

	const setSelect = (index) => {
		const updatedSelected = [...selected.slice(0, index), !selected.at(index), ...selected.slice(index + 1)];
		setSelected(updatedSelected);
	}

	const handleFavorite =  async (linkIndex) => {
		const getCurrentFav = favorite[linkIndex];
		const updatedLinks = links.filter((link) => linkIndex === link.index).map((link) => ({
			...link,
			favorite: !getCurrentFav,
		}));

		const newLinks = [...links.slice(0, linkIndex), updatedLinks[0], ...links.slice(linkIndex + 1)];
		
		const newFavorite = newLinks.map(link => link.favorite);
		const newSelected : boolean[] = [];
		newLinks.forEach((link) => {
			newSelected.splice(link.index, 1, false);
		});
		
		const response = await updateLinks(updatedLinks);
		if (response === true) {
			setLinks(newLinks);
			setSelected(newSelected);
			setFavorite(newFavorite);
		} else {
			alert("Error with favorite button");
		}
	}

	const clearAllSelection = () => {
		const length = selected.length;
		const newSelected = new Array(length).fill(false);

		setSelected(newSelected);
	}

	const handleSelectAll = () => {
		if (!selectionMode) {
			activateSelectionMode();
			const length = selected.length;
			const newSelected = new Array(length).fill(true);

			setSelected(newSelected);
		} else {
			deactivateSelectionMode();
			clearAllSelection();
		}
		
	}

	const deleteLink = async (linkIndex) => {
		const linkToDelete = links.filter((link) => linkIndex.includes(link.index)).map((link) => ({
			...link,
			isDeleted: true,
		}));
				
		const newLinks = links.filter((link) => !linkIndex.includes(link.index));
		newLinks.concat(linkToDelete);

		const newFavorite = newLinks.map((link) => link.favorite);
		const newSelected : boolean[] = [];
		newLinks.forEach((link) => {
			newSelected.splice(link.index, 1, false);
		});
		
		const response = await updateLinks(linkToDelete);
		
		if (response === true) {
			setLinks(newLinks);
			setSelected(newSelected);
			setFavorite(newFavorite);
			alert("Deletion complete");
		} else {
			alert("Deletion error");
		}
	}

	// const linksWithIndex = links.map((link, index) => ({ ...link, index }));
	// // link = {url:..., title:..., index:....}

	// const handleSelect = (el) => {
	// 	const newIsSelected = !el.isSelected;
	// 	const indexToReplace = el.index;
	// 	// 1
	// 	const filteredLinks = links.filter((el, i) => i !== indexToReplace); // links without link yg pny index itu
	// 	const newLinks = [...filteredLinks, { ...el, isSelected: newIsSelected }];
	// 	setLinks(newLinks);
	// 	// // 2
	// 	// links[indexToReplace] = { ...el, isSelected: newIsSelected };
	// 	// setLinks(links);
	// };


	// const setSort = () => {
	// 	const newLinks = await getLinks(orderByTime);
	// 	setLinks(newLinks);
	// };

	// alvin
	// const setSort = async () => {
	// 	const newLinks = await getLinks(orderByTime);
	// 	setLinks(newLinks);
	// };

	const sortBy = async (category) => {
		const newLinks = await getLinks();
		if (newLinks === null) {
			console.log("links is null bruh");
			return;
		}
		const newData : any = Object.values(newLinks).map((link, index) => (
			{
				...link,
				index: index,
			}
		)).sort(function (firstLink: any, secondLink: any) { 
			const firstDate = new Date(firstLink.dateTime); 
			const secondDate = new Date(secondLink.dateTime);
			if (category === 'Oldest') {
				return +firstDate - +secondDate as number;
			}
				return +secondDate - +firstDate as number;
		});
		console.log("🚀 ~ file: Bookmark.tsx ~ line 278 ~ sortBy ~ newData", newData)
		setLinks(newData);
		return true;
	}

	const dualTheme = createTheme({
		palette: {
			mode: mode as PaletteMode,
		},
	});

	return (<>
	<div className="bookmark-div">
		<ThemeProvider theme={dualTheme}>
			<Box
				bgcolor={"background.default"}
				color={"text.primary"}
			>
				<Navbar />
				<Preferences
          links={links}
					selected={selected}
					favorite={favorite}
					from={from}
					to={to}
					sort={sort}
					clear={clear}
          setLinks={setLinks}
					setFrom={setFrom}
					setTo={setTo}
					setFavorite={setFavorite}
					setSort={setSort}
					sortBy={sortBy}
					setClear={setClear}
					handleFilter={() => {console.log("handle filter");}}
					allSelected={selectAll}
					setSelectAll={setSelectAll}
					handleSelectAll={handleSelectAll}
					clearSelection={clearAllSelection}
					selectionMode={selectionMode}
					activateSelectionMode={activateSelectionMode}
					deactivateSelectionMode={deactivateSelectionMode}
				/>
				<Stack direction="row" spacing={2} justifyContent="space-between">
					<LeftBar />
					<Post 
						links={links} 
						favorite={favorite}
						handleFavorite={handleFavorite}
						sort={sort} 	
						clear={clear} 
						setSort={setSort} 
						theme={() => {console.log("theme");}}
						selectMode={selectionMode}
						activateSelectMode={activateSelectionMode}
						deactivateSelectMode={deactivateSelectionMode}
						clearSelection={clearAllSelection}
						allSelected={selectAll}
						handleSelectAll={handleSelectAll}
						setSelectAll={setSelectAll}
						setSelect={setSelect}
						selected={selected}
						openAddLinkDialog={openAddLinkDialog}
						setOpenAddLinkDialog={setOpenAddLinkDialog}
						openQrReader={openQrReader}
						setOpenQrReader={setOpenQrReader}
						deleteLink={deleteLink}
						displayInfo={displayInfo}
						setDisplayInfo={setDisplayInfo}
					/>
					<RightBar />
				</Stack>
			</Box>
		</ThemeProvider>
	</div>
	</>
	);
};

export default Bookmark;
