export interface iUser {
  id?: string;
  name?: string;
  civil_id: string;
  file_no: string;
}

export interface iRecord extends iUser {
  type: "F1" | "F2";
  date: string;
  timeIn: string;
  location: string;
}

interface startEnd {
  startTime: string;
  endTime: string;
  duration?: never;
}

interface startDuration {
  startTime: string;
  duration: string;
  endTime?: never;
}

export type variable = {
  type: "F1" | "F2";
  date: string;
} & (startEnd | startDuration);

export interface ivariable  {

}

export const x: variable = {
  type: "F1",
  date: "2020-02-01",
  startTime: "12:00:00",
  duration: "8h",
};

export type iRange = {
  from: string;
  to: string;
};
