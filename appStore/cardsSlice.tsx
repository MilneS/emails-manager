"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  Card,
  Inpt,
  SavedTemplate,
  Template,
} from "./interface/interface.model";

const initialState: {
  selectedTemplate: Template | null;
  cardsOrder: Card[];
  cardsInputs: Inpt[];
  selectedCard: string | null;
  saveTemplateMessage: null | string;
  emailTitle: null | string;
  allTemplates: SavedTemplate[] | [];
} = {
  selectedTemplate: null,
  cardsOrder: [],
  cardsInputs: [],
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
    setCardsOrder: (state, action) => {
      state.cardsOrder = action.payload;
    },
    setEmailTitle: (state, action) => {
      state.emailTitle = action.payload;
    },
    setCardsInputs: (state, action) => {
      state.cardsInputs = action.payload;
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
  setCardsOrder,
  setCardsInputs,
  setSelectedTemplate,
  setSelectedCard,
  setSaveTemplateMessage,
  setAllTemplates,
} = cardsSlice.actions;

export default cardsSlice.reducer;
