import React, { useState } from "react";
import { iRange } from "../types";
interface Props {
  atChange?: (data: iRange) => any;
}

const TimeFilter = (props: Props) => {
  const [filterDate, setFilterDate] = useState<iRange>({
    from: "",
    to: "",
  });

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilterDate({
      ...filterDate,
      [name]: value,
    });

    props.atChange?.(filterDate);
  };

  return (
    <>
      <label htmlFor="in">From</label>
      <input type="date" id="from" name="from" value={filterDate.from} onChange={handleDateInput} />

      <label htmlFor="to">To</label>
      <input type="date" id="to" name="to" value={filterDate.to} onChange={handleDateInput} />
    </>
  );
};

export default TimeFilter;
