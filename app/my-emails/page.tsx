"use client";
import { User } from "@/appStore/interface/interface.model";
import { RootSate } from "@/appStore/store";
import { getAllTemplates } from "@/services/template";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TemplateTable from "../components/TemplatesTable";
import { Box, Typography } from "@mui/material";
import { setAllTemplates } from "@/appStore/cardsSlice";

const style = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "4rem",
};
const savedEmails = () => {
  const userData: User | null = useSelector(
    (state: RootSate) => state.authReducer.userData
  );
  const dispatch = useDispatch();


  const templates = async () => {
    if (userData) {
      const templates = await getAllTemplates(userData.email);
      dispatch(setAllTemplates(templates));
    }
  };

  useEffect(() => {
    templates();
  }, [userData]);
  return (
    <Box sx={style}>
      <Typography variant="h3">MY EMAILS</Typography>
      <TemplateTable />
    </Box>
  );
};
export default savedEmails;
