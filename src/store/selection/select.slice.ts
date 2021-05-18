import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "select",
  initialState: {
    from: "",
    to: "",
    startAt: "",
    endAt: "",
    isDynamic: false,
    threshold: 0 as number,
    weekends: false,
  },
  reducers: {
    setThreshold(state, { payload }: PayloadAction<number>) {
      state.threshold = payload;
    },
    setIsDynamic(state, { payload }: PayloadAction<boolean>) {
      state.isDynamic = payload;
    },
    setStartAt(state, { payload }: PayloadAction<string>) {
      state.startAt = payload;
    },
    setEndAt(state, { payload }: PayloadAction<string>) {
      state.endAt = payload;
    },
    setFrom(state, { payload }: PayloadAction<string>) {
      state.from = payload;
    },
    setTo(state, { payload }: PayloadAction<string>) {
      state.to = payload;
    },
    setWeekend(state, { payload }: PayloadAction<boolean>) {
      state.weekends = payload;
    },
  },
});

export const { setFrom, setTo, setStartAt, setEndAt, setIsDynamic, setThreshold, setWeekend } =
  slice.actions;
export default slice;
