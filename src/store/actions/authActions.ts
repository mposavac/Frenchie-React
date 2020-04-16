import { IUserData } from '../../types/Home';
import { Dispatch } from 'redux';
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
} from '../../types/actions';
import { createUser, loginUser, signOutUser } from '../../server functions/serverFunctions';

export const signUp = (userData: IUserData) => {
  return (dispatch: Dispatch, getState: Function, { getFirebase, getFirestore }: any) => {
    let response = createUser(getFirebase, getFirestore, userData);
    response
      .then(() => dispatch({ type: SIGNUP_SUCCESS }))
      .catch((err: Response) => dispatch({ type: SIGNUP_ERROR, error: err }));
  };
};

export const logIn = (userData: IUserData) => {
  return (dispatch: Dispatch, getState: Function, { getFirebase }: any) => {
    let response = loginUser(getFirebase, userData);
    response
      .then(() => dispatch({ type: LOGIN_SUCCESS }))
      .catch((err: Response) => dispatch({ type: LOGIN_ERROR, error: err }));
  };
};

export const signOut = () => {
  return (dispatch: Dispatch, getState: Function, { getFirebase }: any) => {
    let resposne = signOutUser(getFirebase);
    resposne.then(() => dispatch({ type: SIGNOUT_SUCCESS }));
  };
};
