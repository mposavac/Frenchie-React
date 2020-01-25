import { Dispatch } from "redux";

import adjectives from "../../assets/adjectives.json";
import nouns from "../../assets/nouns.json";
import verbs from "../../assets/verbs.json";
import { IQuestion, IOptions } from "../../types/Quiz.js";

export const getQuestions = (options: IOptions | null) => {
  return async (dispatch: Dispatch) => {
    if (options) {
      let randomIndexes: Array<number> = [];
      let parsedWords: Array<IQuestion | Array<IQuestion> | any> = [];
      let quizWords: Array<IQuestion> = [];

      const generateRandom = (
        length: number,
        maxNumber: number,
        array: Array<number>
      ) => {
        while (array.length < length) {
          let number = Math.floor(Math.random() * maxNumber);
          if (!array.includes(number)) array.push(number);
        }
      };

      if (options.adjectives.checked) parsedWords.push(adjectives);

      if (options.nouns.checked) parsedWords.push(nouns);

      if (options.verbs.checked) parsedWords.push(verbs);

      //Merge all the arrays into one array
      parsedWords = Array.prototype.concat.apply([], parsedWords);

      generateRandom(options.numOfQuestions, parsedWords.length, randomIndexes);

      for (let index of randomIndexes) quizWords.push(parsedWords[index]);

      //Get transaltion and random incorrect answers
      for (let obj of quizWords) {
        let firstLetter: string = obj["word"][0];
        let similar_words: Array<string> = [];
        let incorrect_answers: Array<string> = [];
        for (let word of parsedWords) {
          if (word["word"][0] === firstLetter && obj["word"] !== word["word"])
            similar_words.push(word["word"]);
        }

        //Add incorrrect for the one which doesn't have enough with same later
        if (similar_words.length < 3) {
          let random_incorrect_indexes: Array<number> = [];
          generateRandom(
            3 - similar_words.length,
            parsedWords.length,
            random_incorrect_indexes
          );

          for (let index of random_incorrect_indexes)
            incorrect_answers.push(parsedWords[index]["word"]);

          incorrect_answers = incorrect_answers.concat(similar_words);
        }
        //Random pick 3 words from same_letter_words
        else {
          let random_similar_indexes: Array<number> = [];
          generateRandom(3, similar_words.length, random_similar_indexes);

          for (let index of random_similar_indexes)
            incorrect_answers.push(similar_words[index]);
        }

        obj["incorrect_answers"] = incorrect_answers;
        /*
        fetch(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.REACT_APP_TRANSLATION_API_KEY}&text=${obj["correct_answer"]}&lang=fr-en`
        )
          .then(res => res.json())
          .then(translation => (obj["translation"] = translation.text[0]));
          */
      }
      console.log(quizWords);
      dispatch({ type: "QUESTION_RESPONSE", questions: quizWords });
    } else dispatch({ type: "QUESTION_RESPONSE", questions: [] });
  };
};
