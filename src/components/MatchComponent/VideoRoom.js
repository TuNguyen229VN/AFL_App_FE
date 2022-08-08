import AgoraRTC, { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import styles from "./styles/style.module.css";
import VideoPlayerUser from "./VideoPlayerUser";
import { toast } from "react-toastify";
import axios from "axios";
function VideoRoom(props) {
  const APP_ID = props.props.appId;
  const TOKEN = props.props.token;
  const CHANNEL = props.props.channel;
  const [idUser, setIdUser] = useState(props.idUser);
  const [idHostTournament, setIdHostTournament] = useState(
    props.idHostTournament
  );
  const [uid, setUid] = useState(props.uId);

  console.log(props.uId);
  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });
  const [users, setUsers] = useState([]);
  const [mainScreen, setMainScreen] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
      props.setCheckLivestream((previousUsers) => [...previousUsers, user]);
    }

    if (
      (mediaType === "audio" && props.uId.length > 0) ||
      (mediaType === "audio" &&
        idUser !== null &&
        idHostTournament !== null &&
        idUser.userVM.id === idHostTournament)
    ) {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
    props.setCheckLivestream((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) => Promise.all([AgoraRTC, uid]))
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);

        props.setCheckLivestream((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  const [numberScreen, setNumberScreen] = useState(0);
  const changeScreenForUser = async (matchId) => {
    try {
      const response = await axios.put(
        `https://afootballleague.ddns.net/api/v1/matchs/IdScreen?matchId=${matchId}&screenId=${0}`,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      console.log(response.status);
      if (response.status === 204) {
        toast.success("Kết thúc livestream", {
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
  const checkLiveScreen = () => {
    let check = false;
    if (
      users.length > 0 &&
      idUser !== null &&
      idHostTournament !== null &&
      idUser.userVM.id === idHostTournament
    ) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].uid == props.uId) {
          check = true;
          break;
        }
      }
      if (!check) {
        return (
          <p className={styles.buttonSelect}>
            Vui lòng chọn màn hình để livestream
          </p>
        );
      } else {
        return (
          <p
            className={styles.buttonOff}
            onClick={() => changeScreenForUser(props.props.idMatch)}
          >
            Tạm dừng livestream
          </p>
        );
      }
    }
    return null;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {checkLiveScreen()}
      {users.length > 0 ? (
        <div
          className={
            idUser !== null &&
            idHostTournament !== null &&
            idUser.userVM.id === idHostTournament
              ? styles.listLivestream
              : props.fullScreen
              ? styles.listLivestreamUserFull
              : styles.listLivestreamUser
          }
        >
          {idUser !== null &&
          idHostTournament !== null &&
          idUser.userVM.id === idHostTournament ? (
            users.map((user, index) => (
              <>
                {/* <p>{user.uid}</p> */}
                <div
                  className={
                    props.uId == user.uid
                      ? `${styles.itemLivestream} ${styles.active}`
                      : styles.itemLivestream
                  }
                >
                  <VideoPlayer
                    matchId={props.props.idMatch}
                    index={index}
                    key={user.uid}
                    user={user}
                    setMainScreen={setMainScreen}
                    setNumberScreen={setNumberScreen}
                  />
                </div>
              </>
            ))
          ) : props.uId.length > 0 ? (
            users.map((user) => (
              <>
                {props.uId == user.uid ? (
                  <VideoPlayerUser
                    key={user.uid}
                    user={user}
                    setFullScreen={props.setFullScreen}
                    fullScreen={props.fullScreen}
                  />
                ) : (
                  <p className={styles.notLive}>Chưa có livestream</p>
                )}
              </>
            ))
          ) : (
            <p className={styles.notLive}>Chưa có livestream</p>
          )}
        </div>
      ) : (
        <p className={styles.notLive}>Chưa có livestream</p>
      )}
    </div>
  );
}

export default VideoRoom;
