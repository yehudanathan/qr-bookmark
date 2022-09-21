import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

const CustomSnackBar = ({ severity, message, autoHide, open }) => {
  const [openState, setOpen] = useState(open);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={openState} autoHideDuration={autoHide} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

export default CustomSnackBar;