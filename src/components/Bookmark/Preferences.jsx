import { Delete, FilterList, Settings, Sort } from "@mui/icons-material";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import React from "react";

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

const Preferences = () => {
	return (
		<StyledBox>
			<IconAndText>
				<Button
					variant="outlined"
					startIcon={<FilterList />}
					sx={{textTransform: "none"}}
					// onClick={(e) => setFilterOpen(true)}
				>
          <Typography fontSize="17px">Filter by date</Typography>
				</Button>
				<Button
					variant="outlined"
					startIcon={<Sort />}
          sx={{textTransform: "none"}}
					// onClick={(e) => setSortOpen(true)}
				>
          <Typography fontSize="17px">Sort by</Typography>
				</Button>
				<Button
					variant="outlined"
					startIcon={<Settings />}
          sx={{textTransform: "none"}}
					// onClick={(e) => setDisplayOpen(true)}
				>
					<Typography fontSize="17px">Display settings</Typography>
				</Button>
				<Button
					variant="outlined"
					startIcon={<Delete />}
          sx={{textTransform: "none", position: "absolute", right: "10px"}}
					// onClick={(e) => setClearOpen(true)}
				>
					<Typography fontSize="17px">Clear Bookmark</Typography>
				</Button>
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
