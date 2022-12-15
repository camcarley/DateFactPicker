import { dateToString, getMonthName } from "../date.util";
import { describe, it, expect, test } from "vitest";
import { MockMonths as months } from "../mocks/month.mock";

describe("Date Util", () => {
  test("dateToString", () => {
    months.forEach(({ month, name }) => {
      it("should return a string of the correct month and day", () => {
        expect(dateToString(1, month)).toBe(`${name} 1`);
      });

      it("should return a string of the correct month and day", () => {
        expect(dateToString(31, month)).not.toBe(`${name} 1`);
      });
    });
  });

  test("getMonthName", () => {
    months.forEach(({ month, name }) => {
      it(`should return the month name for ${month}`, () => {
        expect(getMonthName(month)).toBe(name);
      });
    });
  });
});
