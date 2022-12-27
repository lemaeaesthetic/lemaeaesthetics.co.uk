import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { navigationSlide } from "./navigationSlice";
import { pageSlice } from "./pageSlice";
import { infoSlice } from "./siteInfoSlice";
import { treatmentsSlice } from "./treatmentsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [treatmentsSlice.name]: treatmentsSlice.reducer,
      [infoSlice.name]: infoSlice.reducer,
      [navigationSlide.name]: navigationSlide.reducer,
      [pageSlice.name]: pageSlice.reducer,
    },
    devTools: true,
  });

// Type def for the overall store including slices
export type AppStore = ReturnType<typeof makeStore>;
// Type def for the current state of the store
export type AppState = ReturnType<AppStore["getState"]>;
// Type def for async action dispatches which has the correct typings according to AppState
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
// Type def for the dispatch method of this store
export type AppDispatch = AppStore["dispatch"];
// Export the wrapper for the store
export const wrapper = createWrapper<AppStore>(makeStore);
