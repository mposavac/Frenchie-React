import { Dispatch } from 'redux';

import adjectives from '../../assets/adjectives.json';
import nouns from '../../assets/nouns.json';
import verbs from '../../assets/verbs.json';
import basics from '../../assets/basics.json';

import { WORDS_FETCHED, ICONS_FETCHED } from '../../types/actions';
import { getUserWords, getIcons } from '../../server functions/serverFunctions';
import { IWordData } from '../../types/AddForm';

export const fetchWords = (fileName: string) => {
  return async (dispatch: Dispatch, getState: Function, { getFirestore }: any) => {
    if (fileName === 'Adjectives') dispatch({ type: WORDS_FETCHED, words: adjectives });
    else if (fileName === 'Nouns') dispatch({ type: WORDS_FETCHED, words: nouns });
    else if (fileName === 'Verbs') dispatch({ type: WORDS_FETCHED, words: verbs });
    else if (fileName === 'Your words') {
      let words: Array<IWordData> = await getUserWords(getState, getFirestore);
      dispatch({ type: WORDS_FETCHED, words: words });
    } else if (fileName === 'Basics') {
      dispatch({ type: WORDS_FETCHED, words: basics });
    } else {
      dispatch({ type: WORDS_FETCHED, words: [] });
    }
  };
};

export const fetchIcons = () => {
  return async (dispatch: Dispatch, getState: Function, { getFirebase }: any) => {
    let imagesUrl: Array<string> = await getIcons(getFirebase);
    let months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];
    let orderImagesUrl: Array<string> = [];
    for (let i = 0; i < months.length; i++) {
      imagesUrl.forEach((url: string) => {
        if (url.includes(months[i])) orderImagesUrl.push(url);
      });
    }
    dispatch({ type: ICONS_FETCHED, icons: orderImagesUrl });
  };
};
