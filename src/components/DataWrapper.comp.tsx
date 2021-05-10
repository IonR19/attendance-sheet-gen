import React, { useEffect, useState } from "react";
import { iRecord } from "../types";
import DisplayTable from "./DisplayTable.comp";
import TimeFilter from "./TimeFilter.comp";
import { isLess } from "../utils/functions";
import { DateTime } from "luxon";
import People from "./People.comp";
import { selectPeople, selectTimeFilter } from "../hooks";
import Controls from "./Controls.comp";

interface Props {}

const DataWrapper = (props: Props) => {
  const filterDate = selectTimeFilter();

  const names = selectPeople();

  const [data, setData] = useState<iRecord[]>([]);

  const expandData = () => {
    let startDate = DateTime.fromFormat(filterDate.from, "yyyy-mm-dd");
    let endDate = DateTime.fromFormat(filterDate.to, "yyyy-mm-dd");
    let table: iRecord[] = [];

    if (!startDate.isValid || !endDate.isValid) {
      return;
    }
    if (endDate.diff(startDate).days > 31) {
      return;
    }

    for (; isLess(startDate, endDate); startDate = startDate.plus({ days: 1 })) {
      for (let index = 0; index < names.length; index++) {
        const element = names[index];

        if (startDate.weekday == 6 || startDate.weekday == 5) {
          continue;
        }

        for (let it = 0; it < 2; ++it) {
          table.push({
            civilID: element.civilID,
            fileNo: element.fileNo,
            type: it == 0 ? "F1" : "F2",
            date: startDate.toISODate(),
            timeIn: it == 0 ? "09:00" : "13:00",
            location: "مبنى الوزارة الرئيسي",
          });
        }
      }
    }
    setData(table);
  };
  useEffect(() => {
    expandData();
  }, [filterDate]);

  return (
    <>
      <TimeFilter />
      <DisplayTable data={data} />
      <People />
      <Controls />
    </>
  );
};

export default DataWrapper;
