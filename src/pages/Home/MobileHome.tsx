import React from 'react';
import { IHomeProps } from '../../types/Home';

const MobileHome: React.FC<IHomeProps> = ({
  isLoading,
  animateIndex,
  handleAnimation,
  isLogin,
}) => {
  return (
    <React.Fragment>
      {!isLoading && (
        <div className="card-holder-mobile">
          <div className={'container menu-container ' + (animateIndex === 1 ? 'transition' : '')}>
            <div className="menu first-menu" id="1" onClick={handleAnimation}>
              <i className="fas fa-question" />
              Quiz
            </div>
          </div>
          <div className={'container menu-container ' + (animateIndex === 2 ? 'transition' : '')}>
            <div className="menu second-menu" id="2" onClick={handleAnimation}>
              <i className="fas fa-edit" />
              Overview
            </div>
          </div>
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
          <div className={'container menu-container ' + (animateIndex === 3 ? 'transition' : '')}>
            <div className="menu third-menu" id="3" onClick={handleAnimation}>
              <i className="fas fa-pencil-alt" />
              Add new
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MobileHome;
