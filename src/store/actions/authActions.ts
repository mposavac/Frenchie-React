import { ISignupActionProps } from "../../types/Home";
import { Dispatch } from "redux";

export const signUp = (userData: ISignupActionProps) => {
  return (
    dispatch: Dispatch,
    getState: any,
    { getFirebase, getFirestore }: any
  ) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((res: any) => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({ userName: userData.username });
      })
      .then(() => dispatch({ type: "SIGNUP_SUCCESS" }))
      .catch((err: any) => dispatch({ type: "SIGNUP_SUCCESS" }));
  };
};

export const logIn = (userData: ISignupActionProps) => {
  return (dispatch: Dispatch, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => dispatch({ type: "LOGIN_SUCCESS" }))
      .catch((err: any) => dispatch({ type: "LOGIN_ERROR", err }));
  };
};

export const signOut = () => {
  return (dispatch: Dispatch, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};
