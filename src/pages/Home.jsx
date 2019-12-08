import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "../style/home.scss";

function Home() {
  const [animateIndex, setAnimateIndex] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleAnimation = e => {
    setAnimateIndex(parseInt(e.target.id));
    console.log(animateIndex);
    setTimeout(() => setRedirecting(true), 800);
  };

  const returnContainers = numOfContainers => {
    let output = [];
    for (let i = 0; i < numOfContainers; i++) {
      output.push(<div className="container" />);
    }
    return output;
  };
  return (
    <div className="home">
      <div className="card-holder">
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
        {returnContainers(11)}
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
      </div>
      {redirecting && <Redirect to="/add" />}
    </div>
  );
}

export default Home;
