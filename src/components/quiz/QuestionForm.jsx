import React from "react";

function QuestionForm({
  prepareQuestions,
  questionsLoaded,
  options,
  handleOptions
}) {
  return (
    <form
      onSubmit={prepareQuestions}
      className={questionsLoaded ? "dimmed" : ""}
    >
      <h2>Check category: </h2>
      <div className="form-checkboxes">
        <label>
          <input
            type="checkbox"
            name="adjectives"
            value="adjectives"
            checked={options.adjectives.checked}
            onChange={handleOptions}
          />
          <div>
            <svg viewBox="0 0 44 44">
              <path
                d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                transform="translate(-2.000000, -2.000000)"
              ></path>
            </svg>
          </div>
          <span>Ajdectives</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="nouns"
            value="nouns"
            checked={options.nouns.checked}
            onChange={handleOptions}
          />
          <div>
            <svg viewBox="0 0 44 44">
              <path
                d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                transform="translate(-2.000000, -2.000000)"
              ></path>
            </svg>
          </div>
          <span>Nouns</span>
        </label>

        <label>
          <input
            type="checkbox"
            name="verbs"
            value="verbs"
            checked={options.verbs.checked}
            onChange={handleOptions}
          />
          <div>
            <svg viewBox="0 0 44 44">
              <path
                d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                transform="translate(-2.000000, -2.000000)"
              ></path>
            </svg>
          </div>
          Verbs
        </label>
      </div>

      <h2>Number of questions: </h2>
      <div className="form-input">
        <input
          type="number"
          name="numOfQuestions"
          min="5"
          max="100"
          value={options.numOfQuestions}
          onChange={handleOptions}
        />
      </div>

      <button className="btn-get" disabled={questionsLoaded}>
        GET QUESTIONS
      </button>
    </form>
  );
}

export default QuestionForm;
