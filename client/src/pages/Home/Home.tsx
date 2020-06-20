import React from 'react';
import { IPropsHome } from '../../types/Home';

const Home: React.FC<IPropsHome> = ({
  isLoading,
  animateIndex,
  handleAnimation,
  isLogin,
  isMobile,
}) => {
  const returnContainers = (numOfContainers: number) => {
    let output = [];
    for (let i = 0; i < numOfContainers; i++) {
      output.push(<div key={i * numOfContainers} className="container" />);
    }
    return output;
  };

  return (
    <React.Fragment>
      {!isLoading && (
        <div className={animateIndex ? 'card-holder animate' : 'card-holder'}>
          {!isMobile && returnContainers(4)}
          <div className={'container menu-container ' + (animateIndex === 1 ? 'transition' : '')}>
            <div className="menu first-menu" id="1" onClick={handleAnimation}>
              <i className="fas fa-question" />
              Quiz
            </div>
          </div>

          {!isMobile && returnContainers(3)}

          <div className={'container menu-container ' + (animateIndex === 2 ? 'transition' : '')}>
            <div className="menu second-menu" id="2" onClick={handleAnimation}>
              <i className="fas fa-edit" />
              All words
            </div>
          </div>

          {!isMobile && returnContainers(6)}

          <div
            className={
              'container menu-container ' +
              (animateIndex === 4 ? 'transition' : '') +
              (animateIndex === 5 ? 'transition backside' : '')
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

          {!isMobile && returnContainers(4)}

          <div className={'container menu-container ' + (animateIndex === 3 ? 'transition' : '')}>
            <div className="menu third-menu" id="3" onClick={handleAnimation}>
              <i className="fas fa-pencil-alt" />
              Add new
            </div>
          </div>
          {!isMobile && returnContainers(1)}
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
