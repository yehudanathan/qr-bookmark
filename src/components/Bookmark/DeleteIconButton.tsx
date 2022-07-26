import DeleteIcon from '@mui/icons-material/Delete';
// import ShareIcon from '@mui/icons-material/Share';
// import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
// import { ButtonProps } from '@mui/material/Button';

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(purple[500]),
//   backgroundColor: purple[500],
//   '&:hover': {
//     backgroundColor: purple[700],
//   },
// }));

const DeleteIconButton = () => {
  return (<>
    <Button 
    variant="contained"
    sx={{minWidth: '70px', minHeight: '70px', borderRadius: '50%', backgroundColor: 'black'}}>
      <DeleteIcon sx={{fontSize: "40px"}}/>
    </Button>
  </>);
}

export default DeleteIconButton;