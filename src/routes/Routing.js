import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import AddForm from "../pages/AddForm";
import Quiz from "../pages/Quiz";
import Overview from "../pages/Overview";

export default function Routing() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddForm} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/overview" component={Overview} />
      </Switch>
    </HashRouter>
  );
}
