import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";

import { IPropsHLogin } from "../../types/Home";
import InputField from "./InputField";
import { signUp, logIn } from "../../store/actions/authActions";

const LoginScreen: React.FC<IPropsHLogin> = ({
  show,
  handleLoginMenu,
  showBackside
}) => {
  const [username, setUsername] = useState<string>("");
  const [pswd, setPswd] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pswdRepeat, setPswdRepeat] = useState<string>("");
  const [loggingIn, setLoggingIn] = useState<boolean>(true);
  const [animate, setAnimate] = useState<boolean>(false);
  const dispatch = useDispatch();

  const transition = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const handleInput = (e: any) => {
    const id: string = e.target.id;
    if (id === "username") setUsername(e.target.value);
    else if (id === "pswd") setPswd(e.target.value);
    else if (id === "email") setEmail(e.target.value);
    else if (id === "pswdRepeat") setPswdRepeat(e.target.value);
  };

  const changeLoggin = () => {
    setAnimate(true);
    setTimeout(() => {
      setLoggingIn(!loggingIn);
    }, 200);
    setTimeout(() => {
      setAnimate(false);
    }, 201);
    showBackside();
  };

  const submitLogin = (e: any) => {
    e.preventDefault();
    dispatch(logIn({ email, password: pswd }));
    handleLoginMenu();
  };

  const submitSignUp = (e: any) => {
    e.preventDefault();
    if (pswd === pswdRepeat)
      dispatch(signUp({ username, email, password: pswd }));
    handleLoginMenu();
  };
  return (
    <React.Fragment>
      {transition.map(
        ({ item, props, key }) =>
          item && (
            <animated.div style={props} key={key}>
              <div
                className={animate ? "login-screen animate" : "login-screen"}
              >
                <i className="fas fa-angle-left" onClick={handleLoginMenu} />
                {loggingIn ? (
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
                    <button type="submit">SIGN UP</button>
                  </form>
                )}
                <button className="change-btn" onClick={changeLoggin}>
                  {loggingIn ? "Create an account." : "Login to your account."}
                </button>
              </div>
            </animated.div>
          )
      )}
    </React.Fragment>
  );
};

export default LoginScreen;
