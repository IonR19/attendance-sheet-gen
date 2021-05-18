import { DateTime } from "luxon";
import { iRecord, iUser } from "../types";

export function isLess(date1: DateTime, date2: DateTime) {
  return date1.toMillis() < date2.toMillis();
}

type options = {
  skipdates?: string[];
  skipFn?: (dt: DateTime) => boolean;
  timeFrom?: string;
  timeTo?: string;
  location?: string;
  limit?: number;
};

export function generate(
  from: string,
  to: string,
  employees: iUser[],
  {
    timeFrom = "09:00",
    timeTo = "13:00",
    location = "مبنى الوزارة الرئيسي",
    limit = 100000,
    ...opt
  }: options
) {
  let currentDate = DateTime.fromFormat(from, "yyyy-mm-dd");
  let endDate = DateTime.fromFormat(to, "yyyy-mm-dd");
  let table: iRecord[] = [];

  while (isLess(currentDate, endDate) && limit > -1) {
    --limit;
    for (let index = 0; index < employees.length; index++) {
      const element = employees[index];
      if (opt?.skipdates?.some((i) => i === currentDate.toISODate()) || opt?.skipFn?.(currentDate))
        continue;
      table.push({
        civil_id: element.civil_id,
        file_no: element.file_no,
        type: "F1",
        date: currentDate.toISODate().toString(),
        timeIn: timeFrom,
        location,
      });
      table.push({
        civil_id: element.civil_id,
        file_no: element.file_no,
        type: "F2",
        date: currentDate.toISODate().toString(),
        timeIn: timeTo,
        location,
      });
    }
    currentDate = currentDate.plus({
      days: 1,
    });
  }
  return table;
}
