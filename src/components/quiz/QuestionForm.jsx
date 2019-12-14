import React from "react";

function QuestionForm({
  prepareQuestions,
  isFetching,
  options,
  handleOptions
}) {
  return (
    <form onSubmit={prepareQuestions}>
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

      <button disabled={isFetching}>GET QUESTIONS</button>
    </form>
  );
}

export default QuestionForm;
