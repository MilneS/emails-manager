import { setSaveTemplateMessage } from "@/appStore/cardsSlice";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";

const AlertMessage = ({ message }: { message: string | null }) => {
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setSaveTemplateMessage(null));
  }, 3000);

  return (
    <Alert
      sx={{
        position: "absolute",
        top: "2rem",
        left: "50%",
        width: "14rem",
        marginLeft: "-7rem",
        zIndex: "99",
      }}
      variant="filled"
      severity={message === "Saved!" ? "success" : "error"}
    >
      {message && message}
    </Alert>
  );
};
export default AlertMessage;
