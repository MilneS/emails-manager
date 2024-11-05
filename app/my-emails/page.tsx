"use client";
import { User } from "@/appStore/interface/interface.model";
import { RootSate } from "@/appStore/store";
import { getAllTemplates } from "@/services/template";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const savedEmails = () => {
  const userData: User | null = useSelector(
    (state: RootSate) => state.authReducer.userData
  );

  const templates = async () => {
    if (userData) {
      const templates = await getAllTemplates(userData.email);
      console.log(templates);
    }
  };

  useEffect(() => {
    templates();
  }, [userData]);
  return <>my emails</>;
};
export default savedEmails;
