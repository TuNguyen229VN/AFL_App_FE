import React, { useEffect, useState } from "react";
import styles from "./styles/style.module.css";
import AgoraRTC from "agora-rtc-sdk";
import AgoraUIKit, { PropsInterface, layout } from "agora-react-uikit";

function Livestream(data) {
  var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {},
  };

  // Options for joining a channel
  var option = {
    appID: "629c856215b345779a8fb2a691f51976",
    channel: "MATCH_" + data.idMatch,
    uid: null,
    token: data.tokenLivestream,
    key: "",
    secret: "",
  };

  function joinChannel(role) {
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
    // Initialize the client
    rtc.client.init(
      option.appID,
      function () {
        console.log("init success");

        // Join a channel
        rtc.client.join(
          option.token ? option.token : null,
          option.channel,
          option.uid ? +option.uid : null,
          function (uid) {
            console.log(
              "join channel: " + option.channel + " success, uid: " + uid
            );
            rtc.params.uid = uid;
            if (role === "host") {
              rtc.client.setClientRole("host");
              // Create a local stream
              rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
              });

              // Initialize the local stream
              rtc.localStream.init(
                function () {
                  console.log("init local stream success");
                  rtc.localStream.play("local_stream");
                  rtc.client.publish(rtc.localStream, function (err) {
                    console.log("publish failed");
                    console.error(err);
                  });
                },
                function (err) {
                  console.error("init local stream failed ", err);
                }
              );

              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });
            }
            if (role === "audience") {
              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });

              rtc.client.on("stream-added", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                if (id !== rtc.params.uid) {
                  rtc.client.subscribe(remoteStream, function (err) {
                    console.log("stream subscribe failed", err);
                  });
                }
                console.log("stream-added remote-uid: ", id);
              });

              rtc.client.on("stream-removed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                console.log("stream-removed remote-uid: ", id);
              });

              rtc.client.on("stream-subscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.play("remote_video_");
                console.log("stream-subscribed remote-uid: ", id);
              });

              rtc.client.on("stream-unsubscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.pause("remote_video_");
                console.log("stream-unsubscribed remote-uid: ", id);
              });
            }
          },
          function (err) {
            console.error("client join failed", err);
          }
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  function leaveEventHost(params) {
    rtc.client.unpublish(rtc.localStream, function (err) {
      console.log("publish failed");
      console.error(err);
    });
    rtc.client.leave(function (ev) {
      console.log(ev);
    });
  }

  function leaveEventAudience(params) {
    rtc.client.leave(
      function () {
        console.log("client leaves channel");
        //……
      },
      function (err) {
        console.log("client leave failed ", err);
        //error handling
      }
    );
  }
  const [check, setCheck] = useState(false);
  useEffect(() => {
    joinChannel("audience");
  }, [check]);

  return (
    <div className={styles.livestream}>
      {/* <button onClick={() => joinChannel("host")}>
          Join Channel as Host
        </button> */}
      {/* <button onClick={() => joinChannel("audience")}>
          Join Channel as Audience
        </button> */}
      {/* <button onClick={() => leaveEventHost("host")}>Leave Event Host</button> */}
      {/* <button onClick={() => leaveEventAudience("audience")}>
          Leave Event Audience
        </button> */}
      <div className={styles.video} id="local_stream">
        <div
          id="remote_video_"
          style={{ width: "853px", height: "480px", objectFit: "contain" }}
        />
        {/* <iframe
          width="853"
          height="480"
          src="https://www.youtube.com/embed/oXNj9XxcLaU"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
      </div>
      <div className={styles.comment}>
        <div className={styles.commnet__content}>
          <div className={styles.one__comment}>
            <img src="/assets/img/homepage/pic-2.png" alt="a" />
            <div>
              <p className={styles.name}>Nguyen Van Teo</p>
              <p>
                @Hoàng Quang Đạt gặp mấy team kia dự bị đa số top tank hk ah.
                Đưa Itmins pick carry ngon lắm
              </p>
            </div>
          </div>
          <div className={styles.one__comment}>
            <img src="/assets/img/homepage/pic-1.png" alt="a" />
            <div>
              <p className={styles.name}>Nguyen Van Teo</p>
              <p>
                @Hoàng Quang Đạt gặp mấy team kia dự bị đa số top tank hk ah.
                Đưa Itmins pick carry ngon lắm
              </p>
            </div>
          </div>
        </div>
        <form className={styles.comment__input}>
          <input type="text" placeholder="Nhập bình luận" />
          <button>Gửi</button>
        </form>
      </div>
    </div>
  );
}

export default Livestream;
