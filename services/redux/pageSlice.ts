import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Page } from "types/cms";
import type { AppState } from "./store";

const initialState: Page = {
  title: "",
  slug: "/",
  label: "",
  image: {
    sys: {
      id: "",
    },
    url: "",
    alt: "",
    description: "",
  },
  sections: [],
};

const typedHydrateAction = createAction<AppState>(HYDRATE);

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state: any, { payload }: PayloadAction<Page>) => {
      return payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(typedHydrateAction, (state, action) => {
      return action.payload.page;
    });
  },
});

export const { setPage } = pageSlice.actions;

export const selectPage = () => (state: AppState) => state.page;
