import { Fab } from "@mui/material";
// import { Component } from "react";

const CustomFab = ({ color, iconComponent, onClick }) => {
  return (<>
    <Fab 
      onClick={onClick}
			color={color}
			sx={{
				minWidth: "70px",
				minHeight: "70px",
				margin: "0px",
				top: "auto",
				right: "20px",
				bottom: "20px",
				left: "auto",
				position: "fixed",
			}}
		>
			{iconComponent}
		</Fab>
    </>
  )
}

export default CustomFab;