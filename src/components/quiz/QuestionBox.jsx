import React, { useState, useEffect } from "react";
import _ from "lodash";

function QuestionBox({ question, questionIndex, handleNext, handleScore }) {
  const [answers, setAnswers] = useState(undefined);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setIsAnswered(false);
    setSelectedIndex(null);
    let answers = question.incorrect_answers.concat(question.correct_answer);
    let randomizedAnswers = _.shuffle(answers);
    setAnswers(randomizedAnswers);
    setCorrectIndex(randomizedAnswers.indexOf(question.correct_answer));
  }, [question]);

  useEffect(() => {
    if (isAnswered) {
      handleScore(timer, correctIndex === selectedIndex);
      setTimer(0);
    }
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

  const checkAnswer = e => {
    if (!isAnswered) {
      setSelectedIndex(parseInt(e.target.id));
      setIsAnswered(true);
    }
  };

  const getStyle = index => {
    if (isAnswered && correctIndex === index) return "correct";
    else if (isAnswered && selectedIndex === index) return "incorrect";
    return "";
  };

  console.log(timer);
  return (
    <div className="question-box">
      <h2>How would you say "{question.translation}" on french?</h2>
      <div className="questions-container">
        {answers &&
          answers.map((answer, i) => (
            <p
              key={answer}
              className={getStyle(i) + " question"}
              id={i}
              onClick={checkAnswer}
            >
              {answer}
            </p>
          ))}
      </div>

      {isAnswered && (
        <div className="question-recap">
          <p>
            {question.translation[0].toUpperCase() +
              question.translation.slice(1)}
          </p>
          <p>
            {question.correct_answer[0].toUpperCase() +
              question.correct_answer.slice(1)}
          </p>
          <button
            disabled={!isAnswered}
            onClick={handleNext}
            className="btn-next"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionBox;
