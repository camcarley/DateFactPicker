import DateFactPicker from "./components/DateFactPicker/DateFactPicker";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import "./App.css";
import { useState } from "react";

const App = () => {
  type View = "datepicker" | "favourites";

  const [view, setView] = useState<View>("datepicker");

  const handleViewChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    view: View
  ) => {
    e.preventDefault();
    setView(view);
  };

  return (
    <div className="App">
      <h2 id="api_heading">
        {import.meta.env.PROD ? (
          <h2>
            Due to retraints of the API, please allow insensitive content via
            your browser settings
          </h2>
        ) : null}
      </h2>
      {view !== "datepicker" ? (
        <div>
          <button onClick={(e) => handleViewChange(e, "datepicker")}>
            View Datepicker
          </button>
          <FavoriteList />
        </div>
      ) : (
        <div>
          <button onClick={(e) => handleViewChange(e, "favourites")}>
            View Favourites
          </button>
          <DateFactPicker />
        </div>
      )}
    </div>
  );
};

export default App;
