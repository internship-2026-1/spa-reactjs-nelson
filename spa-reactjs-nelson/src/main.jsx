import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {config} from "./config/index"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <h1>{config.app.name}</h1>
      <h1>{config.app.environment}</h1>
      <h1>{config.api.baseUrl}</h1>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);