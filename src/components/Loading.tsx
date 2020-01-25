import React from "react";
import { useTransition, animated } from "react-spring";

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const transition = useTransition(isLoading, null, {
    from: {
      opacity: 0,
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      right: 0,
      zIndex: 10000
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  return (
    <React.Fragment>
      {transition.map(
        ({ item, props, key }) =>
          item && (
            <animated.div style={props} key={key}>
              <div className="preloader">
                <div className="loader" />
              </div>
            </animated.div>
          )
      )}
    </React.Fragment>
  );
};

export default Loading;
