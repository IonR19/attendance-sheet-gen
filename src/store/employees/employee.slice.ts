import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUser } from "../../types";
import { v4 } from "uuid";

interface iEmployeeSettings {
  disabled: boolean;
}

const slice = createSlice({
  name: "employee",
  initialState: {
    people: {} as { [id: string]: iUser & iEmployeeSettings },
  },
  reducers: {
    addGroup: {
      prepare(data: iUser[]) {
        let invalidData = data.filter(
          (row) => !(`${row.file_no}`.length === 5 && `${row.civil_id}`.length === 12)
        );
        if (invalidData.length) {
          alert(
            "some values were not added because of invalid enteries " +
              JSON.stringify(invalidData.slice(0, 3))
          );
        }
        data = data.filter((row) => row.file_no.length === 5 && row.civil_id.length === 12);
        data.forEach((el) => (el.id = v4()));
        return {
          payload: data,
        };
      },
      reducer(state, { payload }: PayloadAction<iUser[]>) {
        let toAdd = payload.reduce((pre, cur) => {
          pre[cur.id!] = { ...cur, disabled: false };
          return pre;
        }, {} as typeof state.people);
        state.people = { ...state.people, ...toAdd };
      },
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
        state.people[payload.id!] = { ...payload, disabled: false };
      },
    },
    toggleUser(state, { payload }: PayloadAction<string>) {
      state.people[payload].disabled = !state.people[payload].disabled;
    },
    toggleAllUser(state, { payload }: PayloadAction<boolean>) {
      for (let k in state.people) {
        state.people[k].disabled = payload;
      }
    },
    flipAllUsers(state) {
      for (let k in state.people) {
        state.people[k].disabled = !state.people[k].disabled;
      }
    },
    removeEmployee(state, { payload }: PayloadAction<string>) {
      delete state.people[payload];
    },
  },
});

export const { addEmployee, removeEmployee, addGroup, toggleUser, toggleAllUser, flipAllUsers } =
  slice.actions;
export default slice;
