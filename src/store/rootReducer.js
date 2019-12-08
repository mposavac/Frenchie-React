import authReducer from "./authReducer";
import wordReducer from "./wordReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  words: wordReducer
});

export default rootReducer;
