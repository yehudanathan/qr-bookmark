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
	isFav,
	sort,
	clear,
	setLinks,
	setFrom,
	setTo,
	setIsFav,
	handleFilter,
	setSort,
	setClear,
	handleSelectAll,
	allSelected,
	clearSelection,
	selectionMode,
	activateSelectionMode,
	deactivateSelectionMode
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

	// const setClear = (event) => {
	//   let option = event.target.value;
	// 	setClear(option);
	//   console.log("a");
	// };

	// TODO find out theme type
	const isDesktop = useMediaQuery((theme : any) => theme.breakpoints.up("sm"));

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
						marginRight: "10px",
						height: "40px"
					}}
				>
					<Button
						// flex={1}
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
											// id="To"
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
								<Checkbox onChange={() => setIsFav(!isFav)} />
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
							sx={{
								fontSize: { isDesktop: true ? "17px" : "10px" },
								alignItems: "center",
								justifyContent: "center",
								maxHeight: "40px",
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
								const sortBy = e.target.value;
								const oldLinks = links;
								setSort(sortBy);
								if (sortBy === "Oldest") {
									oldLinks.sort((a, b) =>
										a.time < b.time ? 1 : b.time < a.time ? -1 : 0
									);
								} else {
									oldLinks.sort((a, b) =>
										a.time > b.time ? 1 : b.time > a.time ? -1 : 0
									);
								}
								setLinks(links);
							}}
						>
							<MenuItem value={"Oldest"}>Oldest</MenuItem>
							<MenuItem value={"Newest"}>Newest</MenuItem>
						</Select>
					</FormControl>
					<Stack 
						direction="row" 
						spacing={1}
						sx={{
							transform: "translate(-5px, 18px)"
						}}
					>
						<input
							type="checkbox"
							className="active-checkbox select-all"
							onClick={() => {
								if (!selectionMode) {
									activateSelectionMode();
								} else {
									deactivateSelectionMode();
								}
								if (!allSelected()) {
									handleSelectAll();
								} else {
									clearSelection();
								}
							}}
						/>
						<Typography 
							fontWeight={500}
							sx={{
								transform: "translate(-5px, 1px)"
							}}
						>
							Select all
						</Typography>
					</Stack>
				</Stack>
			</IconAndText>
		</StyledBox>
	);
};

export default Preferences;
