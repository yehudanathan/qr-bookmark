import { Modal, Box } from "@mui/material";
import { useState } from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 295,
  bgcolor: "#deedea",
  border: "0px",
  borderRadius: "2%",
  p: 4,
}

const VerificationEmailModal = ({ openState, handleCloseModal }) => {
  return (
    <div>
      <Modal 
        open={openState}
        onClose={handleCloseModal}
      >
        <Box sx={style}>
          <h1 className="modal">Email verification sent!</h1>
          <h3 className="header-3 modal">Please check your email.</h3>
        </Box>
      </Modal>
    </div>
  )
}

export default VerificationEmailModal;