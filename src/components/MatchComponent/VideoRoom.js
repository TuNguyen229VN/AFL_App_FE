import AgoraRTC, { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import styles from "./styles/style.module.css";
import VideoPlayerUser from "./VideoPlayerUser";
function VideoRoom(props) {
  const APP_ID = props.props.appId;
  const TOKEN = props.props.token;
  const CHANNEL = props.props.channel;
  const [idUser, setIdUser] = useState(props.idUser);
  const [idHostTournament, setIdHostTournament] = useState(
    props.idHostTournament
  );
  const [uid, setUid] = useState(props.uId);

  console.log(props.uId)
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
      // setMainScreen((previousUsers) => [...previousUsers, user]);
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
    // setMainScreen((previousUsers) =>
    //   previousUsers.filter((u) => u.uid !== user.uid)
    // );
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
        // setMainScreen((previousUsers) => [
        //   ...previousUsers,
        //   {
        //     uid,
        //     videoTrack,
        //     audioTrack,
        //   },
        // ]);
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
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {users.length > 0 ? (
        <div
          className={
            idUser !== null &&
            idHostTournament !== null &&
            idUser.userVM.id === idHostTournament
              ? styles.listLivestream
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
                    numberScreen === index
                      ? `${styles.itemLivestream} ${styles.active}`
                      : styles.itemLivestream
                  }
                >
                  <VideoPlayer
                    index={index}
                    key={user.uid}
                    user={user}
                    setMainScreen={setMainScreen}
                    sendScreen={props.sendScreen}
                    setNumberScreen={setNumberScreen}
                  />
                </div>
              </>
            ))
          ) : props.uId.length>0 ? (
            users.map((user) => (
              <>
                {props.uId == user.uid ? (
                  <VideoPlayerUser key={user.uid} user={user} />
                ) : null}
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
