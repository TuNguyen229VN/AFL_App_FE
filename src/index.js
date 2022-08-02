import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJVHxIYVF2R2FJflx6dFJMZVVBNQtUQF1hS35bdkdjWX9XcnZTRGJU');

ReactDOM.render(
  <React.StrictMode>  
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

