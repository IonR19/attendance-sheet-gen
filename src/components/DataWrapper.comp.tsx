import React, { useEffect, useState } from "react";
import { iRecord } from "../types";
import DisplayTable from "./DisplayTable.comp";
import TimeFilter from "./TimeFilter.comp";
import { data as names } from "../../seed/data";
import { isLess } from "../utils/functions";
import { DateTime } from "luxon";

interface Props {}

const DataWrapper = (props: Props) => {
  const [filterDate, setFilterDate] = useState({
    from: "",
    to: "",
  });

  const [data, setData] = useState<iRecord[]>(
    names.map(({ civilID, fileNo, name }) => {
      return {
        name,
        civilID,
        fileNo,
        date: "x",
        type: "F1",
        timeIn: "2020",
        location: "",
      };
    })
  );

  useEffect(() => {
    let startDate = DateTime.fromFormat("yyyy-mm-dd", filterDate.from);
    let endDate = DateTime.fromFormat("yyyy-mm-dd", filterDate.to);
    let table: iRecord[] = [];

    if (startDate && endDate) {
      while (isLess(startDate, endDate)) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          if (startDate.weekday !== 6 && startDate.weekday !== 5) {
            table.push({
              civilID: element.civilID,
              fileNo: element.fileNo,
              type: "F1",
              date: startDate.toISODate().toString(),
              timeIn: "09:00",
              location: "مبنى الوزارة الرئيسي",
            });
            table.push({
              civilID: element.civilID,
              fileNo: element.fileNo,
              type: "F2",
              date: startDate.toISODate().toString(),
              timeIn: "13:00",
              location: "مبنى الوزارة الرئيسي",
            });
          }
        }

        startDate = startDate.plus({
          days: 1,
        });
      }
      setData(table);
    }
  }, [filterDate]);

  return (
    <>
      <TimeFilter
        atChange={(e) => {
          setFilterDate(e);
        }}
      />
      <DisplayTable data={data} />
    </>
  );
};

export default DataWrapper;
