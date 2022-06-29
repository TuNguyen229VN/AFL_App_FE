import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAPI } from "../../api";
import { getTokenFirebase } from "../../firebase/firebase";
import styles from "./styles/style.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Notification() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [clickNoti, setNoti] = useState(false);
  const [isMakeConnection, setMakeConnection] = useState(false);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  window.onclick=()=>{
    setNoti(false);
  }
  const getNotification = () => {
    setLoading(true);
    let afterDefaultURL = `notifications?user-id=${user.userVM.id}&order-by=DateCreate&order-type=DESC&page-offset=1&limit=${limit}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setNotification(res.data.notifications);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    let data;
    async function tokenFunc() {
      if (!isMakeConnection) {
        data = await getTokenFirebase();
        if (data) {
          // eslint-disable-next-line no-console
          // console.log("Token is", data);
          localStorage.setItem("token_subcribe", data);
          try {
            const response = await axios.post(
              `https://afootballleague.ddns.net/api/v1/notifications/connection`,
              {
                token: data,
                email: user.userVM.email,
              }
            );
            if (response.status === 200) {
              // eslint-disable-next-line no-console
              console.log("OK");
              setMakeConnection(true);
            }
          } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
          }
        } else {
          // eslint-disable-next-line no-console
          console.log("oh no, oh no");
        }
      }
    }

    tokenFunc();
    getNotification();
  }, [isMakeConnection, limit]);

  const [height, setHeight] = useState(0);
  const infiniteScroll = (event) => {
    if (
      height.scrollHeight - Math.round(height.scrollTop) ===
      height.clientHeight
    ) {
      setLimit(limit + 4);
    }
  };

  const formatDateTime = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear() +
      " " +
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0")
    );
  };

  return (
    <div>
      <div
        className={styles.noti}
        onClick={(e) => {
          e.stopPropagation();
          setNoti((clickNoti) => !clickNoti)}}
      >
        <div className={styles.noti__number}>10</div>
        <div className={styles.noti__img}>
          <img src="/assets/icons/notification.png" alt="bell" />
        </div>
      </div>
      <div
        id="noti__content"
        className={
          clickNoti
            ? `${styles.noti__content} ${styles.active}`
            : styles.noti__content
        }
        ref={(divElement) => {
          setHeight(divElement);
        }}
        onScroll={(e) => {
          infiniteScroll(e);
        }}
      >
        {notification.length !== 0 ? (
          <>
            {notification.map((item) => (
              <a href="#" className={styles.noti__link} key={item.id}>
                <div className={styles.content__img}>
                  <img src="/assets/img/homepage/team1.png" alt="img" />
                </div>
                <div className={styles.content__text}>
                  <p>{item.content}</p>
                  <p className={styles.time}>{formatDateTime(item.dateCreate)}</p>
                </div>
              </a>
            ))}
            {loading ? (
              <div className={styles.noti__link}>
                <Skeleton height={50} width={50} circle />
                <Skeleton height={50} width={280} style={{ marginLeft: 6 }} />
              </div>
            ) : null}
          </>
        ) : (
          <div className={styles.noti__link}>
            <div className={styles.content__text}>
              <p className={styles.noNoti}>Chưa có thông báo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
