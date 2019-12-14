const quizReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case "QUESTION_RESPONSE":
      return { ...state, questions: action.data };
    default:
      return state;
  }
};

export default quizReducer;
