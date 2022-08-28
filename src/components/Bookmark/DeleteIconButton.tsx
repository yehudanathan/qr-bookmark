import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

const DeleteIconButton = () => {
  // outermost <></> is unnecessary
  return (<>
    <Button 
    variant="contained"
    sx={{minWidth: '70px', minHeight: '70px', borderRadius: '50%', backgroundColor: 'black'}}>
      <DeleteIcon sx={{fontSize: "40px"}}/>
    </Button>
  </>);
}

export default DeleteIconButton;