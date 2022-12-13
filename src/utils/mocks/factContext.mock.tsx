import React from "react";
import { FactListContextType } from "../../contexts/favouriteContext";
import { Fact } from "../../types/fact";
import { FactContext } from "../../contexts/favouriteContext";

export const mockFactContext: FactListContextType = {
  facts: [],
  msg: {
    status: "success",
    text: "",
  },
  addFactToList: (fact: Fact) => {},
  removeFactFromList: (id: string) => {},
};

export const mockContextWrapperHelper = (child: React.ReactNode) => {
  return (
    <FactContext.Provider value={mockFactContext}>{child}</FactContext.Provider>
  );
};
