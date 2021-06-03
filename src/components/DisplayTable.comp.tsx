import React from "react";
import { Form, Table } from "react-bulma-components";
import { selectActiveEmployees, useTypedSelector } from "../store";
import { generate, getRandomFromRange } from "../utils/functions";
import * as luxon from "luxon";

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
          return modifiedTime.toFormat("hh:mm").toString();
        }
      : undefined,
  });

  return (
    <>
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
