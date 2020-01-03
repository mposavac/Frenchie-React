import React from "react";
import { useTransition, animated } from "react-spring";

function Loading({ isLoading }) {
  const transition = useTransition(isLoading, null, {
    from: {
      opacity: 0,
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      right: 0
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  return transition.map(
    ({ item, props, key }) =>
      item && (
        <animated.div style={props} key={key}>
          <div className="preloader">
            <div className="loader" />
          </div>
        </animated.div>
      )
  );
}

export default Loading;
