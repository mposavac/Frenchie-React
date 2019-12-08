import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddForm from "./pages/AddForm";

export default function Routing() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddForm} />
      </Switch>
    </HashRouter>
  );
}
