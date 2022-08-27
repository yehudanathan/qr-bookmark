import { CropFree } from "@mui/icons-material";
import { matchSorter } from 'match-sorter';
import {
	alpha,
	AppBar,
	Autocomplete,
	Box,
	InputBase,
	Stack,
	styled,
	Toolbar,
	TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import TemporaryDrawer from "../SideBar";
import React from "react";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	flexWrap: "wrap",
	flexDirection: "column",
	justifyContent: "space-between",
});

const TitleBox = styled(Box)({
	display: "flex",
	alignItems: "center",
});

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "400px",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
	},
  	marginBottom: "15px"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
	"& .MuiAutocomplete-inputRoot": {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.1),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.15),
		},
		width: "400px",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
		},
		color: "inherit",
		'&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
			padding: 2,
			paddingLeft: 30,
			fontFamily: "Product Sans, Montserrat",
			fontSize: "16px",
		},
		"& .MuiOutlinedInput-notchedOutline": {
			border: "none"
		},
		"&:hover .MuiOutlinedInput-notchedOutline": {
			border: "white"
		},
	}
}));

const Navbar = ({ links, handleSearchSubmit }) => {
	const filterOptions = (links, {inputValue}) => matchSorter(links, inputValue);

	return (
		<AppBar sx={{position:"fixed", 
			padding: "30px", 
			paddingTop: "20px", 
			paddingBottom: "20px",
			}}
		>
			<StyledToolbar >
				<div className="bookmark-sidebar">
					<TemporaryDrawer />
				</div>
				<div className="bookmark-navbar">
					<Stack spacing={1} justifyContent="center">
						<TitleBox className="navbar-titlebox" sx={{justifyContent: "center"}}>
							<Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
								<CropFree sx={{ fontSize: "40px" }} />
								<h1 className="bookmark-title">QR-Bookmark</h1>
							</Stack>
						</TitleBox>
						<StyledAutocomplete
							filterOptions={filterOptions}
							freeSolo
							options={links.map(link => link.title)}
							onChange={(e, value) => {
								console.log("🚀 ~ file: Navbar.tsx ~ line 121 ~ Navbar ~ value", value)
								console.log("🚀 ~ file: Navbar.tsx ~ line 129 ~ Navbar ~ e", e)
								if (value === null) {
									console.log("🚀 ~ file: Navbar.tsx ~ line 126 ~ Navbar ~ value === null", value === null)
									window.location.reload();
								} else if (e.type === "keydown" || e.type === "click") {
									handleSearchSubmit(value);
								}
							}}
							renderInput={(params) => 
								<>
									<Stack direction="row" alignItems="center">
										<SearchIconWrapper>
											<SearchIcon />
										</SearchIconWrapper>
										<TextField {...params} 
											placeholder="Search bookmarks…"
										/>
									</Stack>
								</>
							}
						/>
					</Stack>
				</div>
			</StyledToolbar>
		</AppBar>
	);
};

export default Navbar;
