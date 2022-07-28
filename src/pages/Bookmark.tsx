import { Box, createTheme, PaletteMode, Stack, ThemeProvider } from "@mui/material";
import { getLinks } from "../firebase/database/links";
import { useEffect, useState } from "react";
import { Link } from '../firebase/models/Link';
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import Navbar from "../components/Bookmark/Navbar";
import Post from "../components/Bookmark/Post";
import Preferences from "../components/Bookmark/Preferences";
import LeftBar from "../components/Bookmark/LeftBar";
import RightBar from "../components/Bookmark/RightBar";

const Bookmark = () => {
	// eslint-disable-next-line no-unused-vars
	const [mode, setMode] = useState("light");
	const [links, setLinks] = useState<Link[]>([]);
	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(new Date());
	const [isFav, setIsFav] = useState(false);
	const [sort, setSort] = useState("");
	const [clear, setClear] = useState("");
	const [selectionMode, setSelectionMode] = useState(false);

	useEffect(() => {
		async function fetchData() {
			// initialize by fetching links
			const links = await getLinks();
			if (links === null) {
				console.log("links is null bruh");
				return;
			}
			links.forEach(async (link) => {
				// CORS error. need to find another package to fetch URL preview
				// await getLinkPreview('https://' + link.URL).then((data) => {
				// 	console.log(data);
				// });
			});
			const linksWithSelected : any = links.map((link, index) => ({
				...link,
				index: index,
				isSelected: false,
				display: true,
				// preview: "",
			}));
			setLinks(linksWithSelected);
		}
		fetchData();
	}, []);

	const activateSelectionMode = () => {
		setSelectionMode(true);
	}

	const deactivateSelectionMode = () => {
		setSelectionMode(false);
	}

	const clearAllSelection = () => {
		links.forEach((link : any) => {
			link.isSelected = false;
		});
	}

	const handleSelectAll = () => {
		if (!selectionMode) {
			activateSelectionMode();
			links.forEach((link: any) => {
				link.isSelected = true;
			});
		} else {
			deactivateSelectionMode();
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

	const dualTheme = createTheme({
		palette: {
			mode: mode as PaletteMode,
		},
	});

	// const setSort = (event) => {
	// 	setSort(event.target.value);
	// };

	return (<>
		<ThemeProvider theme={dualTheme}>
			<Box
				bgcolor={"background.default"}
				color={"text.primary"}
				sx={{ m: "-12px", marginRight: "auto" }}
			>
				<Navbar />
				<Preferences
          links={links}
					from={from}
					to={to}
					isFav={isFav}
					sort={sort}
					clear={clear}
          setLinks={setLinks}
					setFrom={setFrom}
					setTo={setTo}
					setIsFav={setIsFav}
					setSort={setSort}
					setClear={setClear}
					handleFilter={() => {console.log("handle filter");}}
					handleSelectAll={handleSelectAll}
				/>
				<Stack direction="row" spacing={2} justifyContent="space-between">
					<LeftBar />
					<Post 
						links={links} 
						sort={sort} 	
						clear={clear} 
						setSort={setSort} 
						theme={() => {console.log("theme");}}
						selectMode={selectionMode}
						activateSelectMode={activateSelectionMode}
						deactivateSelectMode={deactivateSelectionMode}
						clearSelection={clearAllSelection}
					/>
					<RightBar />
				</Stack>
			</Box>
		</ThemeProvider>
		</>
	);
};

export default Bookmark;
