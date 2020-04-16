import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { IPropsQuestionBox } from '../../types/Quiz';

const QuestionBox: React.FC<IPropsQuestionBox> = ({
  question,
  questionIndex,
  handleNext,
  handleScore,
}) => {
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    setIsAnswered(false);
    setSelectedIndex(null);
    let answers: Array<string> = question.incorrect_answers
      ? question.incorrect_answers.concat(question.word)
      : [];
    let randomizedAnswers: Array<string> = _.shuffle(answers);
    setAnswers(randomizedAnswers);
    setCorrectIndex(randomizedAnswers.indexOf(question.word));
  }, [question]);

  useEffect(() => {
    if (isAnswered) {
      handleScore(timer, correctIndex === selectedIndex);
      setTimer(0);
    }
    // eslint-disable-next-line
  }, [isAnswered]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(interval);
    }
    if (timer === 0 && selectedIndex === null) {
      setIsAnswered(true);
      setSelectedIndex(correctIndex);
    }
  }, [timer, correctIndex, selectedIndex]);

  useEffect(() => {
    setTimer(30);
  }, [questionIndex]);

  const checkAnswer = (e: any) => {
    if (!isAnswered) {
      setSelectedIndex(parseInt(e.target.id));
      setIsAnswered(true);
    }
  };

  const getStyle = (index: number) => {
    if (isAnswered && correctIndex === index) return 'correct';
    else if (isAnswered && selectedIndex === index) return 'incorrect';
    return '';
  };

  console.log(question);
  return (
    <div className="question-box">
      <h2>How would you say "{question.translation}" on french?</h2>
      <div className="questions-container">
        {answers.length &&
          answers.map((answer: string, i: number) => (
            <p
              key={answer}
              className={getStyle(i) + ' question'}
              id={i.toString()}
              onClick={checkAnswer}
            >
              {answer}
            </p>
          ))}
      </div>

      {isAnswered && (
        <div className="question-recap">
          <p>{question.translation[0].toUpperCase() + question.translation.slice(1)}</p>
          <p>{question.word[0].toUpperCase() + question.word.slice(1)}</p>
          <button disabled={!isAnswered} onClick={handleNext} className="btn-next">
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
