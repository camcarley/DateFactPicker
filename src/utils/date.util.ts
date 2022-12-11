import { Month, MonthNumber } from "../types/month";

export const dateToString = (day: number, month: MonthNumber) => {
  /**
   * Return Month name and day from date
   */
  return `${monthMap.get(month)} ${day}`;
};

export const getMonthName = (month: MonthNumber) => {
  return monthMap.get(month);
};

const monthMap: Map<MonthNumber, Month> = new Map([
  [1, "January"],
  [2, "February"],
  [3, "March"],
  [4, "April"],
  [5, "May"],
  [6, "June"],
  [7, "July"],
  [8, "August"],
  [9, "September"],
  [10, "October"],
  [11, "November"],
  [12, "December"],
]);
