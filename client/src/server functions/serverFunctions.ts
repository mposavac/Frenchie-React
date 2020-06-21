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
  return words;
};

export const createUser = (getFirebase: Function, getFirestore: Function, userData: IUserData) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then((res: ICreateUserResponse) => {
      return firestore.collection('users').doc(res.user.uid).set({
        userName: userData.username,
        highScore: 0,
        lastPlayed: 0,
        lastStreakEntered: 0,
        streak: 0,
      });
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

export const setScoreAndStreak = (getState: Function, getFirestore: Function, score: number) => {
  const firestore = getFirestore();
  const userId: string = getState().firebase.auth.uid;
  const currentTime = Date.now();
  const highScore: number = Math.max(getState().firebase.profile.highScore, score);
  const diffTime = Math.abs(currentTime - getState().firebase.profile.lastStreakEntered);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return firestore
    .collection('users')
    .doc(userId)
    .update({ lastPlayed: currentTime, highScore: highScore })
    .then(() => {
      if (diffDays === 0) {
        return {};
      } else if (diffDays === 1) {
        let streak = getState().firebase.profile.streak + 1;
        return firestore
          .collection('users')
          .doc(userId)
          .update({ lastStreakEntered: currentTime, streak: streak });
      } else if (diffDays > 1) {
        return firestore
          .collection('users')
          .doc(userId)
          .update({ lastStreakEntered: currentTime, streak: 1 });
      }
    });
};

export const getIcons = async (getFirebase: Function) => {
  const firebase = getFirebase();
  const storageRef = firebase.storage();
  let results = await storageRef.ref('images').listAll();
  let imagePromises = await results.items.map(
    async (imgRef: any) => await imgRef.getDownloadURL().then((url: string) => url),
  );
  let urls: Array<string> = [];
  await Promise.all(imagePromises).then((values: any) => {
    urls = values;
  });
  return urls;
};

export const getWords = async (category: string) => {
  let words: Array<IWordData> = [];
  await fetch(process.env.REACT_APP_URL + category)
    .then((res) => res.json())
    .then((res) => (words = res));
  return words;
};
