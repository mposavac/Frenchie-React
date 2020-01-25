import { Dispatch } from "redux";

import adjectives from "../../assets/adjectives.json";
import nouns from "../../assets/nouns.json";
import verbs from "../../assets/verbs.json";

import { WORDS_FETCHED } from "../../types/actions";
import { IAddFormActionProps } from "../../types/AddForm.js";

export const fetchWords = (fileName: string) => {
  return async (dispatch: Dispatch, getState: any, { getFirestore }: any) => {
    if (fileName === "Adjectives")
      dispatch({ type: WORDS_FETCHED, words: adjectives });
    else if (fileName === "Nouns")
      dispatch({ type: WORDS_FETCHED, words: nouns });
    else if (fileName === "Verbs")
      dispatch({ type: WORDS_FETCHED, words: verbs });
    else if (fileName === "Your words") {
      const firestore = getFirestore();
      const words: Array<IAddFormActionProps> = [];
      const snapshots = await firestore
        .collection("users")
        .doc(getState().firebase.auth.uid)
        .collection("words")
        .get();
      snapshots.forEach((doc: any) => {
        words.push(doc.data());
      });
      dispatch({ type: WORDS_FETCHED, words: words });
    } else {
      console.log("GRAMMAR");
      // GRAMMAR
    }
  };
};
