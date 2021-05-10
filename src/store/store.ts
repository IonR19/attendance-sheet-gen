import { configureStore } from "@reduxjs/toolkit";
import timefilter from "./timefilter";
import { createInstance } from "localforage";
import peopleSplice from "./people/slice";

export const db = createInstance({
  name: "names",
});

const reducers = {
  people: peopleSplice.reducer,
  timefilter: timefilter.reducer,
};

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
