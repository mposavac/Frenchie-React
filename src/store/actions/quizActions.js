import Papa from "papaparse";

import adjectives from "../../assets/adjectives.csv";
import nouns from "../../assets/nouns.csv";
import verbs from "../../assets/verbs.csv";
//DODATI DA IZ OPCIJA IZ CITA STO FETCHATI
export const getQuestions = options => {
  return dispatch => {
    let randomIndexes = [];
    let quizWords = [];

    const generateRandom = (length, maxNumber, array) => {
      while (array.length < length) {
        let number = Math.floor(Math.random() * maxNumber);
        if (!array.includes(number)) array.push(number);
      }
    };
    generateRandom(7, 200, randomIndexes);
    Papa.parse(adjectives, {
      header: true,
      download: true,
      skipEmptyLines: true,
      encoding: "UTF-8",
      complete: results => {
        let slicedResults = results.data.slice(0, 200);
        for (let index of randomIndexes) quizWords.push(slicedResults[index]);

        for (let obj of quizWords) {
          let firstLetter = obj["correct_answer"][0];
          let similar_words = [];
          let incorrect_answers = [];
          for (let word of slicedResults) {
            if (
              word["correct_answer"][0] === firstLetter &&
              obj["correct_answer"] !== word["correct_answer"]
            )
              similar_words.push(word["correct_answer"]);
          }
          //Add incorrrect for the one which doesn't have enough with same later
          if (similar_words.length < 3) {
            let random_incorrect_indexes = [];
            generateRandom(
              3 - similar_words.length,
              slicedResults.length,
              random_incorrect_indexes
            );

            for (let index of random_incorrect_indexes)
              incorrect_answers.push(slicedResults[index]["correct_answer"]);

            incorrect_answers = incorrect_answers.concat(similar_words);
          }
          //Random pick 3 words from same_letter_words
          else {
            let random_similar_indexes = [];
            generateRandom(3, similar_words.length, random_similar_indexes);

            for (let index of random_similar_indexes)
              incorrect_answers.push(similar_words[index]);
          }

          obj["incorrect_answers"] = incorrect_answers;

          fetch(
            `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.REACT_APP_TRANSLATION_API_KEY}&text=${obj["correct_answer"]}&lang=fr-en`
          )
            .then(res => res.json())
            .then(translation => (obj["translation"] = translation.text[0]));
        }

        dispatch({ type: "QUESTION_RESPONSE", data: quizWords });
      }
    });
  };
};
