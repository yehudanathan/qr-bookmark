import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

const CustomSnackBar = ({severity, message, autoHide}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={autoHide} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

export default CustomSnackBar;