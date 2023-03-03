import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Router
import { BrowserRouter } from "react-router-dom";
// Redux
import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);


