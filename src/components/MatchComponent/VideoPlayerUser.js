import React, { useEffect, useRef } from "react";
import styles from "./styles/style.module.css"
function VideoPlayerUser({ user }) {
  const ref = useRef();
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  console.log(ref.current , "sdasjkdj");
  return (
    <>
    {/* Uid: {user.uid} */}
    <div ref={ref} className={styles.itemLivestreamUser}></div>
  </>
  );
}

export default VideoPlayerUser;
