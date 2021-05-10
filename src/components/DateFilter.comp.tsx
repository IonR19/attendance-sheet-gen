import React from "react";
import { useDispatch } from "react-redux";
import { selectDateFilter } from "../hooks";
import { setDateFilter } from "../store";
interface Props {}

const DateFilter = (props: Props) => {
  const { from, to } = selectDateFilter();
  const dispatch = useDispatch();

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(
      setDateFilter({
        from,
        to,
        [name]: value,
      })
    );
  };

  return (
    <>
      <label htmlFor="in">From</label>
      <input type="date" id="from" name="from" onChange={handleDateInput} />

      <label htmlFor="to">To</label>
      <input type="date" id="to" name="to" onChange={handleDateInput} />
    </>
  );
};

export default DateFilter;
