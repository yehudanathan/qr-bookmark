import { Modal, Box } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 315,
  bgcolor: "#deedea",
  border: "0px",
  borderRadius: "1%",
  outline: "none",
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
          <h1 className="modal">Verification email sent!</h1>
          <h3 className="header-3 modal">Please check your email and verify your account.</h3>
        </Box>
      </Modal>
    </div>
  )
}

export default VerificationEmailModal;