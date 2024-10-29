"use client";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import { RootSate } from "@/appStore/store";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const style = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  paddingTop: "10rem",
};

const LoginPage = () => {
  const isLoggedIn: boolean = useSelector(
    (state: RootSate) => state.authReducer.isLoggedIn
  );
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return <Box sx={style}>{!isLoggedIn && <Login />}</Box>;
};
export default LoginPage;
