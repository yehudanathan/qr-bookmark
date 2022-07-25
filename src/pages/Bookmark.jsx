import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Bookmark/Navbar";
import Post from "../components/Bookmark/Post";
import Preferences from "../components/Bookmark/Preferences";
import LeftBar from "../components/Bookmark/LeftBar";
import RightBar from "../components/Bookmark/RightBar";
import { getLinks } from "../firebase/database/links";

const Bookmark = () => {
	// eslint-disable-next-line no-unused-vars
	const [mode, setMode] = useState("light");
	const [links, setLinks] = useState([]);
	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(new Date());
	const [isFav, setIsFav] = useState(false);
	const [sort, setSort] = useState("");
	const [clear, setClear] = useState("");

	useEffect(() => {
		async function fetchData() {
			// initialize by fetching links
			const links = await getLinks();
			if (links === null) {
				console.log("links is null bruh");
				return;
			}
			const linksWithSelected = links.map((link, index) => ({
				...link,
				index: index,
				isSelected: false,
				display: true,
			}));
			setLinks(linksWithSelected);
		}
		fetchData();
	}, []);

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
			mode: mode,
		},
	});

	// const setSort = (event) => {
	// 	setSort(event.target.value);
	// };

	return (
		<ThemeProvider theme={dualTheme}>
			<Box
				bgcolor={"background.default"}
				color={"text.primary"}
				sx={{ m: "-12px" }}
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
				/>
				<Stack direction="row" spacing={2} justifyContent="space-between">
					<LeftBar />
					<Post links={links} sort={sort} clear={clear} setSort={setSort} />
					<RightBar />
				</Stack>
			</Box>
		</ThemeProvider>
	);
};

export default Bookmark;
