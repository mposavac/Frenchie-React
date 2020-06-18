import React from 'react';

import { IPropsQuestionForm } from '../../types/Quiz';
import RadioBtnInput from './RadioBtnInput';

const QuestionForm: React.FC<IPropsQuestionForm> = ({
  prepareQuestions,
  questionsLoaded,
  options,
  handleOptions,
}) => {
  return (
    <form
      onSubmit={prepareQuestions}
      className={questionsLoaded ? 'dimmed quiz-form' : 'quiz-form'}
    >
      <h2>Check category: </h2>
      <div className="form-checkboxes">
        <RadioBtnInput
          isChecked={options.adjectives.checked}
          option="adjectives"
          handleOptions={handleOptions}
        />
        <RadioBtnInput
          isChecked={options.nouns.checked}
          option="nouns"
          handleOptions={handleOptions}
        />
        <RadioBtnInput
          isChecked={options.verbs.checked}
          option="verbs"
          handleOptions={handleOptions}
        />
        <RadioBtnInput
          isChecked={options.custom_words.checked}
          option="custom_words"
          title="Your words"
          handleOptions={handleOptions}
        />
      </div>

      <h2>Number of questions: </h2>
      <div className="form-input">
        <input
          type="number"
          name="numOfQuestions"
          min="1"
          max="100"
          value={options.numOfQuestions}
          onChange={handleOptions}
        />
      </div>

      <button className="btn-get" disabled={questionsLoaded || !options.numOfQuestions}>
        GET QUESTIONS
      </button>
    </form>
  );
};

export default QuestionForm;
