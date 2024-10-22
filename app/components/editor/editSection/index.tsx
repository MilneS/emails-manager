import { Box } from "@mui/material";
import SectionTitle from "../../SectionTitle";
import SortableCont from "./components/SortableCont";

export default function Editor() {
  return (
    <Box
      width="40%"
      height="100%"
      paddingBottom="0.1rem"
      sx={{ backgroundColor: "#b5b5b5" }}
    >
      <Box marginBottom="0.1rem">
        <SectionTitle sectionName={"Editor"} />
      </Box>
      <SortableCont />
    </Box>
  );
}
