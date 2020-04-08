import authReducer from './authReducer';
import wordReducer from './wordReducer';
import quizReducer from './quizReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  words: wordReducer,
  quiz: quizReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
