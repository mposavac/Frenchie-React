import { Dispatch } from 'redux';

import adjectives from '../../assets/adjectives.json';
import nouns from '../../assets/nouns.json';
import verbs from '../../assets/verbs.json';

import { WORDS_FETCHED } from '../../types/actions';
import { getUserWords } from '../../server functions/serverFunctions';
import { IWordData } from '../../types/AddForm';

export const fetchWords = (fileName: string) => {
  return async (dispatch: Dispatch, getState: Function, { getFirestore }: any) => {
    if (fileName === 'Adjectives') dispatch({ type: WORDS_FETCHED, words: adjectives });
    else if (fileName === 'Nouns') dispatch({ type: WORDS_FETCHED, words: nouns });
    else if (fileName === 'Verbs') dispatch({ type: WORDS_FETCHED, words: verbs });
    else if (fileName === 'Your words') {
      let words: Array<IWordData> = await getUserWords(getState, getFirestore);
      dispatch({ type: WORDS_FETCHED, words: words });
    } else if (fileName === 'Grammar') {
      console.log('GRAMMAR');
    } else {
      dispatch({ type: WORDS_FETCHED, words: [] });
    }
  };
};
