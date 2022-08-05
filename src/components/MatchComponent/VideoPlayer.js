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
      <p className={styles.screenNum}>Màn hình {index + 1}</p>
    </>
  );
}

export default VideoPlayer;
