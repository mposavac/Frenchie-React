import { IUserData } from '../types/Home';
import { IWordData } from '../types/AddForm';
import { ICreateUserResponse } from '../types/serverTypes';

export const addUserWords = (getState: Function, getFirestore: Function, wordData: IWordData) => {
  const firestore = getFirestore();
  const userId: string = getState().firebase.auth.uid;
  return firestore
    .collection('users')
    .doc(userId)
    .collection('words')
    .doc()
    .set({ word: wordData.word, translation: wordData.translation });
};

export const getUserWords = async (getState: Function, getFirestore: Function) => {
  const firestore = getFirestore();
  let words: Array<IWordData> = [];
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

export const createUser = (getFirebase: Function, getFirestore: Function, userData: IUserData) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then((res: ICreateUserResponse) => {
      return firestore.collection('users').doc(res.user.uid).set({ userName: userData.username });
    });
};

export const loginUser = (getFirebase: Function, userData: IUserData) => {
  const firebase = getFirebase();
  return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
};

export const signOutUser = (getFirebase: Function) => {
  const firebase = getFirebase();
  return firebase.auth().signOut();
};
