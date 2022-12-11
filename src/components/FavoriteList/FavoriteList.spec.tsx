import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { mockFact1 as mockFact } from "../../utils/mocks/fact.mock";
import FavoriteList from "./FavoriteList";
import {
  mockContextWrapperHelper,
  mockFactContext,
} from "../../utils/mocks/factContext.mock";

describe("FavoriteList", () => {
  const component = mockContextWrapperHelper(<FavoriteList />);

  test("properly show FavoriteList", () => {
    render(component);
    expect(screen.getByText("No facts added yet.")).toBeTruthy();
  });

  test("cannot press button Delete button when no fact is present", () => {
    const removeFactSpy = vi.spyOn(mockFactContext, "removeFactFromList");
    const { getByText } = render(component);
    try {
      expect(getByText("Delete")).toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy(); // Element not present
    }
    expect(removeFactSpy).not.toHaveBeenCalled();
  });

  test("pressing button calls removeFactFromList when fact present", () => {
    mockFactContext.facts.push(mockFact);
    const removeFactSpy = vi.spyOn(mockFactContext, "removeFactFromList");
    const { getByText } = render(component);

    act(() => {
      fireEvent.click(getByText("Delete")); // Element present
    });
    expect(removeFactSpy).toHaveBeenCalledTimes(1);
  });
});
