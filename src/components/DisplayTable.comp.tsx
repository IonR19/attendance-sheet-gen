import React from "react";
import { Table } from "react-bulma-components";
import { selectEmployees, useTypedSelector } from "../store";
import { generate } from "../utils/functions";

interface Props {}

const DisplayTable: React.FC<Props> = (props) => {
  const { endAt, startAt, from, to } = useTypedSelector((s) => s.selection);
  const employees = useTypedSelector(selectEmployees);

  const data = generate(from, to, employees, {
    timeFrom: startAt,
    timeTo: endAt,
  });
  return (
    <Table hoverable size="fullwidth">
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
  );
};

export default DisplayTable;
