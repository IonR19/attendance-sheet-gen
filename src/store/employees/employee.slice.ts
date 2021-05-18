import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUser } from "../../types";

const slice = createSlice({
  name: "employee",
  initialState: {
    people: {} as { [id: string]: iUser },
  },
  reducers: {
    addGroup(state, { payload }: PayloadAction<iUser[]>) {
      let toAdd = payload.reduce((pre, cur) => {
        pre[cur.id!] = cur;
        return pre;
      }, {} as typeof state.people);
      state.people = { ...state.people, ...toAdd };
    },
    add(state, { payload }: PayloadAction<iUser>) {
      state.people[payload.id!] = payload;
    },
    remove(state, { payload }: PayloadAction<string>) {
      delete state.people[payload];
    },
  },
});

export const { add, remove } = slice.actions;
export default slice;
