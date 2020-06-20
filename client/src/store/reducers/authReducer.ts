import { LOGIN_ERROR, SIGNUP_ERROR, AuthActionTypes } from '../../types/actions';
import { IErrorResponse } from '../../types/Home';

const initState: IErrorResponse = { code: '', message: undefined };

const authReducer = (state = initState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log(action.error);
      return { ...action.error };
    case SIGNUP_ERROR:
      console.log(action.error);
      return { ...action.error };
    default:
      return state;
  }
};

export default authReducer;
