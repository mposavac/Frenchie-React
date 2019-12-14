import authReducer from "./authReducer";
import wordReducer from "./wordReducer";
import quizReducer from "./quizReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  words: wordReducer,
  quiz: quizReducer
});

export default rootReducer;
