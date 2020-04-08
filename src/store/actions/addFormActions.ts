import { IAddFormActionProps } from '../../types/AddForm';
import { NEWWORD_RESPONSE } from '../../types/actions';

import { Dispatch } from 'redux';
import { addUserWords } from '../../server functions/serverFunctions';

export const addWordToDatabase = (wordData: IAddFormActionProps) => {
  return (dispatch: Dispatch, getState: any, { getFirebase, getFirestore }: any) => {
    let response = addUserWords(getState, getFirestore, wordData);
    response.then(() => dispatch({ type: NEWWORD_RESPONSE }));
  };
};
