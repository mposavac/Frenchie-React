import React, { FunctionComponent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getQuestions } from "../store/actions/quizActions";
import QuestionForm from "../components/quiz/QuestionForm";
import QuestionBox from "../components/quiz/QuestionBox";

function Quiz() {
  const [isFetching, setIsFetching] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [questionIndex, setIndex] = useState(0);
  const [options, setOptions] = useState({
    adjectives: { checked: true },
    nouns: { checked: false },
    verbs: { checked: false },
    numOfQuestions: 20
  });
  const questions = useSelector(state => state.quiz.questions);

  const dispatch = useDispatch();

  const prepareQuestions = e => {
    e.preventDefault();
    setIsFetching(true);
    dispatch(getQuestions(options));
  };

  const startQuiz = () => {
    setIsStarted(true);
  };

  const handleOptions = e => {
    if (questions.length > 0) {
      dispatch(getQuestions(null));
      setIsFetching(false);
    }
    let newOptions =
      e.target.name === "numOfQuestions"
        ? { ...options, numOfQuestions: e.target.value }
        : {
            ...options,
            [e.target.name]: { checked: e.target.checked }
          };
    setOptions(newOptions);
  };

  const handleNext = () => {
    setIndex(questionIndex + 1);
  };

  console.log(questions);
  return (
    <div className="quiz">
      <div className="quiz-square-backgorund" />
      {!isStarted && (
        <QuestionForm
          prepareQuestions={prepareQuestions}
          isFetching={isFetching}
          options={options}
          handleOptions={handleOptions}
        />
      )}
      {questions.length > 0 && !isStarted && (
        <button onClick={startQuiz} className="btn-start">
          START QUIZ
        </button>
      )}
      {isStarted && questionIndex < options.numOfQuestions && (
        <React.Fragment>
          <QuestionBox
            question={questions[questionIndex]}
            handleNext={handleNext}
          />
          <p className="credits">TRANSLATIONS BY: translate.yandex.com</p>
        </React.Fragment>
      )}
    </div>
  );
}

export default Quiz;
