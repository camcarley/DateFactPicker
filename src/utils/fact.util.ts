/**
 * Using uuidv4 to generate a unique id for each fact, would use a database in a real app
 */
import { v4 as uuidv4 } from "uuid";
import { Fact } from "../types/fact";
import { MonthNumber } from "../types/month";

/**
 *
 * @param dayNumber day of the month
 * @param monthNumber number of the month
 * @returns a
 */
export const fetchFact = async (
  dayNumber: number,
  monthNumber: MonthNumber
) => {
  const res: Response = await fetch(
    `http://numbersapi.com/${monthNumber}/${dayNumber}/date?json`,
    {
      method: "GET",
    }
  );

  if (!res?.ok) {
    throw new Error(`Error! status: ${res?.statusText}`);
  }
  const fact: Fact = (await res.json()) as Fact;
  fact.day = dayNumber;
  fact.month = monthNumber;
  fact.id = uuidv4();
  return fact;
};

/**
 * @param a comparator A
 * @param b comparator B
 * @returns based on the month and date, return -1 if a comes before b, 1 if a comes after b, 0 if they are the same
 */
export const sortByMonthAndDate = (a: Fact, b: Fact) => {
  if (a.month !== b.month) {
    // If the months are different, sort by month
    return a.month - b.month;
  } else {
    // If the months are the same, sort by date
    return a.day - b.day;
  }
};
