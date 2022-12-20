import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi, test } from "vitest";
import { act } from "react-dom/test-utils";
import DateFactPicker from "./DateFactPicker";
import { mockFact1 as mockFact } from "../../utils/mocks/fact.mock";
import { mockContextWrapperHelper, mockFactContext } from "../../utils/mocks/factContext.mock";
import * as factUtil from "../../utils/fact.util";

describe("DateFactPicker", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders properly", () => {
		test("properly show date picker", () => {
			render(<DateFactPicker />);
			expect(screen.getByText("Select a date to fetch a fact")).toBeTruthy();
		});
	});

	it("getFact", () => {
		test("should call fetchFact with correct params when interacting with", () => {
			const currentMonth = new Date().getMonth() + 1;
			const { getByText } = render(mockContextWrapperHelper(<DateFactPicker />));
			let fetchFact = vi.spyOn(factUtil, "fetchFact").mockImplementationOnce(() => Promise.resolve(mockFact));

			act(() => {
				fireEvent.click(getByText("1"));
			});
			expect(fetchFact).toHaveBeenCalledWith(1, currentMonth);
		});

		it("isAddButtonDisabled", () => {
			test("should return false when fact is not undefined", () => {
				const { getByText } = render(mockContextWrapperHelper(<DateFactPicker />));

				vi.spyOn(factUtil, "fetchFact").mockImplementationOnce(() => Promise.resolve(mockFact));

				act(() => {
					fireEvent.click(getByText("1"));
				});

				const btn: HTMLButtonElement = getByText("Add to Favourites") as HTMLButtonElement;

				expect(btn.disabled).toBe(false);
			});

			test("should return true when fact is undefined", () => {
				const { getByText } = render(mockContextWrapperHelper(<DateFactPicker />));

				const btn: HTMLButtonElement = getByText("Add to Favourites") as HTMLButtonElement;

				expect(btn.disabled).toBe(true);
			});
		});

		it("addToFavouriteFacts", () => {
			test("pressing button calls addFactToList when fact selected", () => {
				const addFactSpy = vi.spyOn(mockFactContext, "addFactToList");
				const { getByText } = render(mockContextWrapperHelper(<DateFactPicker />));
				const btn = getByText("Add to Favourites") as HTMLButtonElement;

				btn.click();
				btn.disabled = false;
				expect(addFactSpy).toHaveBeenCalledOnce();
			});
		});
	});
});
