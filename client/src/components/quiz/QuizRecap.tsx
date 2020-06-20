import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { IPropsQuizRecap } from '../../types/Quiz';

const QuizRecap: React.FC<IPropsQuizRecap> = ({
  show,
  score,
  handleRetake,
  numOfCorrect,
  numOfQuestions,
}) => {
  const transition = useTransition(show, null, {
    from: {
      opacity: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -100%)',
      textAlign: 'center',
      fontSize: '1.5em',
    },
    enter: {
      opacity: 1,
      transform: 'translate(-50%, -50%)',
    },
    leave: { opacity: 0, transform: 'translate(-150%, -50%)' },
    config: {
      duration: 750,
    },
  });
  const isLogin = useSelector<any, boolean>((state) => state.firebase.auth.uid || false);
  const highScore = useSelector<any, number>((state) => state.firebase.profile.highScore || 0);
  const streak = useSelector<any, number>((state) => state.firebase.profile.streak || 0);

  return (
    <React.Fragment>
      {transition.map(
        ({ item, props, key }) =>
          item && (
            <animated.div style={props} key={key}>
              <div className="question-recap">
                <p className="score-overview-total">
                  {isLogin
                    ? score >= highScore
                      ? 'Your new high score is: '
                      : 'Your score is: '
                    : 'Your score is: '}
                  {score}
                </p>
                <p className="score-overview-title">Correct anwsers / Number of Questions</p>
                <p className="score-overview-score">
                  {numOfCorrect} / {numOfQuestions}
                </p>
                {isLogin && (
                  <p className="score-overview-streak">You are on a {streak} day streak. Nice!</p>
                )}
                <button onClick={handleRetake} className="btn-retake">
                  Take quiz again
                </button>
              </div>
            </animated.div>
          ),
      )}
    </React.Fragment>
  );
};

export default QuizRecap;
