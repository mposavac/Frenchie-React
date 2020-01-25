import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";

import { signOut } from "../store/actions/authActions";
import Loading from "../components/Loading";
import LoginScreen from "../components/home/LoginScreen";
import "../style/home.scss";

const Home: React.FC<{}> = () => {
  const [animateIndex, setAnimateIndex] = useState<number | undefined>(
    undefined
  );
  const [redirecting, setRedirecting] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginMenuOpen, setLoginMenuOpen] = useState<boolean>(false);
  const isLogin = useSelector<any, boolean>(state =>
    state.firebase.auth.uid ? state.firebase.auth.uid : false
  );
  const dispatch = useDispatch();
  const handleAnimation = (e: any) => {
    setAnimateIndex(parseInt(e.target.id));
    let redirectingTo: string;
    if (e.target.id === "1") redirectingTo = "/quiz";
    else if (e.target.id === "2") redirectingTo = "/overview";
    else if (e.target.id === "3") redirectingTo = "/add";

    if (e.target.id === "4" && isLogin) {
      setAnimateIndex(undefined);
      dispatch(signOut());
      //ANIMACIJA LOADING
    } else if (e.target.id === "4")
      setTimeout(() => {
        handleLoginMenu();
      }, 800);
    else setTimeout(() => setRedirecting(redirectingTo), 800);
  };

  const handleLoginMenu = () => {
    setLoginMenuOpen(!loginMenuOpen);
    if (loginMenuOpen) setAnimateIndex(undefined);
  };

  const showBackside = () => {
    if (animateIndex === 4) setAnimateIndex(5);
    else setAnimateIndex(4);
  };

  const returnContainers = (numOfContainers: number) => {
    let output = [];
    for (let i = 0; i < numOfContainers; i++) {
      output.push(<div key={i * numOfContainers} className="container" />);
    }
    return output;
  };

  return (
    <div className="home">
      <Loading isLoading={isLoading} />
      <div
        className={isLoading ? "video-background" : "video-background active"}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=odw6rIoiJuo"
          playing
          muted
          loop
          width="150%"
          height="150%"
          onStart={() => setIsLoading(false)}
        />
      </div>
      {!isLoading && (
        <div className={animateIndex ? "card-holder animate" : "card-holder"}>
          {returnContainers(4)}
          <div
            className={
              "container menu-container " +
              (animateIndex === 1 ? "transition" : "")
            }
          >
            <div className="menu first-menu" id="1" onClick={handleAnimation}>
              <i className="fas fa-question" />
              Quiz
            </div>
          </div>
          {returnContainers(3)}
          <div
            className={
              "container menu-container " +
              (animateIndex === 2 ? "transition" : "")
            }
          >
            <div className="menu second-menu" id="2" onClick={handleAnimation}>
              <i className="fas fa-edit" />
              Overview
            </div>
          </div>
          {returnContainers(6)}
          <div
            className={
              "container menu-container " +
              (animateIndex === 4 ? "transition" : "") +
              (animateIndex === 5 ? "transition backside" : "")
            }
          >
            <div className="menu forth-menu" id="4" onClick={handleAnimation}>
              {isLogin ? (
                <React.Fragment>
                  <i className="fas fa-sign-out-alt" />
                  Sign Out
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <i className="fas fa-sign-in-alt" />
                  Sign In
                </React.Fragment>
              )}
            </div>
          </div>
          {returnContainers(4)}
          <div
            className={
              "container menu-container " +
              (animateIndex === 3 ? "transition" : "")
            }
          >
            <div className="menu third-menu" id="3" onClick={handleAnimation}>
              <i className="fas fa-pencil-alt" />
              Add new
            </div>
          </div>
          {returnContainers(1)}
        </div>
      )}

      <LoginScreen
        show={loginMenuOpen}
        isLogin={isLogin}
        handleLoginMenu={handleLoginMenu}
        showBackside={showBackside}
      />
      {redirecting && <Redirect to={redirecting} />}
    </div>
  );
};

export default Home;
