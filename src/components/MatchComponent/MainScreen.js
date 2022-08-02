import React, { useEffect, useRef } from "react";
import styles from "./styles/style.module.css"
function MainScreen({ mainScreen }) {
  const ref1 = useRef();
  useEffect(() => {
    mainScreen.videoTrack.play(ref1.current);
  }, []);

  return (
    <>
      {/* Uid: {user.uid} */}
      <div ref={ref1} className={styles.itemLivestream}></div>
    </>
  );
}

export default MainScreen;
