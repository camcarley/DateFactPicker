import { fetchFact, sortByMonthAndDate } from "../fact.util";
import { describe, it, expect, vi } from "vitest";
import { mockFact1, mockFact2 } from "../mocks/fact.mock";

describe("fetchFact", () => {
  const fetch = (global.fetch = vi.fn());

  fetch.mockResolvedValueOnce({
    status: 200,
    statusText: "OK",
    ok: true,
    json: () => Promise.resolve(mockFact1),
  } as Response);

  it("should return a fact when Promise succesfully resolves", async () => {
    const result = await fetchFact(1, 1);
    expect(result).toEqual(mockFact1);
  });

  fetch.mockResolvedValueOnce({
    status: 500,
    statusText: "Internal Server Error",
    ok: false,
  } as Response);

  it("should return a fact when Promise unsuccesfully resolves", async () => {
    try {
      const result = await fetchFact(1, 1);
    } catch (e) {
      expect(e).toEqual(new Error("Error! status: Internal Server Error"));
    }
  });
});

describe("sortByMonthAndDate", () => {
  it("Should return -1 as Fact 1 month comes before Fact 2", () => {
    const result = sortByMonthAndDate(mockFact1, mockFact2);
    expect(result).toBe(-1);
  });

  it("Should return 1 as Fact 2 comes after Fact 1", () => {
    const result = sortByMonthAndDate(mockFact2, mockFact1);
    expect(result).toBe(1);
  });

  it("Should return 1 as Month A comes before Month B is earlier than fact 2", () => {
    mockFact2.day = mockFact1.day;
    const result = sortByMonthAndDate(mockFact2, mockFact1);
    expect(result).toBe(1);
  });

  it("Should return 0 as Fact 1 and Fact 2 are on the same day & month", () => {
    mockFact2.day = mockFact1.day;
    mockFact2.month = mockFact1.month;
    const result = sortByMonthAndDate(mockFact2, mockFact1);
    expect(result).toBe(0);
  });
});
