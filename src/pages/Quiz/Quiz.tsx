import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IOptions, IQuestion } from '../../types/Quiz';

import { getQuestions, setScoreAcition } from '../../store/actions/quizActions';
import QuestionForm from '../../components/quiz/QuestionForm';
import QuestionBox from '../../components/quiz/QuestionBox';
import Loading from '../../components/Loading';
import QuizRecap from '../../components/quiz/QuizRecap';
import LoginScreen from '../../components/home/LoginScreen';
import { RootReducer } from '../../store/reducers/rootReducer';

const Quiz: React.FC<{}> = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [questionIndex, setIndex] = useState<number>(0);
  const [options, setOptions] = useState<IOptions>({
    adjectives: { checked: true },
    nouns: { checked: false },
    verbs: { checked: false },
    custom_words: { checked: false },
    numOfQuestions: 20,
  });
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(true);
  const [animate, setAnimate] = useState<boolean>(false);
  const [numOfCorrect, setNumOfCorrect] = useState<number>(0);
  const [showLoginMenu, setShowLogin] = useState<boolean>(false);
  const questions = useSelector<RootReducer, Array<IQuestion>>((state) => state.quiz.questions);
  const isLogin = useSelector<RootReducer, boolean>((state) => state.firebase.auth.uid || false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (questions.length > 0 && isFetching) setTimeout(() => setIsFetching(false), 500);
  }, [questions, isFetching]);

  useEffect(() => {
    dispatch(getQuestions(null));
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && questionIndex === options.numOfQuestions && questionIndex > 0)
      dispatch(setScoreAcition(score));
    // eslint-disable-next-line
  }, [questionIndex, options.numOfQuestions]);

  const prepareQuestions = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (
      options.adjectives.checked ||
      options.nouns.checked ||
      options.verbs.checked ||
      options.custom_words.checked
    ) {
      if (options.custom_words.checked && !isLogin) setShowLogin(true);
      else {
        setIsFetching(true);
        dispatch(getQuestions(options));
      }
    }
  };

  const startQuiz = () => {
    setIsStarted(true);
    setIsAnswered(false);
  };

  const handleOptions = (e: React.FormEvent<HTMLFormElement>) => {
    if (questions.length > 0) {
      dispatch(getQuestions(null));
      setIsFetching(false);
    }
    let newOptions =
      e.currentTarget.name === 'numOfQuestions'
        ? { ...options, numOfQuestions: parseInt(e.currentTarget.value) }
        : {
            ...options,
            [e.currentTarget.name]: { checked: e.currentTarget.checked },
          };
    setOptions(newOptions);
  };

  const handleNext = () => {
    setIsAnswered(false);
    setTimeout(() => setIndex(questionIndex + 1), 100);
  };

  const handleScore = (timer: number, isCorrect: boolean) => {
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
    setTimeout(() => {
      setScore(0);
      setNumOfCorrect(0);
    }, 750);
    setIndex(0);
  };

  const redirectHome = () => {
    setAnimate(true);
    setTimeout(() => history.push('/'), 750);
  };

  const handleLoginMenu = () => {
    setShowLogin(false);
  };

  return (
    <div className="quiz">
      <Loading isLoading={isFetching} />
      <div className={animate ? 'quiz-square-backgorund redirect-anim' : 'quiz-square-backgorund'}>
        {questions.length > 0 && questionIndex < options.numOfQuestions && (
          <div className={!isAnswered ? 'timer-indicator active' : 'timer-indicator'} />
        )}
      </div>

      {!isStarted || questionIndex === options.numOfQuestions ? (
        <i className="fas fa-home" onClick={redirectHome} />
      ) : null}
      {!isStarted && !showLoginMenu && (
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
        </React.Fragment>
      )}
      <QuizRecap
        show={questionIndex === options.numOfQuestions && questionIndex > 0}
        score={score}
        numOfCorrect={numOfCorrect}
        numOfQuestions={options.numOfQuestions}
        handleRetake={handleRetake}
      />
      <LoginScreen
        show={showLoginMenu}
        isLogin={isLogin}
        handleLoginMenu={handleLoginMenu}
        showBackside={() => {}}
      />
    </div>
  );
};

export default Quiz;
