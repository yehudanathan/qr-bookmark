import { Box } from "@mui/material";

const RightBar = () => {
	return (
		<>
			<Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
				<Box position="fixed"></Box>
			</Box>
		</>
	);
};

export default RightBar;
