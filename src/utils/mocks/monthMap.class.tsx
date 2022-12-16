import { MonthNumber } from "../../types/month";

export class MonthMap {
  private monthMap: Map<MonthNumber, Map<number, Array<string>>> = new Map<
    MonthNumber,
    Map<number, Array<string>>
  >();

  getFactsForDay(
    dayNumber: number,
    monthNumber: MonthNumber
  ): Array<string> | undefined {
    if (this.monthMap.has(monthNumber)) {
      const month = this.monthMap.get(monthNumber);
      if (month!.has(dayNumber)) {
        return month!.get(dayNumber)!;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  /**Add fail case for if string is already contained in said day */

  addFact(dayNumber: number, monthNumber: MonthNumber, fact: string) {
    if (!this.monthMap.has(monthNumber)) {
      this.monthMap.set(monthNumber, new Map<number, Array<string>>());
    }

    if (!this.monthMap.get(monthNumber)!.has(dayNumber)) {
      this.monthMap!.get(monthNumber)!.set(dayNumber, new Array<string>());
    }
    this.monthMap!.get(monthNumber)!.get(dayNumber)!.push(fact);
    return true;
  }
}
