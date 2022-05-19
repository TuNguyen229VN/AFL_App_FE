import React, { useRef, useEffect } from "react";
import "./styles/style.css";
import { Expo } from "gsap";
function Transitions({ timeline }) {
  const trans = useRef(null);
  useEffect(() => {
    timeline.to(trans.current, {
      duration: 3,
      top: "-100%",
      opacity: 0,
      ease: Expo.easeInOut,
      scaleX: 1.1
    });
  });
  return (
    <div>
      <div className="transitions" ref={trans}>
          <img src="/assets/img/homepage/logo.png" alt="logo"/>
      </div>
    </div>
  );
}

export default Transitions;
