import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import DateFactPicker from "./DateFactPicker";
import { mockFact1 as mockFact } from "../../utils/mocks/fact.mock";
import {
  mockContextWrapperHelper,
  mockFactContext,
} from "../../utils/mocks/factContext.mock";
import * as factUtil from "../../utils/fact.util";

describe("DateFactPicker", () => {
  describe("renders properly", () => {
    it("properly show date picker", () => {
      render(<DateFactPicker />);
      expect(screen.getByText("Select a date to fetch a fact")).toBeTruthy();
    });
  });
  describe("getFact", async () => {
    it("should call fetchFact with correct params", () => {
      const currentMonth = new Date().getMonth() + 1;
      const { getByText } = render(
        mockContextWrapperHelper(<DateFactPicker />)
      );
      let fetchFact = vi
        .spyOn(factUtil, "fetchFact")
        .mockImplementationOnce(() => Promise.resolve(mockFact));
      act(() => {
        fireEvent.click(getByText("1"));
      });
      expect(fetchFact).toHaveBeenCalledWith(1, currentMonth);
    });
    describe("addToFavouriteFacts", () => {
      it("pressing button calls addFactToList when fact selected", () => {
        const addFactSpy = vi.spyOn(mockFactContext, "addFactToList");
        const { getByText } = render(
          mockContextWrapperHelper(<DateFactPicker />)
        );
        const btn = getByText("Add to Favourites");

        btn.click();
        expect(addFactSpy).toHaveBeenCalledOnce();
      });
    });
  });
});
