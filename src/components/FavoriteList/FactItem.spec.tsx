import { render } from "@testing-library/react";
import { describe, expect, test, vi, it } from "vitest";
import { mockContextWrapperHelper, mockFactContext } from "../../utils/mocks/factContext.mock";
import { mockFact1 as mockFact } from "../../utils/mocks/fact.mock";
import FactItem from "./FactItem";

describe("FavoriteItem", () => {
	const component = mockContextWrapperHelper(
		<FactItem id={mockFact.id} description={mockFact.text} index={1} removeFactFromList={() => {}} key={"1"} />
	);

	it("properly show FavoriteItem", () => {
		render(component);
		expect(component).toBeTruthy();
	});

	it("removeFact", () => {
		test("press button Delete fires removeFact", () => {
			const removeFactSpy = vi.spyOn(mockFactContext, "removeFactFromList");
			const { getByText } = render(component);
			expect(getByText("Delete")).toBeTruthy();
			expect(removeFactSpy).not.toHaveBeenCalled();
		});

		test("proper distance from top of component", () => {
			const { getByText } = render(component);
			const element = getByText(mockFact.text);
			expect(element.style.top).toBe(`${1 * 100}px`);
		});
	});
});
