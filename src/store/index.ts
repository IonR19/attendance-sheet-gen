import { configureStore } from "@reduxjs/toolkit";
import people from "./people";
import timefilter from "./timefilter";

const reducers = {
  people: people.reducer,
  timefilter: timefilter.reducer,
};

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export * from "./people";

export default store;
