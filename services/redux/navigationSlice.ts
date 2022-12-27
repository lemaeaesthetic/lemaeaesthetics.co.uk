import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Navigation } from "types/cms";
import type { AppState } from "./store";

const initialState: Navigation = {
  type: "MAIN",
  entries: [],
  showServices: false,
};

const typedHydrateAction = createAction<AppState>(HYDRATE);

export const navigationSlide = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigation: (state, action: PayloadAction<Navigation>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(typedHydrateAction, (state, action) => {
      return action.payload.navigation;
    });
  },
});

export const { setNavigation } = navigationSlide.actions;

export const selectNavigation = () => (state: AppState) => state.navigation;
