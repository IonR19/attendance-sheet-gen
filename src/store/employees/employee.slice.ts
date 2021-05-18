import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface iEmployee {
  id?: string;
  name?: string;
  civil_id: string;
  file_no: string;
}

const slice = createSlice({
  name: "employee",
  initialState: {
    people: {} as { [id: string]: iEmployee },
  },
  reducers: {
    addGroup(state, { payload }: PayloadAction<iEmployee[]>) {
      let toAdd = payload.reduce((pre, cur) => {
        pre[cur.id!] = cur;
        return pre;
      }, {} as typeof state.people);
      state.people = { ...state.people, ...toAdd };
    },
    add(state, { payload }: PayloadAction<iEmployee>) {
      state.people[payload.id!] = payload;
    },
    remove(state, { payload }: PayloadAction<string>) {
      delete state.people[payload];
    },
  },
});

export const { add, remove } = slice.actions;
export default slice;
