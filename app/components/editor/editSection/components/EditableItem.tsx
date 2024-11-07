import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  setCardsInputs,
  setSelectedCard,
} from "../../../../../appStore/cardsSlice";
import {
  Card as Cards,
  Inpt,
} from "../../../../../appStore/interface/interface.model";
import { useState } from "react";
import DeleteCardModal from "./DeleteCardModal";
import { RootSate } from "../../../../../appStore/store";

const EditableItem = ({
  itemId,
  item,
  isGrabbed,
  value,
}: {
  itemId: string;
  item: Cards;
  isGrabbed: boolean;
  value: string;
}) => {
  const [itemVal, setItemVal] = useState(value);
  const dispatch = useDispatch();
  const cardsInputs = useSelector(
    (state: RootSate) => state.cardsReducer.cardsInputs
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemId });
  const cardStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: isGrabbed ? "1px solid #b5b5b5" : "0px",
    zIndex: isGrabbed ? "6" : "5",
  };
  const TopBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const style = { transform: CSS.Transform.toString(transform), transition };

  const inputHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    dispatch(setSelectedCard(null));
    const cardsInputsCopy = JSON.parse(JSON.stringify(cardsInputs));
    cardsInputsCopy.forEach((inp: Inpt) => {
      if (e.target.id === inp.id) {
        inp.value = e.target.value;
      }
    });
    dispatch(setCardsInputs(cardsInputsCopy));
  };

  return (
    <Card
      variant="outlined"
      sx={cardStyle}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <Box width="3rem" />
      <CardContent sx={{ width: "100%", px: 0 }}>
        <Box sx={TopBoxStyle} pb={1}>
          <Typography variant="h6">{item.name}</Typography>
          <DeleteCardModal itemId={item.id} />
        </Box>
        <TextField
          // error
          helperText={`${item.maxChar} characters max`}
          id={itemId}
          label={`Type your ${item.name} here`}
          fullWidth
          sx={{ backgroundColor: "#ffffff" }}
          onBlur={inputHandler}
          onChange={(e) => setItemVal(e.target.value)}
          value={itemVal}
          onFocus={() => dispatch(setSelectedCard(itemId))}
        />
      </CardContent>
      <Box
        width="3rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        {...listeners}
      >
        <DragIndicatorIcon
          sx={{
            "&:hover": { cursor: "grab" },
            color: "#b5b5b5",
          }}
        />
      </Box>
    </Card>
  );
};

export default EditableItem;
