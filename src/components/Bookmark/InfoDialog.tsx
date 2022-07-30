import { 
  IconButton, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";

const InfoDialog = ({
  displayDialog,
  handleCloseDialog,
  title,
  URL,
  dateTime
}) => {
  return (<>
    <Dialog
      open={displayDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle
        sx={{
          fontFamily: "Gotham Medium", 
          fontWeight: "bold", 
          fontSize: "28px", 
          color: "#730c0c"
        }}
      >
        Details
      </DialogTitle> */}
      <DialogTitle
        sx={{
          fontFamily: "Gotham Medium", 
          // fontWeight: "bold", 
          fontSize: "22px", 
          color: "black",
          paddingBottom: "10px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="alert-dialog-description"
          sx={{
            fontFamily: "Product Sans", 
            fontSize: "17px", 
            color: "#000000"
          }}
        >
          <Stack direction="row"
            spacing={0.5}
            alignItems="center"
          >
            <LinkIcon />
            <a href={"https://" + URL}
              className="disable-text-decor URL"
            >
              {URL}
            </a>
          </Stack>
        </DialogContentText>
        <DialogContentText 
          id="alert-dialog-description"
          sx={{
            fontFamily: "Product Sans", 
            fontSize: "17px", 
            color: "#000000"
          }}
        >
          saved on {moment(dateTime).format('LLL')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton 
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: "13px",
            top: "13px",
            left: "auto",
            bottom: "auto"
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  </>);
}

export default InfoDialog;