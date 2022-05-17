import React, { useState } from "react";
import styles from "./styles/style.module.css";
function Notification() {
  const [clickNoti, setNoti] = useState(false);
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
      <div className={clickNoti?`${styles.noti__content} ${styles.active}`:styles.noti__content}>
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
            <p>Đăng ký giải tứ hùng thành côngĐăng ký giải tứ hùng thành côngĐăng ký giải tứ hùng thành côngĐăng ký giải tứ hùng thành công</p>
            <p className={styles.time}>10 giờ trước</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Notification;
