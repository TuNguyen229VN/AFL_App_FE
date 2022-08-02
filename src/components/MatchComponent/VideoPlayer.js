import React, { useEffect, useRef } from "react";
import styles from "./styles/style.module.css"
function VideoPlayer({ user,setMainScreen,sendScreen }) {
  const ref = useRef();
  console.log(user)
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  const selectMainStream=(user)=>{
    var newArr=[]
    newArr.push(user);
    setMainScreen(newArr);
    sendScreen(user.uid);
  }
  return (
    <>
      {/* Uid: {user.uid} */}
      <div ref={ref} className={styles.itemLivestream} onClick={()=>selectMainStream(user)}></div>
    </>
  );
}

export default VideoPlayer;
