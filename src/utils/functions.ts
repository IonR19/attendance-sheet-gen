import { DateTime } from "luxon";
import { iRecord, iUser } from "../types";

export function isLess(date1: DateTime, date2: DateTime) {
  return date1.toMillis() < date2.toMillis();
}

type options = {
  skipdates?: string[];
  timeFrom?: string;
  timeTo?: string;
  location?: string;
};

export function generate(
  from: string,
  to: string,
  employees: iUser[],
  { timeFrom = "09:00", timeTo = "13:00", location = "مبنى الوزارة الرئيسي", ...opt }: options
) {
  let startDate = DateTime.fromFormat("yyyy-mm-dd", from);
  let endDate = DateTime.fromFormat("yyyy-mm-dd", to);
  let table: iRecord[] = [];

  if (startDate && endDate) {
    while (isLess(startDate, endDate)) {
      for (let index = 0; index < employees.length; index++) {
        const element = employees[index];
        if (
          startDate.weekday === 5 ||
          startDate.weekday === 6 ||
          opt?.skipdates?.some((i) => i === startDate.toISODate())
        )
          continue;
        table.push({
          civil_id: element.civil_id,
          file_no: element.file_no,
          type: "F1",
          date: startDate.toISODate().toString(),
          timeIn: timeFrom,
          location,
        });
        table.push({
          civil_id: element.civil_id,
          file_no: element.file_no,
          type: "F2",
          date: startDate.toISODate().toString(),
          timeIn: timeTo,
          location,
        });
      }

      startDate = startDate.plus({
        days: 1,
      });
    }
    return table;
  }
}
