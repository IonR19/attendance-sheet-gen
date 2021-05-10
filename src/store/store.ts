import { configureStore } from "@reduxjs/toolkit";
import dateFilter from "./datefilter";
import { createInstance } from "localforage";
import peopleSplice from "./people/slice";
import timeSlice from "./timefilter/slice";

export const db = createInstance({
  name: "names",
});

const reducers = {
  people: peopleSplice.reducer,
  dateFilter: dateFilter.reducer,
  timeFilter: timeSlice.reducer,
};

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
