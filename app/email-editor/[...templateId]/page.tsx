"use client";
import { templates } from "../../../utils";
import { setSelectedTemplate } from "../../../appStore/cardsSlice";
import { useEffect } from "react";
import Editor from "../../components/editor/editSection";
import Preview from "../../components/editor/previewSection";
import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Template } from "../../../appStore/interface/interface.model";
import { RootSate } from "../../../appStore/store";
import { useParams } from "next/navigation";

function EmailEditor() {
  const pathName = useParams();
  const dispatch = useDispatch();
  const selectedTemplate: Template | null = useSelector(
    (state: RootSate) => state.cardsReducer.selectedTemplate
  );

  useEffect(() => {
    const found = templates.find(
      (template) => template.id === pathName?.templateId[0]
    );
    dispatch(setSelectedTemplate(found));
  }, []);

  return (
    <>
      {selectedTemplate && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            height: "100%",
          }}
        >
          <Editor />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRight: "2px solid #545454" }}
          />
          <Preview />
        </Box>
      )}
    </>
  );
}

export default EmailEditor;
