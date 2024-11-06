"use client";
import { Box } from "@mui/material";
import HomeCard from "./components/HomeCard";
import { useSelector } from "react-redux";
import { RootSate } from "@/appStore/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const style = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "10rem",
  };
  const isLoggedIn: boolean = useSelector(
    (state: RootSate) => state.authReducer.isLoggedIn
  );
  const router = useRouter();

  return (
    <Box style={style}>
      <Box mr={10}>
        <HomeCard cardTitle="New email" />
      </Box>
      <Box>
        <HomeCard cardTitle="My emails" />
      </Box>
    </Box>
  );
}
