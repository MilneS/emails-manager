import {
  Card,
  Inpt,
  SavedTemplate,
} from "@/appStore/interface/interface.model";

export const getAllTemplates = async (email: string) => {
  const fetchedTemplates = await fetch(
    "http://localhost:3000/api/allTemplates/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
    }
  );
  return fetchedTemplates.json();
};

export const getTemplate = async (id: string) => {
  const fetchedTemplate = await fetch("http://localhost:3000/api/template/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: id,
    },
  });
  return fetchedTemplate.json();
};

export const createTemplate = async (
  emailTitle: string | null,
  cards: Card[],
  authorId: string,
  isReorderable: boolean
) => {
  const templateData: SavedTemplate = {
    emailTitle,
    cards,
    authorId,
    isReorderable,
  };
  const fetchedTemplate = await fetch("http://localhost:3000/api/template/", {
    method: "POST",
    body: JSON.stringify(templateData),
  });
  return fetchedTemplate.json();
};
