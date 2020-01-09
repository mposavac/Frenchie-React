import { QUESTION_RESPONSE, QuizActionTypes } from "../../types/actions";
import { IQuizState } from "../../types/Quiz";

const initialState: IQuizState = { questions: [] };

const quizReducer = (state = initialState, action: QuizActionTypes) => {
  switch (action.type) {
    case QUESTION_RESPONSE:
      return { ...state, questions: action.questions };
    default:
      return state;
  }
};

export default quizReducer;
