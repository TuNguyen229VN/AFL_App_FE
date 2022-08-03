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

  console.log(idUser, idHostTournament);
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

    if (mediaType === "audio") {
      //   user.audioTrack.play();
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
          idUser.userVM.id === idHostTournament
            ? users.map((user) => (
                <>
                  {/* <p>{user.uid}</p> */}
                  <VideoPlayer
                    key={user.uid}
                    user={user}
                    setMainScreen={setMainScreen}
                    sendScreen={props.sendScreen}
                  />
                </>
              ))
            : users.map((user) => (
                <>
                  {props.uId == user.uid ? (
                    <VideoPlayerUser key={user.uid} user={user} />
                  ) : null}
                </>
              ))}
        </div>
      ) : (
        <p>Chưa có video</p>
      )}
    </div>
  );
}

export default VideoRoom;
