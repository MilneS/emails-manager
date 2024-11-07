"use client";
import TemplateTable from "../components/TemplatesTable";
import { Box, Typography } from "@mui/material";

const style = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "4rem",
};
const savedEmails = () => {
  return (
    <Box sx={style}>
      <Typography variant="h3">MY EMAILS</Typography>
      <TemplateTable />
    </Box>
  );
};
export default savedEmails;
