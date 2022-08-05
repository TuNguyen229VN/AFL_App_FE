import React, { useEffect, useRef } from "react";
import styles from "./styles/style.module.css"
function VideoPlayerUser({ user }) {
  const ref = useRef();
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  console.log(ref.current , "sdasjkdj");
  return (
    <div className={styles.itemLivestreamUser}>
    {/* Uid: {user.uid} */}
    <div ref={ref} className={styles.itemUser}></div>
    <div className={styles.optionLive}>
    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
    <i class="fa-solid fa-down-left-and-up-right-to-center"></i>
    </div>
  </div>
  );
}

export default VideoPlayerUser;
