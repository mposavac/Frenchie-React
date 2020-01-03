import React from "react";
import { useTransition, animated } from "react-spring";

export default function QuizRecap({
  show,
  score,
  handleRetake,
  numOfCorrect,
  numOfQuestions
}) {
  const transition = useTransition(show, null, {
    from: {
      opacity: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -100%)",
      textAlign: "center",
      fontSize: "1.5em"
    },
    enter: {
      opacity: 1,
      transform: "translate(-50%, -50%)"
    },
    leave: { opacity: 0, transform: "translate(-150%, -50%)" },
    config: {
      duration: 750
    }
  });

  return transition.map(
    ({ item, props, key }) =>
      item && (
        <animated.div style={props} key={key}>
          <div className="question-recap">
            <p className="score-overview-total">Your score is: {score}</p>
            <p className="score-overview-title">
              Correct anwsers / Number of Questions
            </p>
            <p className="score-overview-score">
              {numOfCorrect} / {numOfQuestions}
            </p>
            <button onClick={handleRetake} className="btn-retake">
              Take quiz again
            </button>
          </div>
        </animated.div>
      )
  );
}

/* DODATI KASNIJE IZLISTANJE NAJBOLJI REZULTATA TRENUTNOG KORISNIKA */
