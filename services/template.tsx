import {
  Card,
  Inpt,
  SavedTemplate,
} from "@/appStore/interface/interface.model";

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
  cardsInputs: Inpt[],
  cardsOrder: Card[],
  authorId: string,
  isReorderable: boolean
) => {
  const templateData: SavedTemplate = {
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
