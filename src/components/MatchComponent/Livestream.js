import React, { useEffect, useState, useRef } from "react";
import styles from "./styles/style.module.css";
// import AgoraRTC from "agora-rtc-sdk";
import { Button } from "@material-ui/core";
import AgoraUIKit, { PropsInterface, layout } from "agora-react-uikit";
import VideoRoom from "./VideoRoom";
import { useNavigate } from "react-router-dom";
function Livestream(data) {
  const navigate = useNavigate();
  const [idUser, setidUser] = useState(data.user);
  const [idHostTournament, setIdHostTournament] = useState(
    data.idHostTournament
  );

  console.log(data);

  const [videocall, setVideocall] = useState(true);
  const [isPinned, setisPinned] = useState(true);
  const [cLive, setCLive] = useState("");
  // Options for joining a channel
  const rtcProps = {
    appId: "70217642f3314dc0803bb253e501cf2d",
    token: data.tokenLivestream,
    channel: "MATCH_" + data.idMatch,
    role: "audience",
    layout: isPinned ? layout.pin : layout.grid,
    idMatch: data.idMatch,
  };

  const callbacks = {
    EndCall: () => setVideocall(false),
    PinnedVideo: () => console.log("s"),
  };

  const messageRef = useRef();
  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [data.message]);
  const [inCall, setInCall] = useState(true);
  return (
    <div className={styles.livestream}>
      <div className={styles.video}>
        <VideoRoom
          prediction={data.prediction}
          setPrediction={data.setPrediction}
          allTeamA={data.allTeamA}
          allTeamB={data.allTeamB}
          scoreA={data.scoreA}
          scoreB={data.scoreB}
          title={data.title}
          idMatch={data.idMatch}
          tourDetail={data.tourDetail}
          indexMatch={data.indexMatch}
          lastMatch={data.lastMatch}
          index={data.index}
          fullScreen={data.fullScreen}
          setFullScreen={data.setFullScreen}
          props={rtcProps}
          setInCall={setInCall}
          inCall={inCall}
          sendScreen={data.sendScreen}
          uId={data.uId}
          idUser={idUser}
          idHostTournament={idHostTournament}
          setCheckLivestream={data.setCheckLivestream}
        />
      </div>

      {/* {!inCall && <button onClick={() => setInCall(true)}>Join Room</button>}

      {inCall && <VideoRoom props={rtcProps} setInCall={setInCall}/>} */}
      {/* <div className={styles.video} id="local_stream">
        {inCall ? (
          <VideoCall setInCall={setInCall} />
        ) : (
          <div
            variant="contained"
            color="primary"
            onClick={() => setInCall(true)}
          >
            Join Call
          </div>
        )} */}
      {/* {videocall ? (
          <div style={{ display: "flex", width: "853px", height: "480px" }}>
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} styleProps={styleProps}/>
          </div>
        ) : (
          <h3>Chưa có livestream</h3>
        )} */}
      {/* </div> */}
      <div className={styles.comment} ref={messageRef}>
        <div className={styles.commnet__content}>
          {data.message.length > 0 &&
            data.message.map((m) => (
              <div className={styles.one__comment}>
                <img src={m.user.avatar} alt={m.user.username} />
                <div>
                  <p className={styles.name}>{m.user.username}</p>
                  <p>{m.comment}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <form className={styles.comment__input}>
        <input
          type="text"
          onChange={(e) => {
            setCLive(e.target.value);
          }}
          placeholder="Nhập bình luận"
          value={cLive}
        />
        <button
          onClick={(e) => {
            if (idUser === null) {
              navigate("/login");
            }
            data.sendComment(cLive);
            setCLive("");
            e.preventDefault();
          }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
}

export default Livestream;
