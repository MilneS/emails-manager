import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedCard,
  setSelectedTemplate,
} from "../../../../../appStore/cardsSlice";
import { SavedTemplate } from "../../../../../appStore/interface/interface.model";
import { IconButton } from "@mui/material";
import { RootSate } from "../../../../../appStore/store";

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

const DeleteCardModal = ({ itemId }: { itemId: string }) => {
  const [open, setOpen] = React.useState(false);
  const selectedTemplate: SavedTemplate | null = useSelector(
    (state: RootSate) => state.cardsReducer.selectedTemplate
  );
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    dispatch(setSelectedCard(itemId));
  };

  const handleClose = () => {
    dispatch(setSelectedCard(null));
    setOpen(false);
  };

  const deleteCard = () => {
    const localTemplate: SavedTemplate = JSON.parse(
      JSON.stringify(selectedTemplate)
    );
    const foundOrder = localTemplate.cardsOrder.find(
      (card) => card.id === itemId
    );
    if (foundOrder) {
      const idxOrder = localTemplate.cardsOrder.indexOf(foundOrder);
      localTemplate.cardsOrder.splice(idxOrder, 1);
      const foundInp = localTemplate.cardsInputs.find(
        (card) => card.id === itemId
      );
      if (foundInp) {
        const idxInp = localTemplate.cardsInputs.indexOf(foundInp);
        localTemplate.cardsInputs.splice(idxInp, 1);
      }
    }

    console.log(localTemplate);

    dispatch(setSelectedTemplate(localTemplate));
    handleClose();
  };

  return (
    <div>
      <IconButton color="primary" aria-label="delete" onClick={handleOpen}>
        <DeleteOutlineIcon color="warning" fontSize="medium" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete {itemId}?
          </Typography>
          <Box mt={3} mb={1}>
            <Button
              color="error"
              variant="contained"
              sx={{ marginRight: "0.5rem" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={deleteCard}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default DeleteCardModal;
