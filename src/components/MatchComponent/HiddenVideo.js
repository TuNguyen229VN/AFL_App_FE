import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/style.module.css";
function HiddenVideo({ user, fullScreen, setFullScreen }) {
  const ref = useRef();

  const [volume, setVolume] = useState(-1);
  const changeVolume = (e) => {
    let vol = parseInt(e.target.value);
    console.log(vol);
    !isNaN(vol) &&
      vol >= 0 &&
      vol <= 1000 &&
      setVolume(parseInt(e.target.value));
    user.audioTrack.setVolume(parseInt(e.target.value));
  };
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <div className={styles.itemLivestreamUser} style={{display:"none"}}>
      {/* Uid: {user.uid} */}
      <div ref={ref} className={styles.itemUser}></div>
      <div className={styles.optionLive}>
        <div className={styles.slide_cont}>
          {volume === 0 ? (
            <i
              value={1000}
              class="fa-solid fa-volume-xmark"
              onClick={(e) => {
                let vol = parseInt(1000);
                !isNaN(vol) &&
                  vol >= 0 &&
                  vol <= 1000 &&
                  user.audioTrack.setVolume(parseInt(1000));
                setVolume(1000);
              }}
            ></i>
          ) : (
            <i
              value={0}
              class="fa-solid fa-volume-high"
              onClick={(e) => {
                let vol = parseInt(0);
                !isNaN(vol) &&
                  vol >= 0 &&
                  vol <= 1000 &&
                  user.audioTrack.setVolume(parseInt(0));
                setVolume(0);
              }}
            ></i>
          )}

          <div className={styles.slider}>
            <input
              type="range"
              min="0"
              max="1000"
              onChange={(e) => {
                changeVolume(e);
              }}
              value={volume}
            />
            <progress min="0" max="1000" value={volume} />
          </div>
        </div>
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

export default HiddenVideo;
