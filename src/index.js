import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFaclxJVHxLeUx0RWFbb19xflFGal5RVBYiSV9jS3xTfkdrW3xacnRUQWdYUg==');

ReactDOM.render(
  <React.StrictMode>  
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

