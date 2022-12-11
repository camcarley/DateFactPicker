import { MonthNumber } from "./month";

export type Fact = {
  id: string;
  text: string;
  year: number;
  day: number;
  month: MonthNumber;
};

export type MessageStatus = "success" | "error";

export type Message = {
  text: string;
  status: MessageStatus;
};
