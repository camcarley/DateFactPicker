import { createContext, useState } from "react";
import { Fact, Message } from "../types/fact";
import { dateToString } from "../utils/date.util";
import { sortByMonthAndDate } from "../utils/fact.util";

export interface FactListContextType {
  facts: Array<Fact>;
  msg: Message;
  addFactToList: (newFact: Fact) => void;
  removeFactFromList: (id: string) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}
export const FactContext = createContext<FactListContextType>(
  {} as FactListContextType
);

/**
 * The reasoning behind having setMsg / msg inside the file is for:
 *  1.  Improved UX, as the user can see the message as soon as they interact with a fact
 * 2.  The message is not dependent on the component, but rather the context
 */

const FactProvider: React.FC<ProviderProps> = ({ children }) => {
  const [facts, setFacts] = useState<Array<Fact>>([]);
  const [msg, setMsg] = useState<Message>({ text: "", status: "error" });

  /**
   *
   * @param newFact Add new fact to list of facts in context
   */
  const addFactToList = (newFact: Fact) => {
    if (!newFact) {
      setMsg({ text: "Failed to fetch fact", status: "error" });
      return;
    }
    const idx = facts.findIndex((fact) => fact.text === newFact.text);
    if (idx !== -1) {
      setMsg({
        text: "Fact already in list, reselect for a new fact from said date",
        status: "error",
      });
      return;
    }

    /**
     * The sort function's implementation is actually dependant on the browser. i.e Mozilla uses MergeSort , Chrome QuickSort for larger, and Insertion for smaller arrays
     */
    setFacts([...facts, newFact].sort((a, b) => sortByMonthAndDate(a, b)));
    setMsg({
      text: `Fact from ${dateToString(
        newFact.day,
        newFact.month
      )} added to list`,
      status: "success",
    });
  };

  /**
   * @param id Id of fact to remove from list
   */
  const removeFactFromList = (id: string) => {
    const idx = facts.findIndex((fact: Fact) => fact.id === id);
    if (idx === -1) {
      setMsg({ text: "Fact not found in list", status: "error" });
      return;
    }
    facts.splice(idx, 1);
    setFacts(facts);
    setMsg({ text: "Fact succesfully removed from list", status: "success" });
  };

  return (
    <FactContext.Provider
      value={{
        facts,
        msg,
        addFactToList,
        removeFactFromList,
      }}
    >
      {children}
    </FactContext.Provider>
  );
};

export default FactProvider;
