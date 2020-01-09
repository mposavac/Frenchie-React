import React, { useState } from "react";
import InputField from "../components/addNew/InputField";

const AddForm: React.FC<{}> = () => {
  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [conjugation, setConjugation] = useState<Array<string>>([]);

  const addConjugation = () => {
    let newConjug = [...conjugation];
    newConjug.push(newWord);
    setConjugation(newConjug);
    setNewWord("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="form-background">
      <div className="form-container" />
      <form onSubmit={handleSubmit} noValidate>
        <h3>Enter New Word</h3>
        <InputField
          setter={setNewWord}
          id="newWord"
          value={newWord}
          text="Enter New Word"
        />

        <button className="btn-add" onClick={addConjugation}>
          <i className="fas fa-plus"></i>
        </button>

        <InputField
          setter={setTranslation}
          id="translation"
          value={translation}
          text="Enter Translation"
        />

        <div className="conjugation-container">
          {conjugation.map((element, i) => (
            <p key={i}>{element}</p>
          ))}
        </div>

        <button className="btn-submit">Add to Database</button>
      </form>
    </div>
  );
};

export default AddForm;
