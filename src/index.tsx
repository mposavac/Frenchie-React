import React from 'react';
import reactDOM from 'react-dom';

import Routing from './routes/Routing';

import { Provider } from 'react-redux';
import store from './store/config';

//store.firebaseAuthIsReady.then(() => {
reactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById('root'),
);
//});
