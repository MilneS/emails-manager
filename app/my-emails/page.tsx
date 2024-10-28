"use client";
import { getAllTemplates } from "@/services/template";
import { useEffect } from "react";

const savedEmails = () => {
  const templates = async () => {
    const templates = await getAllTemplates();
    console.log(templates);
  };
  useEffect(() => {
    templates();
  }, []);
  return <>templates</>;
};
export default savedEmails;
