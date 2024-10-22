"use client";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./interface/interface.model";

const initialState: {
  isLoggedIn: boolean;
  userData: User | null;
} = {
  isLoggedIn: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUserData } = authSlice.actions;

export default authSlice.reducer;
