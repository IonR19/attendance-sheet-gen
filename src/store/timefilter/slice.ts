import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  from: "",
  to: "",
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<typeof initialState>) => {
      return action.payload;
    },
  },
});

export const { setTime } = timeSlice.actions;

export default timeSlice;
