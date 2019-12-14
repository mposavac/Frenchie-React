import React, { useState, useEffect } from "react";
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
    verbs: { checked: false }
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
    let newOptions = {
      ...options,
      [e.target.name]: { checked: e.target.checked }
    };
    setOptions(newOptions);
  };
  return (
    <div className="quiz">
      <div className="quiz-container" />
      <QuestionForm
        prepareQuestions={prepareQuestions}
        isFetching={isFetching}
        options={options}
        handleOptions={handleOptions}
      />
      {questions.length > 0 && <button onClick={startQuiz}>START QUIZ</button>}
      {isStarted && <QuestionBox question={questions[questionIndex]} />}
    </div>
  );
}

export default Quiz;
//CREDITS: TRANSLATION By: translate.yandex.com
