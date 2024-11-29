"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootSate } from "@/appStore/store";
import { createTemplate, updateTemplate } from "@/services/template";
import { setSaveTemplateMessage } from "@/appStore/cardsSlice";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Card, Inpt } from "@/appStore/interface/interface.model";

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
  const [open, setOpen] = useState(false);
  const emailTitle = useSelector(
    (state: RootSate) => state.cardsReducer.emailTitle
  );
  const userData = useSelector((state: RootSate) => state.authReducer.userData);
  const savedCards = useSelector(
    (state: RootSate) => state.cardsReducer.cards
  );
  const inputValues = useSelector(
    (state: RootSate) => state.cardsReducer.inputValues
  );
  const pathName = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const splitPath = pathName?.templateId[0].split("-");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cardValues = () => {
    const localCards = JSON.parse(JSON.stringify(savedCards));
    localCards.forEach((card: Card) => {
      inputValues.forEach((inpt: Inpt) =>
        inpt.id === card.id ? (card.value = inpt.value) : null
      );
    });
    return localCards;
  };
  const create = async () => {
    if (userData?.email) {
      const cards = cardValues();
      const saveTemplate = await createTemplate(
        emailTitle,
        cards,
        userData?.email,
        false
      );
      if (saveTemplate.insertedId) {
        //insert id to path
        router.push(`/email-editor/${saveTemplate.insertedId}`);
      } else {
        dispatch(
          setSaveTemplateMessage("Something went wrong, try again later.")
        );
      }
    }
    handleClose();
  };

  const update = async () => {
    if (userData?.email && splitPath) {
      const _id = splitPath[0];
      const cards = cardValues();

      const updatedTemplate = await updateTemplate(
        _id,
        emailTitle,
        cards,
        userData?.email,
        false
      );
      if (updatedTemplate.modifiedCount === 1) {
        //insert id to path
        dispatch(setSaveTemplateMessage("Saved!"));
      } else {
        dispatch(
          setSaveTemplateMessage("Something went wrong, try again later.")
        );
      }
    }
    handleClose();
  };

  const save = () => {
    splitPath && splitPath[0] === "newtemplate" ? create() : update();
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
              color="error"
              variant="contained"
              sx={{ marginRight: "0.5rem" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={save}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default SaveModal;
