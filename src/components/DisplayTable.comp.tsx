import React from "react";
import { selectActiveEmployees, useTypedSelector } from "../store";
import { generate, getRandomFromRange } from "../utils/functions";
import * as luxon from "luxon";
import { Button, Columns, Table } from "react-bulma-components";
import { utils, writeFile } from "xlsx";

interface Props {}

const DisplayTable: React.FC<Props> = (props) => {
  const { endAt, startAt, from, to, weekends, isDynamic, threshold, error } = useTypedSelector(
    (s) => s.selection
  );
  const employees = useTypedSelector(selectActiveEmployees);

  const data = generate(from, to, employees, {
    timeFrom: startAt,
    timeTo: endAt,
    skipFn: weekends ? (dt) => dt.weekday == 6 || dt.weekday == 5 : undefined,
    timeModifier: isDynamic
      ? (start, tm) => {
          const extra = getRandomFromRange(0, threshold);
          let modifiedTime = luxon.Duration.fromISOTime(tm);
          modifiedTime = modifiedTime.plus({ minutes: start ? -extra : extra });
          return modifiedTime.toISOTime();
        }
      : undefined,
  });

  const onClick = () => {
    let dataToExport = utils.json_to_sheet(data);
    let workbook = utils.book_new();
    workbook.SheetNames.push("Sheet1");
    workbook.Sheets = { Sheet1: dataToExport };
    writeFile(workbook, "attendance.xlsx", { bookType: "xlsx" });
  };

  return (
    <>
      <Columns>
        <Columns.Column alignItems="center">
          <Button type="button" color="primary" display="block" onClick={onClick}>
            Export as Excel (beta)
          </Button>
        </Columns.Column>
      </Columns>
      {error}
      {!error && (
        <Table size="fullwidth">
          <thead>
            <tr>
              <th>civil_id</th>
              <th>dateValue</th>
              <th>Timevalue</th>
              <th>tamsg</th>
              <th>file no</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((record, index) => {
                const { civil_id, date, file_no, location, timeIn, type } = record;
                return (
                  <tr key={index}>
                    <td>{civil_id}</td>
                    <td>{date}</td>
                    <td>{timeIn}</td>
                    <td>{type}</td>
                    <td>{file_no}</td>
                    {location && <td>{location}</td>}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default DisplayTable;
