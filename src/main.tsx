import React from "react";
import ReactDOM from "react-dom/client";
import FactProvider from "./contexts/favouriteContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<FactProvider>
			<App />
		</FactProvider>
	</React.StrictMode>
);
