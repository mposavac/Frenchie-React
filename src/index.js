import React from "react";
import ReactDOM from "react-dom";

import Routing from "./routes/Routing";

import { Provider } from "react-redux";
import { store } from "./store/config";

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById("root")
);
