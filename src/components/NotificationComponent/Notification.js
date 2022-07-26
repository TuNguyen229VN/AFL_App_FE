import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAPI } from "../../api";
import { getTokenFirebase, onMessageListener } from "../../firebase/firebase";
import styles from "./styles/style.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import { set } from "immutable";
import { toast } from "react-toastify";

function Notification() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [clickNoti, setNoti] = useState(false);
  const [isMakeConnection, setMakeConnection] = useState(false);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chooseOption, setChooseOption] = useState(true);
  const [countNews, setCountNews] = useState(0);
  const [limit, setLimit] = useState(6);
  const [check, setCheck] = useState(false);
  window.onclick = () => {
    setNoti(false);
  };
  const getNotification = () => {
    setLoading(true);
    let afterDefaultURL = "";
    if (chooseOption) {
      afterDefaultURL = `notifications?user-id=${user.userVM.id}&order-by=DateCreate&order-type=DESC&page-offset=1&limit=${limit}`;
    } else {
      afterDefaultURL = `notifications?user-id=${user.userVM.id}&is-seen=false&order-by=DateCreate&order-type=DESC&page-offset=1&limit=${limit}`;
    }
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setNotification(res.data.notifications);
        setCountNews(res.data.countNew);
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
  }, [isMakeConnection]);

  onMessageListener()
    .then((payload) => {
      // eslint-disable-next-line no-console
      console.log(payload);
      setCheck(!check);
      toast(CustomToastWithLink(payload), {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log("failed: ", err));

  useEffect(() => {
    getNotification();
  }, [limit, clickNoti, chooseOption, check]);

  const CustomToastWithLink = (item) => (
    <div>
      <div
        className={styles.noti__link1}
      >
        <div className={styles.content__text1}>
          <p className={styles.time1}>{item.notification.title}</p>
          <p>{item.notification.body}</p>
        </div>
        <div className={styles.content__img}>
          <div className={styles.circle1}></div>
        </div>
      </div>
    </div>
  );

  const [height, setHeight] = useState(0);
  const infiniteScroll = (event, clickNoti, notification) => {
    if (
      height.scrollHeight - Math.round(height.scrollTop) ===
      height.clientHeight
    ) {
      setLimit(limit + 4);
      updateNoti(event, clickNoti, notification);
    }
  };

  const formatDateTime = (date) => {
    const day = new Date(date);
    return (
      String(day.getHours()).padStart(2, "0") +
      ":" +
      String(day.getMinutes()).padStart(2, "0") +
      " - " +
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
  };

  const updateNoti = async (e, notification) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://afootballleague.ddns.net/api/v1/notifications",
        {
          id: notification.id,
          content: notification.content,
          isSeen: true,
          isActive: true,
          userId: notification.userId,
          tournamentId: notification.tournamentId,
          teamId: notification.teamId,
        }
        // {
        //   headers: { "content-type": "multipart/form-data" },
        // }
      );

      if (response.status === 200) {
        setLimit(limit);
        if (notification.teamId !== 0) {
          navigate(`/teamDetail/${notification.teamId}/inforTeamDetail`);
        } else {
          navigate(
            `/tournamentDetail/${notification.tournamentId}/inforTournamentDetail`
          );
        }
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const updateNewsCount = async (e, clickNoti) => {
    e.preventDefault();
    if (!clickNoti) {
      try {
        const response = await axios.post(
          `https://afootballleague.ddns.net/api/v1/notifications/update-old-notification?userId=${user.userVM.id}`,
          {
            headers: { "content-type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
        }
      } catch (error) {
        console.error(error.response);
      }
    }
  };
  return (
    <div>
      <div
        className={styles.noti}
        onClick={(e) => {
          e.stopPropagation();
          setNoti(!clickNoti);
          updateNewsCount(e, clickNoti);
          // updateNoti(e, clickNoti, notification);
        }}
      >
        {countNews !== 0 ? (
          <div className={styles.noti__number}>
            {countNews > 9 ? "9+" : countNews}
          </div>
        ) : null}
        <div
          className={
            countNews === 0
              ? styles.noti__img
              : `${styles.noti__img} ${styles.ring__bell}`
          }
        >
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
          infiniteScroll(e, clickNoti, notification);
        }}
      >
        <div className={styles.option}>
          <div
            className={chooseOption ? styles.choose__text : styles.option__text}
            onClick={(e) => {
              e.stopPropagation();
              setChooseOption(true);
            }}
          >
            Tất cả
          </div>
          <div
            className={
              !chooseOption ? styles.choose__text : styles.option__text
            }
            onClick={(e) => {
              e.stopPropagation();
              setChooseOption(false);
            }}
          >
            Chưa đọc
          </div>
        </div>
        {notification.length !== 0 ? (
          <>
            {notification.map((item) => (
              <div
                onClick={(e) => {
                  updateNoti(e, item);
                }}
                className={styles.noti__link}
                key={item.id}
              >
                <div className={styles.content__text}>
                  <p>{item.content}</p>
                  <p className={styles.time}>
                    {formatDateTime(item.dateCreate)}
                  </p>
                </div>
                {item.isSeen === false ? (
                  <div className={styles.content__img}>
                    <div className={styles.circle}></div>
                  </div>
                ) : null}
              </div>
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
