import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addWordToDatabase } from "../store/actions/addFormActions";
import InputField from "../components/addNew/InputField";
import LoginScreen from "../components/home/LoginScreen";

const AddForm: React.FC<{}> = () => {
  const [newWord, setNewWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [conjugation, setConjugation] = useState<Array<string>>([]);

  const [animate, setAnimate] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [showLoginMenu, setShowLogin] = useState<boolean>(false);

  const isLogin = useSelector<any, boolean>(state => state.firebase.auth.uid);
  const dispatch = useDispatch();

  const addConjugation = () => {
    let newConjug = [...conjugation];
    newConjug.push(newWord);
    setConjugation(newConjug);
    setNewWord("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isLogin) {
      if (newWord.length > 0) addConjugation();
      if (conjugation.length > 0 && translation.length > 0) {
        dispatch(addWordToDatabase({ conjugation, translation }));
        setConjugation([]);
        setTranslation("");
        //TODO: PORUKA DA JE DODANO
      }
    } else setShowLogin(true);
  };

  const redirectHome = () => {
    setAnimate(true);
    setShowLogin(false);
    setTimeout(() => setRedirecting(true), 750);
  };

  const handleLoginMenu = () => {
    setShowLogin(false);
  };
  return (
    <div className="addform-page">
      <div
        className={
          animate
            ? "addform-square-background redirect-anim"
            : "addform-square-background"
        }
      />
      <i className="fas fa-home" onClick={redirectHome} />
      <form
        onSubmit={handleSubmit}
        noValidate
        className={showLoginMenu ? "addform hidden" : "addform"}
      >
        <h3>Enter New Word</h3>
        <InputField
          setter={setNewWord}
          id="newWord"
          value={newWord}
          text={conjugation.length > 0 ? "Enter Conjugation" : "Enter New Word"}
        />

        <i className="fas fa-plus btn-add" onClick={addConjugation}></i>

        <InputField
          setter={setTranslation}
          id="translation"
          value={translation}
          text="Enter Translation (English)"
        />

        <div className="conjugation-container">
          {conjugation.map((element, i) => (
            <p key={i}>{element}</p>
          ))}
        </div>

        <button
          className="btn-submit"
          type="submit"
          disabled={conjugation.length === 0 || translation.length === 0}
        >
          Add to Database
        </button>
      </form>
      <LoginScreen
        show={showLoginMenu}
        isLogin={isLogin}
        handleLoginMenu={handleLoginMenu}
        showBackside={() => {}}
      />
      {redirecting && <Redirect to="/" />}
    </div>
  );
};

export default AddForm;
