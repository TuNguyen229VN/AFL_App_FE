import React, { useEffect, useState, useRef } from "react";
import styles from "./styles/style.module.css";
// import AgoraRTC from "agora-rtc-sdk";
import { Button } from "@material-ui/core";
import AgoraUIKit, { PropsInterface, layout } from "agora-react-uikit";
import VideoRoom from "./VideoRoom";
import { useLocation, useNavigate } from "react-router-dom";
function Livestream(data) {
  const navigate = useNavigate();
  const [idUser, setidUser] = useState(data.user);
  const [idHostTournament, setIdHostTournament] = useState(
    data.idHostTournament
  );
  const location = useLocation();
  const tourDetail = location.state.tourDetail;
  const indexMatch = location.state.indexMatch;
  const title = location.state.title !== null ? location.state.title : null;
  const index = location.state.index !== null ? location.state.index : null;
  const lastMatch = location.state.lastMatch;
  const [videocall, setVideocall] = useState(true);
  const [isPinned, setisPinned] = useState(true);
  console.log(data.title)
  const [cLive, setCLive] = useState("");
  // Options for joining a channel
  const rtcProps = {
    appId: "ab5ddade1a8c4bfaa6f7018e03f73463",
    token: data.tokenLivestream,
    channel: "MATCH_" + data.idMatch,
    role: "audience",
    layout: isPinned ? layout.pin : layout.grid,
    idMatch: data.idMatch,
  };
  console.log(rtcProps);
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
          title={title}
          idMatch={data.idMatch}
          tourDetail={tourDetail}
          indexMatch={indexMatch}
          lastMatch={lastMatch}
          index={index}
          fullScreen={data.fullScreen}
          setFullScreen={data.setFullScreen}
          props={rtcProps}
          setInCall={setInCall}
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
