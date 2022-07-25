import { CropFree } from "@mui/icons-material";
import {
	alpha,
	AppBar,
	Box,
	InputBase,
	Menu,
	MenuItem,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	flexWrap: "wrap",
	flexDirection: "column",
	justifyContent: "space-between",
});

const TitleBox = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	margin: "15px 10px 10px 10px",
});

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "50%",
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

const Navbar = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<AppBar sx={{position:"sticky", margin: "0px"}}>
			<StyledToolbar>
				<TitleBox>
					<CropFree sx={{ fontSize: "40px" }} />
					<Typography variant="h4">QR-Bookmark</Typography>
				</TitleBox>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ "aria-label": "search" }}
					/>
				</Search>
			</StyledToolbar>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				open={open}
				onClose={(e) => setOpen(false)}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<MenuItem>Profile</MenuItem>
				<MenuItem>My account</MenuItem>
				<MenuItem>Logout</MenuItem>
			</Menu>
		</AppBar>
	);
};

export default Navbar;
