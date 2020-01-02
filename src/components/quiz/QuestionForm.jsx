import React from "react";

function QuestionForm({
  prepareQuestions,
  isFetching,
  options,
  handleOptions
}) {
  return (
    <form onSubmit={prepareQuestions}>
      <h3>Check category: </h3>
      <div className="form-checkboxes">
        <label>
          <input
            type="checkbox"
            name="adjectives"
            value="adjectives"
            checked={options.adjectives.checked}
            onChange={handleOptions}
          />
          Ajdectives
        </label>
        <label>
          <input
            type="checkbox"
            name="nouns"
            value="nouns"
            checked={options.nouns.checked}
            onChange={handleOptions}
          />
          Nouns
        </label>
        <label>
          <input
            type="checkbox"
            name="verbs"
            value="verbs"
            checked={options.verbs.checked}
            onChange={handleOptions}
          />
          Verbs
        </label>
      </div>

      <h3>Number of questions: </h3>
      <div className="form-input">
        <input
          type="number"
          name="numOfQuestions"
          value={options.numOfQuestions}
          onChange={handleOptions}
        />
      </div>

      <button disabled={isFetching}>GET QUESTIONS</button>
    </form>
  );
}

export default QuestionForm;
