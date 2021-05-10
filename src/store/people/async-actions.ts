import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, RootState } from "..";
import { Person } from "./slice";

const dbkey = "people";

export const save = createAsyncThunk("save", async (_, thunkAPI) => {
  const { people } = thunkAPI.getState() as RootState;
  let arr = Object.keys(people).map((k) => people[k]);
  await db.setItem(dbkey, JSON.stringify(arr));
  return true;
});

export const load = createAsyncThunk("load", async (state, thunkAPI) => {
  let data = (await db.getItem(dbkey)) as string;
  const array = JSON.parse(data) as Person[];
  return array;
});
