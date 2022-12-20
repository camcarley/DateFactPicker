import { MonthNumber } from "../../types/month";

export class MonthMap {
	private monthMap: Map<MonthNumber, Map<number, Array<string>>> = new Map<MonthNumber, Map<number, Array<string>>>();

	getFactsForDay(dayNumber: number, monthNumber: MonthNumber): Array<string> {
		if (this.monthMap.has(monthNumber)) {
			const month = this.monthMap.get(monthNumber);
			if (month!.has(dayNumber)) {
				return month!.get(dayNumber)!;
			} else {
				return [];
			}
		} else {
			return [];
		}
	}

	addFact(dayNumber: number, monthNumber: MonthNumber, fact: string): boolean {
		if (!this.hasMonth(monthNumber)) {
			this.monthMap.set(monthNumber, new Map<number, Array<string>>());
		}

		if (!this.hasMonthAndDay(monthNumber, dayNumber)) {
			this.monthMap!.get(monthNumber)!.set(dayNumber, new Array<string>());
		}

		if (this.containsFactAlready(monthNumber, dayNumber, fact)) return false;

		this.monthMap!.get(monthNumber)!.get(dayNumber)!.push(fact);
		return true;
	}

	hasMonth(monthNumber: MonthNumber): boolean {
		if (!this.monthMap) return false;

		return this?.monthMap.has(monthNumber);
	}

	hasMonthAndDay(monthNumber: MonthNumber, monthDay: number): boolean {
		if (!this.monthMap) return false;
		if (!this.hasMonth(monthNumber)) return false;

		return this?.monthMap.get(monthNumber)!.has(monthDay);
	}

	containsFactAlready(monthNumber: MonthNumber, monthDay: number, fact: string): boolean {
		if (!this.hasMonthAndDay(monthNumber, monthDay)) return false;
		return this.monthMap.get(monthNumber)!.get(monthDay)!.includes(fact);
	}

	removeFact(dayNumber: number, monthNumber: MonthNumber, fact: string): boolean {
		if (!this.hasMonthAndDay(monthNumber, dayNumber)) return false;
		const facts = this.monthMap.get(monthNumber)!.get(dayNumber)!;
		const index = facts.indexOf(fact);
		if (index == -1) {
			return false
		}
		facts.splice(index, 1);
		return true;
	}
}
