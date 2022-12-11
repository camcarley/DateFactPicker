import { useState, FormEvent, useContext } from "react";
import "./DateFactPicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { fetchFact } from "../../utils/fact.util";
import { Fact } from "../../types/fact";
import { MonthNumber } from "../../types/month";
import Datepicker from "react-datepicker";
import { dateToString } from "../../utils/date.util";
import { FactContext } from "../../context/favouriteContext";
import ActionNotification from "../ActionNotifications/ActionNotification";

const DateFactPicker: React.FC = () => {
  const { addFactToList, msg } = useContext(FactContext);
  let [fact, setFact] = useState<Fact>();
  let [selectedDate, setSelectedDate] = useState<Date>();

  /**
   *
   * @param e React.FormEvent
   * @param fact new fact to add to the list
   * @returns
   */
  const getFact = async (day: number, month: MonthNumber) => {
    const fact = await fetchFact(day, month);
    setFact(fact);
  };

  const addSelectedToFavouriteFacts = (e: FormEvent) => {
    e.preventDefault();
    addFactToList(fact!);
  };

  return (
    <div className="date_picker">
      <Datepicker
        selected={selectedDate}
        inline
        open={true}
        onChange={(date: Date) => {
          setSelectedDate(date);
          getFact(date.getDate(), (date.getMonth() + 1) as MonthNumber);
        }}
      />

      {selectedDate ? (
        <h2>
          {"A fact from " +
            dateToString(
              selectedDate.getDate(),
              (selectedDate.getMonth() + 1) as MonthNumber
            )}
        </h2>
      ) : (
        <></>
      )}
      <p>{fact ? fact.text : "Select a date to fetch a fact"}</p>
      <div>
        <button
          id="add_to_favorites"
          role={"button"}
          onClick={(e) => addSelectedToFavouriteFacts(e)}
        >
          Add to Favourites
        </button>
      </div>
      <ActionNotification description={msg?.text} msgStatus={msg?.status} />
    </div>
  );
};

export default DateFactPicker;
