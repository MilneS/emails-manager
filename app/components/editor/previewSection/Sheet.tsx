import { Box } from "@mui/material";
import PreviewItem from "./components/PreviewItem";
import { useSelector } from "react-redux";
import {
  Card,
  SavedTemplate,
} from "../../../../appStore/interface/interface.model";
import { RootSate } from "../../../../appStore/store";

const Sheet = () => {
  const cardsOrder = useSelector(
    (state: RootSate) => state.cardsReducer.cardsOrder
  );
  const cardsInputs = useSelector(
    (state: RootSate) => state.cardsReducer.cardsInputs
  );
  const selectedTemplate: SavedTemplate | null = useSelector(
    (state: RootSate) => state.cardsReducer.selectedTemplate
  );

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        height: "fit-content",
        minHeight: "100%",
        width: "70%",
        padding: "3rem",
      }}
    >
      {cardsOrder.map((item: Card) => {
        const inputValue = cardsInputs.find((inp) => inp.id === item.id)?.value;
        const foundCard = selectedTemplate?.cardsOrder.find(
          (card) => card.id === item.id
        );
        return foundCard ? (
          <PreviewItem
            key={item.id}
            item={item}
            inputValue={inputValue ?? ""}
          />
        ) : null;
      })}
    </Box>
  );
};

export default Sheet;
