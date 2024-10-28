import * as React from "react";
import Card from "@mui/material/Card";
import Link from "next/link";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

export default function HomeCard({ cardTitle }: { cardTitle: string }) {
  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <Link href={cardTitle === "New email" ? "/templates" : "/my-emails"}>
      <Card
        sx={{
          width: "20rem",
          height: "20rem",
          ...centerStyle,
          "&:hover": { backgroundColor: "#f5f8fa" },
        }}
      >
        <CardContent sx={centerStyle}>
          <Typography variant="h5" component="div" mb={3}>
            {cardTitle}
          </Typography>
          {cardTitle === "New email" ? (
            <AddCircleOutlineIcon fontSize="large" color="primary" />
          ) : (
            <FolderOpenIcon fontSize="large" color="primary" />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
