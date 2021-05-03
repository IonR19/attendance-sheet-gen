import React from "react";
import { iRecord } from "../types";

interface Props {
  data: iRecord[];
}

const DisplayTable = (props: Props) => {
  return (
    <table>
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
        {props.data.map((record, index) => {
          const { civilID, date, fileNo, location, timeIn, type } = record;
          return (
            <tr key={index}>
              <td>{civilID}</td>
              <td>{date}</td>
              <td>{timeIn}</td>
              <td>{type}</td>
              <td>{fileNo}</td>
              {location && <td>{location}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DisplayTable;
