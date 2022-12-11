import { useContext, useEffect, useState } from "react";
import { FactContext } from "../../context/favouriteContext";
import { Fact } from "../../types/fact";
import { MonthNumber } from "../../types/month";
import { getMonthName } from "../../utils/date.util";
import FactItem from "./FactItem";
import "./FavoriteList.css";

const FavoriteList: React.FC = () => {
  const { facts, removeFactFromList } = useContext(FactContext);
  const [listOfMonths, setListOfMonths] = useState<Array<MonthNumber>>([]);
  let [monthToFilterBy, setMonthToFilterBy] = useState<MonthNumber>();
  let [displayedFacts, setDisplayedFacts] = useState<Array<Fact>>(facts);

  useEffect(() => {
    const months: Array<MonthNumber> = [];
    facts.forEach((fact: Fact) => {
      if (!months.includes(fact.month)) {
        months.push(fact.month);
      }
    });
    setListOfMonths(months);
    return () => {
      setListOfMonths([]);
    };
  }, [removeFactFromList]);

  useEffect(() => {
    if (monthToFilterBy) {
      let shownFacts = facts.filter((fact: Fact) => {
        return fact.month === monthToFilterBy;
      });
      if (shownFacts.length === 0) {
        setMonthToFilterBy(undefined);
        setDisplayedFacts(facts);
      } else {
        setDisplayedFacts(shownFacts);
      }
    } else {
      setDisplayedFacts(facts);
    }
  }, [monthToFilterBy, removeFactFromList]);

  /*
   * This function is called when the user selects a month from the dropdown
   * It sets the monthToFilterBy state to the selected month, to then filter from
   * */
  const handleMonthFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthToFilterBy(Number(e.target.value) as MonthNumber);
  };

  return (
    <div className="App">
      {listOfMonths.length > 0 ? (
        <>
          <label>Filter by:</label>
          <select
            onChange={(e) => handleMonthFilterChange(e)}
            className="month_select"
            aria-label="Select a month to filter by"
          >
            <option value={0}>
              {monthToFilterBy ? "Return to Default" : "Select a month"}
            </option>
            {listOfMonths.map((monthNumber: MonthNumber) => {
              return (
                <option
                  aria-label={getMonthName(monthNumber)}
                  key={monthNumber}
                  value={monthNumber}
                >
                  {getMonthName(monthNumber)}
                </option>
              );
            })}
          </select>
        </>
      ) : (
        <></>
      )}
      {displayedFacts.length > 0 ? (
        <div
          className="outerbox"
          style={{
            border: "1px solid darkgrey",
            overflowY: "scroll",
            height: 500,
            width: 1000,
            margin: "0 auto",
          }}
        >
          <div
            className="innerbox"
            style={{
              position: "relative",
              height: innerHeight,
            }}
          >
            {displayedFacts.map((fact: Fact, index: number) => {
              return (
                <FactItem
                  key={fact.id}
                  id={fact.id}
                  index={index}
                  itemHeight={100}
                  description={fact.text}
                  removeFactFromList={removeFactFromList}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>No facts added yet.</div>
      )}
    </div>
  );
};
export default FavoriteList;
