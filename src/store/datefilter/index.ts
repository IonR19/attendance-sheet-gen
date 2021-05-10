import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iDateFilter {
  from: string;
  to: string;
}

const dateFilter = createSlice({
  name: "time",
  initialState: {
    from: "",
    to: "",
  } as iDateFilter,
  reducers: {
    set(state, { payload }: PayloadAction<iDateFilter>) {
      return payload;
    },
  },
});

export const { set: setDateFilter } = dateFilter.actions;

export default dateFilter;
