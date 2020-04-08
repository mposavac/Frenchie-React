import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home/HomeController';
import AddForm from '../pages/AddForm/AddForm';
import Quiz from '../pages/Quiz/Quiz';
import Overview from '../pages/Overview/Overview';

export default function Routing() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddForm} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/overview" component={Overview} />
      </Switch>
    </BrowserRouter>
  );
}
