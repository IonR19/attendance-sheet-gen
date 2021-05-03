export interface iUser {
  name?: string;
  civilID: string;
  fileNo: string;
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