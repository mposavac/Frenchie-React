import { IAddFormActionProps } from "../../types/AddForm";
import { NEWWORD_RESPONSE } from "../../types/actions";

import { Dispatch } from "redux";

export const addWordToDatabase = (wordData: IAddFormActionProps) => {
  return (
    dispatch: Dispatch,
    getState: any,
    { getFirebase, getFirestore }: any
  ) => {
    const firestore = getFirestore();
    const userId: string = getState().firebase.auth.uid;
    firestore
      .collection("users")
      .doc(userId)
      .collection("words")
      .doc()
      .set({ word: wordData.conjugation, translation: wordData.translation })
      .then(() => dispatch({ type: NEWWORD_RESPONSE }));
  };
};
