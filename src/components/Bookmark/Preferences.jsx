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
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";

const StyledBox = styled(Box)({
	alignItems: "center",
	gap: "10px",
	margin: "15px 10px 10px 10px",
});

// Container for each pair of icon and text for big devices
const IconAndText = styled(Box)(({ theme }) => ({
	display: "none",
	gap: "20px",
	alignItems: "center",
	[theme.breakpoints.up("sm")]: {
		display: "flex",
	},
}));

// Container for each icon only for small device
const OnlyIcon = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: "10px",
	alignItems: "center",
	[theme.breakpoints.up("sm")]: {
		display: "none",
	},
}));

const StyledModal = styled(Modal)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

const Preferences = () => {
	const [filterOpen, setFilterOpen] = useState(false);

	const [sort, setSort] = React.useState("");
	const handleSort = (event) => {
		setSort(event.target.value);
	};

	const [display, setDisplay] = useState("");
	const handleDisplay = (event) => {
		setDisplay(event.target.value);
	};

	const [clear, setClear] = useState("");
	const handleClear = (event) => {
		setClear(event.target.value);
	};

	const [value, setValue] = useState(new Date());

	return (
		<StyledBox>
			<IconAndText>
				<Button
					variant="outlined"
					startIcon={<FilterList />}
					sx={{ textTransform: "none" }}
					onClick={(e) => setFilterOpen(true)}
					endIcon={<KeyboardArrowDown />}
				>
					<Typography fontSize="17px">Filter by date</Typography>
				</Button>
				<StyledModal
					open={filterOpen}
					onClose={(e) => setFilterOpen(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box
						width={400}
						height={280}
						bgcolor={"background.default"}
						color={"text.primary"}
						p={3}
						borderRadius={5}
					>
						<Typography variant="h6" color="gray" textAlign="center">
							Filter Settings
						</Typography>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								<Typography fontWeight={500}>From</Typography>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										renderInput={(props) => <TextField {...props} />}
										label="DateTimePicker"
										value={value}
										onChange={(newValue) => {
											setValue(newValue);
										}}
									/>
								</LocalizationProvider>
							</div>
							<Divider orientation="vertical" flexItem />
							<div>
								<Typography fontWeight={500}>To</Typography>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										renderInput={(props) => <TextField {...props} />}
										label="DateTimePicker"
										value={value}
										onChange={(newValue) => {
											setValue(newValue);
										}}
									/>
								</LocalizationProvider>
							</div>
						</Box>
						<Divider variant="middle" />
						<Box sx={{ display: "flex", gap: "10px" }}>
							<Typography fontWeight={500}>Favourites Only</Typography>
							<Checkbox defaultChecked />
						</Box>
					</Box>
				</StyledModal>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label" sx={{ fontSize: "17px" }}>
						Sort by
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={sort}
						label="Sort by"
						onChange={handleSort}
					>
						<MenuItem value={"Oldest"}>Oldest</MenuItem>
						<MenuItem value={"Newest"}>Newest</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label" sx={{ fontSize: "17px" }}>
						Display Settings
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={display}
						label="Display Settings"
						onChange={handleDisplay}
					>
						<MenuItem value={"Cards"}>Cards (default)</MenuItem>
						<MenuItem value={"List"}>List</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label" sx={{ fontSize: "17px" }}>
						Clear
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={clear}
						label="Clear"
						onChange={handleClear}
					>
						<MenuItem value={"Select"}>Select</MenuItem>
						<MenuItem value={"Select all"}>Select all</MenuItem>
					</Select>
				</FormControl>
			</IconAndText>
			<OnlyIcon>
				<IconButton aria-label="filter">
					<FilterList />
				</IconButton>
				<IconButton aria-label="sort">
					<Sort />
				</IconButton>
				<IconButton aria-label="display">
					<Settings />
				</IconButton>
				<IconButton aria-label="delete">
					<Delete />
				</IconButton>
			</OnlyIcon>
		</StyledBox>
	);
};

export default Preferences;
