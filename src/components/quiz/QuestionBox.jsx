import React from "react";

function QuestionBox({ question }) {
  return <div>{question.correct_answer}</div>;
}

export default QuestionBox;
