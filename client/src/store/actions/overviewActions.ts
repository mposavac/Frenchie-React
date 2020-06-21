import { Dispatch } from 'redux';

import _ from 'lodash';

import { WORDS_FETCHED, ICONS_FETCHED } from '../../types/actions';
import { getUserWords, getIcons, getWords } from '../../server functions/serverFunctions';
import { IWordData } from '../../types/AddForm';

export const fetchWords = (fileName: string) => {
  return async (dispatch: Dispatch, getState: Function, { getFirestore }: any) => {
    if (fileName === 'Adjectives') {
      let adjectives: Array<IWordData> = await getWords('adjectives');
      dispatch({ type: WORDS_FETCHED, words: adjectives });
    } else if (fileName === 'Nouns') {
      let nouns: Array<IWordData> = await getWords('nouns');
      dispatch({ type: WORDS_FETCHED, words: nouns });
    } else if (fileName === 'Verbs') {
      let verbs: Array<IWordData> = await getWords('verbs');
      dispatch({ type: WORDS_FETCHED, words: verbs });
    } else if (fileName === 'Your words') {
      let words: Array<IWordData> = await getUserWords(getState, getFirestore);
      dispatch({ type: WORDS_FETCHED, words: words });
    } else if (fileName === 'Basics') {
      let basics: Array<IWordData> = await getWords('basics');
      let groupedBasics = _.chain(basics)
        .groupBy('category')
        .map((value, key) => ({ category: key, class: key.toLowerCase(), values: value }))
        .value();
      dispatch({ type: WORDS_FETCHED, words: groupedBasics });
    } else {
      dispatch({ type: WORDS_FETCHED, words: [] });
    }
  };
};

export const fetchIcons = () => {
  return async (dispatch: Dispatch, getState: Function, { getFirebase }: any) => {
    let imagesUrl: Array<string> = await getIcons(getFirebase);
    let months: Array<string> = [
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
