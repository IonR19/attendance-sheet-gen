import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface Person {
  name: string;
  fileNo: string;
  civilID: string;
  id?: string;
}

interface PersonStore {
  [id: string]: Person;
}

const peopleSplice = createSlice({
  name: "people",
  initialState: {} as PersonStore,
  reducers: {
    add: {
      prepare: (person: Person) => {
        return {
          payload: {
            ...person,
            id: v4(),
          },
        };
      },
      reducer: (state, { payload }: PayloadAction<Person>) => {
        state[payload.id!] = payload;
      },
    },
    remove: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      delete state[id];
    },
    edit: (state, { payload }: PayloadAction<{ id: string; civilID: string }>) => {
      state[payload.id].civilID = payload.civilID;
    },
    update: (state, { payload }: PayloadAction<Person>) => {
      state[payload.id!] = payload;
    },
  },
});

export const {
  add: addPeople,
  edit: editPeople,
  remove: removePeople,
  update: updatePeople,
} = peopleSplice.actions;

export default peopleSplice;
