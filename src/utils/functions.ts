import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { setError } from "../store";
import store from "../store/store";
import { iRecord, iUser } from "../types";

export function getRandomFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  timeModifier?: (start: boolean, time: string) => string;
};

export function generate(
  from: string,
  to: string,
  employees: iUser[],
  {
    timeFrom = "09:00",
    timeTo = "13:00",
    location = "مبنى الوزارة الرئيسي",
    limit = 10000,
    ...opt
  }: options
) {
  let currentDate = DateTime.fromISO(from);
  let endDate = DateTime.fromISO(to);

  if (estimatedDays(currentDate, endDate) * employees.length * 2 >= limit) {
    store.dispatch(setError("exceeded the 10,000 row limit"));
    return [];
  }

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
        timeIn:
          opt?.timeModifier?.(true, timeFrom) ??
          DateTime.fromFormat(timeFrom, "hh:mm").toFormat("hh:mm:ss"),
        location,
      });
      table.push({
        civil_id: element.civil_id,
        file_no: element.file_no,
        type: "F2",
        date: currentDate.toISODate().toString(),
        timeIn:
          opt?.timeModifier?.(false, timeTo) ??
          DateTime.fromFormat(timeTo, "hh:mm").toFormat("hh:mm:ss"),
        location,
      });
    }
    if (limit === 0) {
      store.dispatch(setError("exceeded the 10,000 row limit"));
      return [];
    }
    currentDate = currentDate.plus({
      days: 1,
    });
  }
  store.dispatch(setError(""));
  return table;
}

function estimatedDays(startDate: DateTime, otherDate: DateTime): number {
  return otherDate.diff(startDate, "days").days;
}
