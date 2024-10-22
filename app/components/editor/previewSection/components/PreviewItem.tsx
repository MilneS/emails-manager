import { Box, Typography } from "@mui/material";
import { Card } from "../../../../../appStore/interface/interface.model";
import { useSelector } from "react-redux";
import {RootSate} from '../../../../../appStore/store'


const PreviewItem = ({
  item,
  inputValue,
}: {
  item: Card;
  inputValue: string;
}) => {
  const selectedCard = useSelector(
    (state: RootSate) => state.cardsReducer.selectedCard
  );
  const itemStyle = {
    padding: "0.5rem",
    border:
      selectedCard === item.id ? "2px solid #3f51b1" : "0px",
    overflowWrap: "break-word",
  };

  return (
    <Box sx={itemStyle}>
      {/* @ts-ignore */}
      <Typography variant={item.el} color={inputValue?"#303030":'#b5b5b5'}>
        {inputValue.length > 0 ? inputValue : item.name}
      </Typography>
    </Box>
  );
};

export default PreviewItem;
