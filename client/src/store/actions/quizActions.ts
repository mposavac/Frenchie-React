import { Dispatch } from 'redux';

import { IQuestion, IOptions } from '../../types/Quiz.js';
import { getUserWords, setScoreAndStreak, getWords } from '../../server functions/serverFunctions';
import { IWordData } from '../../types/AddForm';

export const getQuestions = (options: IOptions | null) => {
  return async (dispatch: Dispatch, getState: Function, { getFirestore }: any) => {
    if (options) {
      let randomIndexes: Array<number> = [];
      let parsedWords: Array<IQuestion | Array<IQuestion> | any> = [];
      let quizWords: Array<IQuestion> = [];

      const generateRandom = (length: number, maxNumber: number, array: Array<number>) => {
        while (array.length < length) {
          let number: number = Math.floor(Math.random() * maxNumber);
          if (!array.includes(number)) array.push(number);
        }
      };

      if (options.adjectives.checked) {
        let adjectives: Array<IWordData> = await getWords('adjectives');
        parsedWords.push(adjectives);
      }
      if (options.nouns.checked) {
        let nouns: Array<IWordData> = await getWords('nouns');
        parsedWords.push(nouns);
      }

      if (options.verbs.checked) {
        let verbs: Array<IWordData> = await getWords('verbs');
        parsedWords.push(verbs);
      }

      if (options.custom_words.checked) {
        let custom_words: Array<IWordData> = await getUserWords(getState, getFirestore);

        custom_words.forEach((object: IWordData) => {
          object.word = object.word[0];
        });
        parsedWords.push(custom_words);
      }

      //Merge all the arrays into one array
      parsedWords = Array.prototype.concat.apply([], parsedWords);

      generateRandom(
        options.numOfQuestions > parsedWords.length ? parsedWords.length : options.numOfQuestions,
        parsedWords.length,
        randomIndexes,
      );

      for (let index of randomIndexes) quizWords.push(parsedWords[index]);

      //Get transaltion and random incorrect answers
      for (let obj of quizWords) {
        let firstLetter: string = obj['word'][0];
        let similar_words: Array<string> = [];
        let incorrect_answers: Array<string> = [];
        for (let word of parsedWords) {
          if (word['word'][0] === firstLetter && obj['word'] !== word['word'])
            similar_words.push(word['word']);
        }

        //Add incorrrect for the one which doesn't have enough with the same later
        if (similar_words.length < 3) {
          let random_incorrect_indexes: Array<number> = [];
          generateRandom(3 - similar_words.length, parsedWords.length, random_incorrect_indexes);

          for (let index of random_incorrect_indexes)
            incorrect_answers.push(parsedWords[index]['word']);

          incorrect_answers = incorrect_answers.concat(similar_words);
        }
        //Random pick 3 words from similar_words
        else {
          let random_similar_indexes: Array<number> = [];
          generateRandom(3, similar_words.length, random_similar_indexes);

          for (let index of random_similar_indexes) incorrect_answers.push(similar_words[index]);
        }

        obj['incorrect_answers'] = incorrect_answers;
      }
      dispatch({ type: 'QUESTION_RESPONSE', questions: quizWords });
    } else dispatch({ type: 'QUESTION_RESPONSE', questions: [] });
  };
};

export const setScoreAcition = (score: number) => {
  return (dispatch: Dispatch, getState: Function, { getFirebase, getFirestore }: any) => {
    let response: any = setScoreAndStreak(getState, getFirestore, score);
    response.then(() => dispatch({ type: 'STREAK' }));
  };
};
