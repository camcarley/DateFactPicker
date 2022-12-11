import { dateToString, getMonthName } from "../date.util";
import { describe, it, expect } from "vitest";
import { MonthNumber } from "../../types/month";

let months: Array<{ month: MonthNumber; name: string }> = [
  { month: 1, name: "January" },
  { month: 2, name: "February" },
  { month: 3, name: "March" },
  { month: 4, name: "April" },
  { month: 5, name: "May" },
  { month: 6, name: "June" },
  { month: 7, name: "July" },
  { month: 8, name: "August" },
  { month: 9, name: "September" },
  { month: 10, name: "October" },
  { month: 11, name: "November" },
  { month: 12, name: "December" },
];

describe("dateToString", () => {
  months.forEach(({ month, name }) => {
    it("should return a string of the correct month and day", () => {
      expect(dateToString(1, month)).toBe(`${name} 1`);
    });

    it("should return a string of the correct month and day", () => {
      expect(dateToString(31, month)).not.toBe(`${name} 1`);
    });
  });
});

describe("getMonthName", () => {
  months.forEach(({ month, name }) => {
    it(`should return the month name for ${month}`, () => {
      expect(getMonthName(month)).toBe(name);
    });
  });
});
