import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/style.module.css";
function VideoPlayer({ user, setMainScreen, sendScreen, index,setNumberScreen }) {
  const ref = useRef();
  console.log(user);
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  const selectMainStream = (user) => {
    var newArr = [];
    newArr.push(user);
    setMainScreen(newArr);
    setNumberScreen(index);
    sendScreen(user.uid + "");
  };
  return (
    <>
      <div
        ref={ref}
        onClick={() => selectMainStream(user)}
        className={styles.item}
      ></div>
      <p className={styles.screenNum}>Màn hình {index + 1}</p>
    </>
  );
}

export default VideoPlayer;
