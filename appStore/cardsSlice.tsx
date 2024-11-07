"use client";
import { createSlice } from "@reduxjs/toolkit";
import { Card, SavedTemplate } from "./interface/interface.model";

const initialState: {
  selectedTemplate: SavedTemplate | null;
  cards: Card[];
  selectedCard: string | null;
  saveTemplateMessage: null | string;
  emailTitle: null | string;
  allTemplates: SavedTemplate[] | [];
} = {
  selectedTemplate: null,
  cards: [],
  selectedCard: null,
  saveTemplateMessage: null,
  emailTitle: null,
  allTemplates: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setEmailTitle: (state, action) => {
      state.emailTitle = action.payload;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    setSaveTemplateMessage: (state, action) => {
      state.saveTemplateMessage = action.payload;
    },
    setAllTemplates: (state, action) => {
      state.allTemplates = action.payload;
    },
  },
});

export const {
  setEmailTitle,
  setCards,
  setSelectedTemplate,
  setSelectedCard,
  setSaveTemplateMessage,
  setAllTemplates,
} = cardsSlice.actions;

export default cardsSlice.reducer;
