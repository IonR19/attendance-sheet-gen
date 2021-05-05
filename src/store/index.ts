import { configureStore } from "@reduxjs/toolkit";
import people from "./people";

const reducers = {
  people: people.reducer,
};

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export * from "./people";

export default store;
