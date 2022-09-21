import {
	FilterList,
	KeyboardArrowDown,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Stack,
	styled,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

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
	links,
	from,
	to,
	selected,
	sort,
	setLinks,
	setFrom,
	setTo,
	setSort,
	sortBy,
	allSelected,
	setSelectAll,
	handleSelectAll,
	clearSelection,
	deactivateSelectionMode,
}) => {
	const [filterOpen, setFilterOpen] = useState(false);
	// TODO find out theme type
	const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
	const checkSelectAll = selected.every((value) => value === true) && selected.length !== 0;

	const handleDropdownChange = async (e) => {
		setSort(e.target.value);
		const result = await sortBy(e.target.value);
		if (result === true) {
			console.log("Sort complete");
		} else {
			alert("Sort error");
		}
	}

	return (
		<StyledBox>
			<IconAndText>
				<Stack
					direction="row"
					justifyContent="flex-end"
					spacing={2}
					sx={{
						marginTop: "15px",
						minWidth: "calc(100vw - 30px)",
						height: "40px",
					}}
				>
					<Button
						variant="outlined"
						startIcon={isDesktop ? <FilterList /> : <></>}
						sx={{
							textTransform: "none",
							display: "flex",
							minHeight: "56.8px",
							maxWidth: "160px",
							flexGrow: 1,
							p: { xs: 0, sm: 0 },
						}}
						onClick={() => setFilterOpen(true)}
						endIcon={<KeyboardArrowDown />}
					>
						<h3 className="preferences-filter">Filter</h3>
					</Button>
					<StyledModal
						open={filterOpen}
						onClose={() => setFilterOpen(false)}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box
							width={550}
							height={220}
							bgcolor={"background.default"}
							color={"text.primary"}
							p={3}
							borderRadius={2}
							sx={{ position: "relative" }}
						>
							<h2 className="filter-settings-preferences">Filter Settings</h2>
							<Box
								sx={{
									mb: "15px",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DateTimePicker
											renderInput={(props) => <TextField {...props} />}
											// id="From"
											label="From"
											value={from}
											onChange={(newFrom) => {
												setFrom(newFrom);
											}}
										/>
									</LocalizationProvider>
								</div>
								<Divider orientation="vertical" flexItem />
								<div>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DateTimePicker
											renderInput={(props) => <TextField {...props} />}
											label="To"
											value={to}
											onChange={(newTo) => {
												setTo(newTo);
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
								<Checkbox onChange={() => alert("IP")} />
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
								onClick={() => setLinks(links)}
							>
								Confirm
							</Button>
						</Box>
					</StyledModal>

					<FormControl
						sx={{
							flexGrow: 1,
							display: "flex",
							maxHeight: "40px",
							maxWidth: "160px",
						}}
					>
						<InputLabel
							id="demo-simple-select-label"
						>
							<h3 className="preferences-filter sort">
								{isDesktop ? "Sort by" : "Sort"}
							</h3>
						</InputLabel>
						<Select
							labelId="select-label"
							id="select"
							value={sort}
							label="Sort by"
							onChange={handleDropdownChange}
						>
							<MenuItem value={"Oldest"}><h3 className="preferences-filter dropdown">Oldest</h3></MenuItem>
							<MenuItem value={"Newest"}><h3 className="preferences-filter dropdown">Most recent</h3></MenuItem>
						</Select>
					</FormControl>
					<Stack
						direction="row"
						spacing={0.5}
						sx={{
							transform: "translate(-5px, 7px)"
						}}
						alignItems="center"
					>
						<input
							type="checkbox"
							className="active-checkbox select-all"
							checked={allSelected && checkSelectAll}
							onClick={() => {
								if ((!allSelected && !checkSelectAll) || !checkSelectAll) {
									handleSelectAll();
									setSelectAll(true);
								} else {
									clearSelection();
									setSelectAll(false);
									deactivateSelectionMode();
								}
							}}
						/>
						<h3 className="preferences-filter sort select-all">
							Select all
						</h3>
					</Stack>
				</Stack>
			</IconAndText>
		</StyledBox>
	);
};

export default Preferences;
