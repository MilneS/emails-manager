import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEmailTitle } from "../../../../../appStore/cardsSlice";
import { useEffect, useState } from "react";
import { RootSate } from "@/appStore/store";

const style = {
  p: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#f7f7f7",
};
const EmailTitleCard = () => {
  const selectedTemplate = useSelector(
    (state: RootSate) => state.cardsReducer.selectedTemplate
  );
  const [titleVal, setTitleVal] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTemplate?.emailTitle) {
      setTitleVal(selectedTemplate.emailTitle);
    }
  }, [selectedTemplate]);

  return (
    <Box sx={style}>
      <Typography variant="h6" mx={3}>
        Title
      </Typography>
      <TextField
        // error
        label={`Type your title here`}
        fullWidth
        sx={{ backgroundColor: "#ffffff" }}
        onBlur={(e) => {
          dispatch(setEmailTitle(e.target.value));
        }}
        onChange={(e) => setTitleVal(e.target.value)}
        value={titleVal}
      />
    </Box>
  );
};
export default EmailTitleCard;
