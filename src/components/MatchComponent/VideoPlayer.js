import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/style.module.css";
import { toast } from "react-toastify";
function VideoPlayer({
  matchId,
  user,
  setMainScreen,
  sendScreen,
  index,
  setNumberScreen,
}) {
  const ref = useRef();
  console.log(user);
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  
  const [volume, setVolume] = useState(1000);
  const changeVolume = (e) => {
    let vol = parseInt(e.target.value);
    console.log(vol);
    !isNaN(vol) &&
      vol >= 0 &&
      vol <= 1000 &&
      setVolume(parseInt(e.target.value));
    user.audioTrack.setVolume(parseInt(e.target.value));
  };
  const changeScreenForUser = async (matchId, screenId) => {
    console.log(screenId);
    try {
      const response = await axios.put(
        `https://afootballleague.ddns.net/api/v1/matchs/IdScreen?matchId=${matchId}&screenId=${screenId}`,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      console.log(response.status);
      if (response.status === 204) {
        toast.success("Thay đổi màn hình thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(error.response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };
  const selectMainStream = (user) => {
    var newArr = [];
    newArr.push(user);
    setMainScreen(newArr);
    setNumberScreen(index);
    changeScreenForUser(matchId, user.uid);
    // sendScreen(user.uid + "");
  };
  return (
    <>
      <div
        ref={ref}
        onClick={() => selectMainStream(user)}
        className={styles.item}
      ></div>
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
      </div>
      <p className={styles.screenNum}>Màn hình {index + 1}</p>
    </>
  );
}

export default VideoPlayer;
