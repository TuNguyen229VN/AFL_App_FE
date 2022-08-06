import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/style.module.css";
function VideoPlayerUser({ user, fullScreen, setFullScreen }) {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <div className={styles.itemLivestreamUser}>
      {/* Uid: {user.uid} */}
      <div ref={ref} className={styles.itemUser}></div>
      <div className={styles.optionLive}>
        {fullScreen === false ? (
          <i
            class="fa-solid fa-up-right-and-down-left-from-center"
            onClick={() => {
              setFullScreen(true);
            }}
          ></i>
        ) : (
          <i
            class="fa-solid fa-down-left-and-up-right-to-center"
            onClick={() => {
              setFullScreen(false);
            }}
          ></i>
        )}
      </div>
    </div>
  );
}

export default VideoPlayerUser;
