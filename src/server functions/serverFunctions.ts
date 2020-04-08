import { IQActionCustomWords } from '../types/Quiz';
import { ISignupActionProps } from '../types/Home';
import { IAddFormActionProps } from '../types/AddForm';

export const addUserWords = (getState: any, getFirestore: any, wordData: IAddFormActionProps) => {
  const firestore = getFirestore();
  const userId: string = getState().firebase.auth.uid;
  return firestore
    .collection('users')
    .doc(userId)
    .collection('words')
    .doc()
    .set({ word: wordData.conjugation, translation: wordData.translation });
};

export const getUserWords = async (getState: any, getFirestore: any) => {
  console.log(getState());
  const firestore = getFirestore();
  let words: Array<IQActionCustomWords> = [];
  const snapshots = await firestore
    .collection('users')
    .doc(getState().firebase.auth.uid)
    .collection('words')
    .get();
  snapshots.forEach((doc: any) => {
    words.push(doc.data());
  });
  console.log(words);
  return words;
};

export const createUser = (getFirebase: any, getFirestore: any, userData: ISignupActionProps) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then((res: any) => {
      return firestore.collection('users').doc(res.user.uid).set({ userName: userData.username });
    });
};

export const loginUser = (getFirebase: any, userData: ISignupActionProps) => {
  const firebase = getFirebase();
  return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
};

export const signOutUser = (getFirebase: any) => {
  const firebase = getFirebase();
  return firebase.auth().signOut();
};
