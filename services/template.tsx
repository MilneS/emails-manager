import {
  Card,
  Inpt,
  SavedTemplate,
} from "@/appStore/interface/interface.model";

export const getAllTemplates = async () => {
  const fetchedTemplates = await fetch("http://localhost:3000/api/templates/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
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
  cardsInputs: Inpt[],
  cardsOrder: Card[],
  authorId: string,
  isReorderable: boolean
) => {
  const templateData: SavedTemplate = {
    emailTitle,
    cardsInputs,
    cardsOrder,
    authorId,
    isReorderable,
  };
  const fetchedTemplate = await fetch("http://localhost:3000/api/template/", {
    method: "POST",
    body: JSON.stringify(templateData),
  });
  return fetchedTemplate.json();
};
