import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from '../config/fbconfig';

const store: Store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {
      useFirestoreForProfile: true,
      userProfile: 'users',
      attachAuthIsReady: true,
    }),
  ),
);

export default store;
