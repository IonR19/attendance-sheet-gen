import React from "react";
import { useDispatch } from "react-redux";
import { selectTimeFilter } from "../hooks";
import { setTimeFilter } from "../store";
interface Props {}

const TimeFilter = (props: Props) => {
  const { from, to } = selectTimeFilter();
  const dispatch = useDispatch();

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(
      setTimeFilter({
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

export default TimeFilter;
