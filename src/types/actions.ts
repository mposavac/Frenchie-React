import { IQuestion } from "./Quiz";

export interface IQuiz {}
export const QUESTION_RESPONSE = "QUESTION_RESPONSE";

export interface QuestionResponseAction {
  type: typeof QUESTION_RESPONSE;
  questions: IQuestion[];
}

export type QuizActionTypes = QuestionResponseAction;

/* AUTH ACTIONS */
export const SIGNUP_RESPONSE = "LOGIN_SUCCESS";

export interface SignUpResponseAction {
  type: typeof SIGNUP_RESPONSE;
}
