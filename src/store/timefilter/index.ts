import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iTimefilter {
  from: string;
  to: string;
}

const timefilter = createSlice({
  name: "time",
  initialState: {
    from: "",
    to: "",
  } as iTimefilter,
  reducers: {
    set(state, { payload }: PayloadAction<iTimefilter>) {
      return payload;
    },
  },
});

export const { set: setTimeFilter } = timefilter.actions;

export default timefilter;
