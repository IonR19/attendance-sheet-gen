import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const selectDateFilter = () => useAppSelector((state) => state.dateFilter);
export const selectPeople = () => {
  let ppl = useAppSelector((state) => state.people);
  return Object.keys(ppl).map((k) => ppl[k]);
};
