import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUser } from "../../types";
import { v4 } from "uuid";

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
    addEmployee: {
      prepare(emp: iUser) {
        return {
          payload: {
            id: v4(),
            ...emp,
          },
        };
      },
      reducer(state, { payload }: PayloadAction<iUser>) {
        state.people[payload.id!] = payload;
      },
    },

    removeEmployee(state, { payload }: PayloadAction<string>) {
      delete state.people[payload];
    },
  },
});

export const { addEmployee, removeEmployee } = slice.actions;
export default slice;
