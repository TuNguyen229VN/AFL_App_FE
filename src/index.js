import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJVXxLYVF2R2FJfVRwfF9DYEwgOX1dQl9hSXlTdUVgWX1bcXJUQ2Y=');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

