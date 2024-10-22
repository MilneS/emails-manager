"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Grid2 as Grid, Paper, Box } from "@mui/material";
import { templates } from "@/utils";
import { Template } from "@/appStore/interface/interface.model";
import Link from "next/link";
import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
  height: "fit-content",
  width: "fit-content",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": { backgroundColor: "#e3f2fc" },
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Templates() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "5rem",
      }}
    >
      <Box sx={{ width: "40%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {templates.map((template: Template) => {
            return (
              <Grid size={6} key={template.id}>
                <Link href={`/email-editor/${template.id}`}>
                  <Item>
                    <Image
                      src={template.templateImage}
                      width={200}
                      height={240}
                      alt={`${template.id} image`}
                    />
                  </Item>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
