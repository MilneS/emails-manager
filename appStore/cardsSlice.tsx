"use client";
import { createSlice } from "@reduxjs/toolkit";
import { Card, Inpt, Template } from "./interface/interface.model";

const initialState: {
  selectedTemplate: Template | null;
  cardsOrder: Card[];
  cardsInputs: Inpt[];
  selectedCard: string | null;
  saveTemplateMessage: null | string;
  emailTitle: null | string;
} = {
  selectedTemplate: null,
  cardsOrder: [],
  cardsInputs: [],
  selectedCard: null,
  saveTemplateMessage: null,
  emailTitle: null,
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
  },
});

export const {
  setEmailTitle,
  setCardsOrder,
  setCardsInputs,
  setSelectedTemplate,
  setSelectedCard,
  setSaveTemplateMessage,
} = cardsSlice.actions;

export default cardsSlice.reducer;
