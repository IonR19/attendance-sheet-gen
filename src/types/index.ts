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

export type iRange = {
  from: string;
  to: string;
};
