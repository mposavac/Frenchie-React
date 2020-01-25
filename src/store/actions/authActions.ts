import { ISignupActionProps } from "../../types/Home";
import { Dispatch } from "redux";
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS
} from "../../types/actions";

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
      .then(() => dispatch({ type: SIGNUP_SUCCESS }))
      .catch((err: Response) => dispatch({ type: SIGNUP_ERROR, error: err }));
  };
};

export const logIn = (userData: ISignupActionProps) => {
  return (dispatch: Dispatch, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => dispatch({ type: LOGIN_SUCCESS }))
      .catch((err: Response) => dispatch({ type: LOGIN_ERROR, error: err }));
  };
};

export const signOut = () => {
  return (dispatch: Dispatch, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};
