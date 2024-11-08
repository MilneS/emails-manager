"use client";
import { setSelectedTemplate } from "../../../appStore/cardsSlice";
import { useEffect } from "react";
import Editor from "../../components/editor/editSection";
import Preview from "../../components/editor/previewSection";
import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SavedTemplate } from "../../../appStore/interface/interface.model";
import { RootSate } from "../../../appStore/store";
import { useParams } from "next/navigation";
import { templates } from "@/utils";

function EmailEditor() {
  const pathName = useParams();
  const dispatch = useDispatch();
  const allTemplates: SavedTemplate[] | [] = useSelector(
    (state: RootSate) => state.cardsReducer.allTemplates
  );

  useEffect(() => {
    let found;
    const splitPath = pathName?.templateId[0].split("-");
    if (splitPath && splitPath[0] === "newtemplate") {
      found = templates.find(
        (template) => template.newTemplateId === splitPath[1]
      );
    } else {
      found = allTemplates.find(
        (template) => template._id === pathName?.templateId[0]
      );
    }
    dispatch(setSelectedTemplate(found));
  }, [allTemplates]);

  return (
    <>
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
    </>
  );
}

export default EmailEditor;
