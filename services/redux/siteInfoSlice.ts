import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Info } from "types/cms";
import type { AppState } from "./store";

const initialState: Info = {
  name: "",
  email: "",
  phoneNumber: "",
  url: "",
  address: "",
  priceRange: "",
  openHours: [],
  image: {
    sys: {
      id: "",
    },
    url: "",
    alt: "",
    description: "",
  },
};

const typedHydrateAction = createAction<AppState>(HYDRATE);

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<Info>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(typedHydrateAction, (state, action) => {
      return action.payload.info;
    });
  },
});

export const { setInfo } = infoSlice.actions;

export const selectInfo = () => (state: AppState) => state.info;
