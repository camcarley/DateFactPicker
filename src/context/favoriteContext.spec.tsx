import { describe, expect, it, beforeEach } from "vitest";
import { FactContext } from "./favouriteContext";
import { Fact } from "../types/fact";
import React from "react";
import { mockFact1 } from "../utils/mocks/fact.mock";

describe("FactContext", () => {
  describe("addFactToList", () => {
    it("properly add fact to favorites", () => {
      const TestComponent = () => {
        const { facts, msg, addFactToList } = React.useContext(FactContext);
        addFactToList(mockFact1);
        expect(facts).toContain(mockFact1);
        expect(msg.status).toBe("success");
      };
    });

    it("properly prevent same fact being added twice favorites", () => {
      const TestComponent = () => {
        const { facts, msg, addFactToList } = React.useContext(FactContext);
        addFactToList(mockFact1);
        addFactToList(mockFact1);
        expect(facts.length).toBe(1);
      };
    });
  });

  describe("removeFactFromList", () => {
    it("properly remove fact from favorites", () => {
      const TestComponent = () => {
        const { facts, removeFactFromList, addFactToList } =
          React.useContext(FactContext);
        addFactToList(mockFact1);
        expect(facts).toContain(mockFact1);
        removeFactFromList(mockFact1.id);
        expect(facts).not.toContain(mockFact1);
      };
    });

    it("properly remove fact from favorites", () => {
      const TestComponent = () => {
        const { msg, removeFactFromList } = React.useContext(FactContext);
        removeFactFromList(mockFact1.id);
        expect(msg.status).toBe("error");
      };
    });
  });
});
