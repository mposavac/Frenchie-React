import { IQuestion } from "./Quiz";
import { IAddFormActionProps } from "./AddForm";

/* AUTH ACTIONS */
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";

export interface SignUpResponseAction {
  type: typeof SIGNUP_SUCCESS;
}
export interface SignUpResponseError {
  type: typeof SIGNUP_ERROR;
  error: Response;
}
export interface LogInResponseAction {
  type: typeof LOGIN_SUCCESS;
}
export interface LogInResponseError {
  type: typeof LOGIN_ERROR;
  error: Response;
}
export interface SignOutResponseAction {
  type: typeof SIGNOUT_SUCCESS;
}

export type AuthActionTypes =
  | SignUpResponseAction
  | SignUpResponseError
  | LogInResponseAction
  | LogInResponseError
  | SignOutResponseAction;

/* ADD FROM ACTIONS */
export const NEWWORD_RESPONSE = "WORD_ADDED";

export interface NewWordResponseAction {
  type: typeof NEWWORD_RESPONSE;
  //error
}

/* OVERVIEW ACTIONS */
export const WORDS_FETCHED = "WORDS_FETCHED";

export interface WordsFetchResponseAction {
  type: typeof WORDS_FETCHED;
  words: Array<IQuestion> | Array<IAddFormActionProps>;
}

export type WordsFetchActionTypes = WordsFetchResponseAction;

/* QUIZ ACTIONS */
export const QUESTION_RESPONSE = "QUESTION_RESPONSE";

export interface QuestionResponseAction {
  type: typeof QUESTION_RESPONSE;
  questions: IQuestion[];
}

export type QuizActionTypes = QuestionResponseAction;
