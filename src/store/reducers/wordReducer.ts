const initState = {
  words: [
    { id: "1", words: ["etre", "etais"], translation: "to be" },
    { id: "2", words: ["etre", "etais"], translation: "to be" }
  ]
};

const wordReducer = (state = initState, action: any) => {
  return state;
};

export default wordReducer;
