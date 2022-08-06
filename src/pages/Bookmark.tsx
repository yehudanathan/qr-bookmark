import { Box, createTheme, PaletteMode, Stack, ThemeProvider } from "@mui/material";
import { deleteLinks, getLinks, getLinksOrderByTitle } from "../firebase/database/links";
import { useEffect, useState } from "react";
// import { Link } from '../firebase/models/Link';
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import Navbar from "../components/Bookmark/Navbar";
import Post from "../components/Bookmark/Post";
import Preferences from "../components/Bookmark/Preferences";
import LeftBar from "../components/Bookmark/LeftBar";
import RightBar from "../components/Bookmark/RightBar";

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

	useEffect(() => {
		async function fetchData() {
			// initialize by fetching links
			const links = await getLinks();
			
			if (links === null) {
				console.log("links is null bruh");
				return;
			}
			
			const newData : any = Object.values(links).map((link, index) => (
				{
					...link,
					index: index,
				}
			));
      // console.log("🚀 ~ file: Bookmark.tsx ~ line 42 ~ fetchData ~ newData", newData)
			setLinks(newData);

			const selectedArray : boolean[] = [];
			const favoriteArray : boolean[] = [];

			newData.forEach((link) => {
				selectedArray.push(false);
				favoriteArray.push(link.favorite);
			});
			setSelected(selectedArray);
			setFavorite(favoriteArray);
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
		// Draft 1
		// if (dataArray) {
		// 	const newData : any = dataArray;
		// 	const currentSelect = dataArray[index]["isSelected"];
		// 	newData[index]["isSelected"] = !currentSelect;
		// 	setDataArray(newData);
		// }

		// Draft 2
		// const currentState = links.filter((link) => link.index === index).map((link) => link.isSelected)[0];	
		// const newLink = links.filter((link) => link.index === index).map((link) =>
		// 	({
		// 		...link,
		// 		isSelected: !currentState,
		// 	})
		// );

		// const remainingLinks = links.filter((link) => link.index !== index);
		// const updatedLinks = [...remainingLinks.slice(0, index), newLink[0], ...remainingLinks.slice(index)];
    // console.log("🚀 ~ file: Bookmark.tsx ~ line 79 ~ setSelect ~ updatedLinks", updatedLinks)

		const updatedSelected = [...selected.slice(0, index), !selected.at(index), ...selected.slice(index + 1)];
		setSelected(updatedSelected);
	}

	const clearAllSelection = () => {
		// const newLinks = [];
		// links.forEach((link) =>
		// 	newLinks.concat({
		// 		...link,
		// 		isSelected: false,
		// 	})
		// );

		// const newLinks : any[] = [];
		// links.forEach((link) => {
			// 	newLinks.push({
				// 		...link,
				// 		isSelected: false,
		// 	})
		// });

		// Newest Draft
		// const newLinks = links.map((link) => {
		// 	if (link.isSelected === true) {
		// 		return ({
		// 		...link,
		// 		isSelected: false
		// 		})
		// 	}
		// 	return link;
		// });

		const length = selected.length;
		const newSelected = new Array(length).fill(false);

		setSelected(newSelected);
	}

	const handleSelectAll = () => {
		if (!selectionMode) {
			activateSelectionMode();
			// const theLink = links.map((link) => Object.assign({}, link));
			// theLink.forEach((link) => link.isSelected = true);
			
			// setLinks(theLink);

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
		
		const response = await deleteLinks(linkToDelete);
		
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
		if (category === 'Oldest') {
			const newLinks = await getLinksOrderByTitle();
      console.log("🚀 ~ file: Bookmark.tsx ~ line 204 ~ sortBy ~ newLinks", newLinks)
			if (newLinks === null) {
				console.log("links is null bruh");
				return;
			} else {
				const newData : any = Object.values(newLinks).map((link, index) => (
					{
						...link,
						index: index,
					}
				));
				// console.log("🚀 ~ file: Bookmark.tsx ~ line 42 ~ fetchData ~ newData", newData)
				setLinks(newData);
				return true;
			}
		} else { // Newest
		}
	}

	const dualTheme = createTheme({
		palette: {
			mode: mode as PaletteMode,
		},
	});

	// const setSort = (event) => {
	// 	setSort(event.target.value);
	// };

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
