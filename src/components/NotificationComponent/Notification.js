import axios from "axios";
import React, { useEffect, useState } from "react";
import { getTokenFirebase } from "../../firebase/firebase";
import styles from "./styles/style.module.css";
function Notification() {
  const [clickNoti, setNoti] = useState(false);
  const [isMakeConnection, setMakeConnection] = useState(false);
  useEffect(() => {
    let data;
        async function tokenFunc() {
            if (!isMakeConnection) {
                data = await getTokenFirebase();
                if (data) {
                    // eslint-disable-next-line no-console
                    console.log("Token is", data);
                    localStorage.setItem("token_subcribe", data);
                    try {
                        const user =JSON.parse(localStorage.getItem("userInfo"))
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
  }, [isMakeConnection])
  return (
    <div>
      <div
        className={styles.noti}
        onClick={() => setNoti((clickNoti) => !clickNoti)}
      >
        <div className={styles.noti__number}>10</div>
        <div className={styles.noti__img}>
          <img src="/assets/icons/notification.png" alt="bell" />
        </div>
      </div>
      <div
        className={
          clickNoti
            ? `${styles.noti__content} ${styles.active}`
            : styles.noti__content
        }
      >
        <a href="#" className={styles.noti__link}>
          <div className={styles.content__img}>
            <img src="/assets/img/homepage/team1.png" alt="img" />
          </div>
          <div className={styles.content__text}>
            <p>Đăng ký giải tứ hùng thành công</p>
            <p className={styles.time}>10 giờ trước</p>
          </div>
        </a>
        <a href="#" className={styles.noti__link}>
          <div className={styles.content__img}>
            <img src="/assets/img/homepage/team1.png" alt="img" />
          </div>
          <div className={styles.content__text}>
            <p>Đăng ký giải tứ hùng thành công</p>
            <p className={styles.time}>10 giờ trước</p>
          </div>
        </a>
        <a href="#" className={styles.noti__link}>
          <div className={styles.content__img}>
            <img src="/assets/img/homepage/team1.png" alt="img" />
          </div>
          <div className={styles.content__text}>
            <p>
              Đăng ký giải tứ hùng thành côngĐăng ký giải tứ hùng thành côngĐăng
              ký giải tứ hùng thành côngĐăng ký giải tứ hùng thành công
            </p>
            <p className={styles.time}>10 giờ trước</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Notification;
