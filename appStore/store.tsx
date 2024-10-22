"use client";
import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cardsReducer: cardReducer,
    authReducer: authReducer,
  },
});

export type RootSate = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
