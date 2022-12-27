import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Treatment } from "types/cms";
import type { AppState } from "./store";

const initialState: Treatment[] = [];

const typedHydrateAction = createAction<AppState>(HYDRATE);

export const treatmentsSlice = createSlice({
  name: "treatments",
  initialState,
  reducers: {
    setTreatments: (state, action: PayloadAction<Treatment[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(typedHydrateAction, (state, action) => {
      return action.payload.treatments;
    });
  },
});

export const { setTreatments } = treatmentsSlice.actions;

export const selectTreatments = () => (state: AppState) => state.treatments;
