import { Box } from "@mui/material";
import PreviewItem from "./components/PreviewItem";
import { useSelector } from "react-redux";
import {
  Card,
  Inpt,
  SavedTemplate,
} from "../../../../appStore/interface/interface.model";
import { RootSate } from "../../../../appStore/store";

const Sheet = () => {
  const cards = useSelector(
    (state: RootSate) => state.cardsReducer.cards
  );
  const selectedTemplate: SavedTemplate | null = useSelector(
    (state: RootSate) => state.cardsReducer.selectedTemplate
  );
  const inputValues = useSelector(
    (state: RootSate) => state.cardsReducer.inputValues
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
      {cards.map((item: Card) => {
        const foundCard = selectedTemplate?.cards.find(
          (card) => card.id === item.id
        );
        const inputVal= inputValues.find(
          (inpt: Inpt) => inpt.id === item.id
        )?.value;
        return foundCard ? (
          <PreviewItem
            key={item.id}
            item={item}
            inputValue={inputVal ?? ""}
          />
        ) : null;
      })}
    </Box>
  );
};

export default Sheet;
