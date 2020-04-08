import { WordsFetchActionTypes, WORDS_FETCHED } from '../../types/actions';
import { IQuestion } from '../../types/Quiz';

const initialState: Array<IQuestion> = [];

const wordReducer = (state = initialState, action: WordsFetchActionTypes) => {
  switch (action.type) {
    case WORDS_FETCHED:
      return [...action.words];
    default:
      return state;
  }
};

export default wordReducer;
