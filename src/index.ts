import { DateTime } from "luxon";
import { data } from "../seed/data";
import { isLess } from "./utils/functions";
import { iRecord } from "./utils/types";

let startDate = DateTime.fromJSDate(new Date("2020-07-16"));
let endDate = DateTime.fromJSDate(new Date("2020-09-05"));
// let endDate = DateTime.fromJSDate(new Date("2021-04-30"));



// -- main

let table: iRecord[] = [];

while (isLess(startDate, endDate)) {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    if (startDate.weekday !== 6 && startDate.weekday !== 5) {
      table.push({
        civilID: element.civilID,
        fileNo: element.fileNo,
        type: "F1",
        date: startDate.toISODate().toString(),
        timeAt: "09:00",
        location: "مبنى الوزارة الرئيسي",
      });
      table.push({
        civilID: element.civilID,
        fileNo: element.fileNo,
        type: "F2",
        date: startDate.toISODate().toString(),
        timeOut: "13:00",
        location: "مبنى الوزارة الرئيسي",
      });
    }
  }

  startDate = startDate.plus({
    days: 1,
  });
}
appendToBody(table);
//

function appendToBody(data: iRecord[]) {
  let body = document.querySelector("body")!;

  body.innerHTML = `<table>
  <head></thead>
  <tbody>
  ${data.map((record) => {
    const { civilID, timeOut, location, type, date, fileNo, timeAt } = record;
    return `<tr>
      <td>${civilID}</td>
      <td>${date}</td>
      <td>${timeAt ?? timeOut}</td>
      <td>${type}</td>
      <td>${fileNo}</td>
      <td>${location}</td>
    </tr>`;
  })}
  </tbody>
  </table>`;
}
function isWeekend() {}
