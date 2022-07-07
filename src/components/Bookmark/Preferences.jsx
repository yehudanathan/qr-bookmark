import {
	Delete,
	FilterList,
	KeyboardArrowDown,
	Settings,
	Sort,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	IconButton,
	InputLabel,
	Menu,
	MenuItem,
	Modal,
	Select,
	styled,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import { getLinks } from "../../firebase/database/links";
import Links from "../../pages/Links";

const StyledBox = styled(Box)({
	alignItems: "center",
	gap: "10px",
	margin: "15px 10px 10px 10px",
});

// Container for each pair of icon and text for big devices
const IconAndText = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: "10px",
	alignItems: "center",
	[theme.breakpoints.up("sm")]: {
		gap: { xs: "15px" },
	},
	[theme.breakpoints.up("md")]: {
		gap: { xs: "20px" },
	},
}));

const StyledModal = styled(Modal)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

const Preferences = ({
	from,
	to,
	isFav,
	sort,
	clear,
	onFromChange,
	onToChange,
	onIsFavChange,
	onFilterChange,
	onSortChange,
	onClearChange,
}) => {
	const [filterOpen, setFilterOpen] = useState(false);

	// const [links, setLinks] = useState((async () => {await getLinks()})());
	// const [isSelected, setIsSelected] = useState(links.map())

	// const handleFilter = (event) => {
	//   let dateAndTime = value;
	// 	console.log(dateAndTime); //TODO: error null
	//   setFilterOpen(false)
	// };

	// useEffect(() => {
	//   sort === "Oldest" ? links.orderByChild
	// }, [sort]);

	// const handleClear = (event) => {
	//   let option = event.target.value;
	// 	setClear(option);
	//   console.log("a");
	// };

	const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("sm"));

	return (
		<StyledBox>
			<IconAndText>
				<Button
					flex={1}
					variant="outlined"
					startIcon={isDesktop ? <FilterList /> : <></>}
					sx={{
						textTransform: "none",
						display: "flex",
						height: "55px",
						flexGrow: 1,
						p: { xs: 0, sm: 0 },
					}}
					onClick={(e) => setFilterOpen(true)}
					endIcon={<KeyboardArrowDown />}
				>
					<Typography>Filter</Typography>
				</Button>
				<StyledModal
					open={filterOpen}
					onClose={(e) => setFilterOpen(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box
						width={550}
						height={200}
						bgcolor={"background.default"}
						color={"text.primary"}
						p={3}
						borderRadius={5}
						sx={{ position: "relative" }}
					>
						<Typography variant="h6" color="gray" textAlign="center" mb="15px">
							Filter Settings
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mb: "15px",
							}}
						>
							<div>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										renderInput={(props) => <TextField {...props} />}
										id="From"
										label="From"
										value={from}
										onChange={(newFrom) => {
											onFromChange(newFrom);
										}}
									/>
								</LocalizationProvider>
							</div>
							<Divider orientation="vertical" flexItem />
							<div>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										renderInput={(props) => <TextField {...props} />}
										id="To"
										label="To"
										value={to}
										onChange={(newTo) => {
											onToChange(newTo);
										}}
									/>
								</LocalizationProvider>
							</div>
						</Box>
						<Box
							sx={{
								display: "flex",
								gap: "5px",
								alignItems: "center",
								position: "absolute",
								right: "25px",
							}}
						>
							<Checkbox onChange={onIsFavChange(!isFav)} />
							<Typography fontWeight={500}>Favourites Only</Typography>
						</Box>
						<Button
							variant="contained"
							sx={{
								textTransform: "none",
								position: "absolute",
								right: "25px",
								bottom: "15px",
								fontSize: "16px",
							}}
							onClick={onFilterChange}
						>
							Confirm
						</Button>
					</Box>
				</StyledModal>
				<FormControl sx={{ flexGrow: 1 }}>
					<InputLabel
						id="demo-simple-select-label"
						sx={{
							fontSize: { isDesktop: true ? "17px" : "10px" },
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{isDesktop ? "Sort by" : "Sort"}
					</InputLabel>
					<Select
						labelId="select-label"
						id="select"
						value={sort}
						label="Sort by"
						onChange={(e) => {
							// console.log(e.target.value);
							onSortChange();
						}}
					>
						<MenuItem value={"Oldest"}>Oldest</MenuItem>
						<MenuItem value={"Newest"}>Newest</MenuItem>
					</Select>
				</FormControl>
				<FormControl sx={{ flexGrow: 1 }}>
					<InputLabel id="demo-simple-select-label" sx={{ fontSize: "17px" }}>
						Clear
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={clear}
						label="Clear"
						onChange={onClearChange}
					>
						<MenuItem value={"Select"}>Select</MenuItem>
						<MenuItem value={"Select all"}>Select all</MenuItem>
					</Select>
				</FormControl>
			</IconAndText>
		</StyledBox>
	);
};

export default Preferences;
