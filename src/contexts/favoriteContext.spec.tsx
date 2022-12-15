import { describe, expect, it, beforeEach, test } from "vitest";
import { FactContext } from "./favouriteContext";
import React from "react";
import { mockFact1 } from "../utils/mocks/fact.mock";

describe("FactContext", () => {
  it("addFactToList", () => {
    test("properly add fact to testites", () => {
      const TestComponent = () => {
        const { facts, msg, addFactToList } = React.useContext(FactContext);
        addFactToList(mockFact1);
        expect(facts).toContain(mockFact1);
        expect(msg.status).toBe("success");
      };
    });

    test("properly prevent same fact being added twice favorites", () => {
      const TestComponent = () => {
        const { facts, msg, addFactToList } = React.useContext(FactContext);
        addFactToList(mockFact1);
        addFactToList(mockFact1);
        expect(facts.length).toBe(1);
      };
    });
  });

  it("removeFactFromList", () => {
    test("properly remove fact from favorites", () => {
      const TestComponent = () => {
        const { facts, removeFactFromList, addFactToList } =
          React.useContext(FactContext);
        addFactToList(mockFact1);
        expect(facts).toContain(mockFact1);
        removeFactFromList(mockFact1.id);
        expect(facts).not.toContain(mockFact1);
      };
    });

    test("properly remove fact from favorites", () => {
      const TestComponent = () => {
        const { msg, removeFactFromList } = React.useContext(FactContext);
        removeFactFromList(mockFact1.id);
        expect(msg.status).toBe("error");
      };
    });
  });
});
