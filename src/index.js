import React from "react";
import ReactDOM from "react-dom";

import Routing from "./Routing";

import { createStore } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById("root")
);
