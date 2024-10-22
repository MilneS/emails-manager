import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Save } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const SaveModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const save = () => {
    //save
    handleClose();
  };

  return (
    <div>
      <IconButton color="primary" aria-label="save" onClick={handleOpen}>
        <Save fontSize="large" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Save your changes?
          </Typography>
          <Box mt={3} mb={1}>
            <Button
              variant="contained"
              sx={{ marginRight: "0.5rem" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button color="error" variant="contained" onClick={save}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default SaveModal;
