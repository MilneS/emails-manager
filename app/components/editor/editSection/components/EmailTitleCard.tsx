import { Box, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setEmailTitle } from "../../../../../appStore/cardsSlice";
import { useState } from "react";

const style = {
  p: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#f7f7f7",
};
const EmailTitleCard = () => {
  const [titleVal, setTitleVal] = useState("");
  const dispatch = useDispatch();

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
