import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import { IPropsLoginScreen } from '../../types/Home';
import InputField from './InputField';
import { signUp, logIn } from '../../store/actions/authActions';
import Loading from '../Loading';

const LoginScreen: React.FC<IPropsLoginScreen> = ({
  show,
  isLogin,
  handleLoginMenu,
  showBackside,
}) => {
  const [username, setUsername] = useState<string>('');
  const [pswd, setPswd] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pswdRepeat, setPswdRepeat] = useState<string>('');
  const [loginSide, setloginSide] = useState<boolean>(true);
  const [animate, setAnimate] = useState<boolean>(false);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const errResponse = useSelector<any, string>((state) => state.auth.message);
  const dispatch = useDispatch();

  const transition = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  useEffect(() => {
    setUsername('');
    setEmail('');
    setPswd('');
    setPswdRepeat('');
    setErrMsg(null);
    setLoggingIn(false);
  }, [show]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const id: string = e.currentTarget.id;
    if (id === 'username') setUsername(e.currentTarget.value);
    else if (id === 'pswd') setPswd(e.currentTarget.value);
    else if (id === 'email') setEmail(e.currentTarget.value);
    else if (id === 'pswdRepeat') setPswdRepeat(e.currentTarget.value);
  };

  useEffect(() => {
    if (isLogin && show) handleLoginMenu();
    //eslint-disable-next-line
  }, [isLogin]);

  useEffect(() => {
    setErrMsg(errResponse);
    setLoggingIn(false);
  }, [errResponse]);

  const changeLoggin = () => {
    setAnimate(true);

    setTimeout(() => {
      setloginSide(!loginSide);
    }, 200);
    setTimeout(() => {
      setAnimate(false);
    }, 201);
    showBackside();
    setErrMsg(null);
  };

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoggingIn(true);
    dispatch(logIn({ email, password: pswd }));
  };

  const submitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pswd === pswdRepeat) {
      dispatch(signUp({ username, email, password: pswd }));
      setLoggingIn(true);
    } else setErrMsg('Please repeat password correctly.');
  };

  return (
    <React.Fragment>
      {transition.map(
        ({ item, props, key }) =>
          item && (
            <animated.div style={props} key={key}>
              <div className={animate ? 'login-screen animate' : 'login-screen'}>
                <i className="fas fa-arrow-circle-left" onClick={handleLoginMenu} />
                {loginSide ? (
                  <form className="login" onSubmit={submitLogin}>
                    <h2>Login to your account</h2>
                    <InputField
                      type="email"
                      id="email"
                      value={email}
                      name="E-mail"
                      handleInput={handleInput}
                      icon="fa-at"
                    />
                    <InputField
                      type="password"
                      id="pswd"
                      value={pswd}
                      name="Password"
                      handleInput={handleInput}
                      icon="fa-lock"
                    />
                    {errMsg && <p className="err-msg">{errMsg}</p>}
                    <button type="submit">LOG IN</button>
                  </form>
                ) : (
                  <form className="sign-up" onSubmit={submitSignUp}>
                    <h2>Create account</h2>
                    <InputField
                      type="text"
                      id="username"
                      value={username}
                      name="Username"
                      handleInput={handleInput}
                      icon="fa-user-alt"
                    />
                    <InputField
                      type="email"
                      id="email"
                      value={email}
                      name="E-mail"
                      handleInput={handleInput}
                      icon="fa-at"
                    />
                    <InputField
                      type="password"
                      id="pswd"
                      value={pswd}
                      name="Password"
                      handleInput={handleInput}
                      icon="fa-lock"
                    />
                    <InputField
                      type="password"
                      id="pswdRepeat"
                      value={pswdRepeat}
                      name="Repeat Password"
                      handleInput={handleInput}
                      icon="fa-lock"
                    />
                    {errMsg && <p className="err-msg">{errMsg}</p>}
                    <button type="submit">SIGN UP</button>
                  </form>
                )}
                <button className="change-btn" onClick={changeLoggin}>
                  {loginSide ? 'Create an account.' : 'Login to your account.'}
                </button>
              </div>
              <Loading isLoading={loggingIn} />
            </animated.div>
          ),
      )}
    </React.Fragment>
  );
};

export default LoginScreen;
