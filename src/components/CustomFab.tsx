import { Fab } from "@mui/material";

const CustomFab = ({ color, iconComponent, onClick, style }) => {
  return (<>
    <Fab 
      onClick={onClick}
			color={color}
			sx={style}
		>
			{iconComponent}
		</Fab>
    </>
  )
}

export default CustomFab;