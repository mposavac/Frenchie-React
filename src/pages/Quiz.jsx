import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { getQuestions } from "../store/actions/quizActions";
import QuestionForm from "../components/quiz/QuestionForm";
import QuestionBox from "../components/quiz/QuestionBox";
import Loading from "../components/Loading";
import QuizRecap from "../components/quiz/QuizRecap";

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
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [numOfCorrect, setNumOfCorrect] = useState(0);
  const questions = useSelector(state => state.quiz.questions);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questions.length > 0 && isFetching)
      setTimeout(() => setIsFetching(false), 500);
  }, [questions, isFetching]);

  useEffect(() => {
    dispatch(getQuestions(null));
  }, []);

  const prepareQuestions = e => {
    e.preventDefault();
    setIsFetching(true);
    dispatch(getQuestions(options));
  };

  const startQuiz = () => {
    setIsStarted(true);
    setIsAnswered(false);
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
    setIsAnswered(false);
  };

  const handleScore = (timer, isCorrect) => {
    setTimeout(() => setIsAnswered(true), 500);
    if (isCorrect) {
      setScore(score + timer);
      setNumOfCorrect(numOfCorrect + 1);
    }
  };

  const handleRetake = () => {
    dispatch(getQuestions(null));
    setIsFetching(false);
    setIsStarted(false);
    setIsAnswered(true);
    setTimeout(() => setScore(0), 750);
    setIndex(0);
  };

  const redirectHome = () => {
    setAnimate(true);
    setTimeout(() => setRedirecting(true), 750);
  };

  console.log(questions);
  return (
    <div className="quiz">
      <div
        className={
          animate
            ? "quiz-square-backgorund redirect-anim"
            : "quiz-square-backgorund"
        }
      >
        {questions.length > 0 && questionIndex < options.numOfQuestions && (
          <div
            className={
              !isAnswered ? "timer-indicator active" : "timer-indicator"
            }
          />
        )}
      </div>
      <Loading isLoading={isFetching} />
      {!isStarted || questionIndex === parseInt(options.numOfQuestions) ? (
        <i className="fas fa-home" onClick={redirectHome} />
      ) : null}
      {redirecting && <Redirect to="/" />}
      {!isStarted && (
        <QuestionForm
          prepareQuestions={prepareQuestions}
          questionsLoaded={isFetching || questions.length > 0}
          options={options}
          handleOptions={handleOptions}
        />
      )}
      {questions.length > 0 && !isStarted && !isFetching && (
        <button onClick={startQuiz} className="btn-start">
          START QUIZ
        </button>
      )}
      {isStarted && questionIndex < options.numOfQuestions && (
        <React.Fragment>
          <div className="score">
            <p>Score: </p>
            <span>{score}</span>
          </div>
          <QuestionBox
            question={questions[questionIndex]}
            questionIndex={questionIndex}
            handleNext={handleNext}
            handleScore={handleScore}
          />
          <p className="credits">TRANSLATIONS BY: translate.yandex.com</p>
        </React.Fragment>
      )}
      <QuizRecap
        show={questionIndex === parseInt(options.numOfQuestions)}
        score={score}
        numOfCorrect={numOfCorrect}
        numOfQuestions={options.numOfQuestions}
        handleRetake={handleRetake}
      />
    </div>
  );
}

export default Quiz;
