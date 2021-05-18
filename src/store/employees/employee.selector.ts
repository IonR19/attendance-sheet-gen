import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectEmp = (state: RootState) => {
  return state.employee.people;
};

export const selectEmployees = createSelector([selectEmp], (res) => {
  return Object.values(res);
});
