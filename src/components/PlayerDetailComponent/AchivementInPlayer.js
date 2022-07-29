import React from "react";
import styles from "./styles/style.module.css";
function AchivementInPlayer() {
  return (
    <div className={styles.achievementTournamnet}>
      <p className={styles.titleAchieve}>Thành tích giải đấu</p>
      <div className={`${styles.wrapcontent} ${styles.wrapcontentflex}`}>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/one.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Vô địch:</p>
          <p>1</p>
        </div>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/second.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Á quân:</p>
          <p>1</p>
        </div>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/three.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Hạng ba:</p>
          <p>1</p>
        </div>
      </div>
      <p className={`${styles.titleAchieve}`}>Chi tiết từng giải đấu</p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>
              Tên giải <i class="fa-solid fa-sort"></i>
            </th>
            <th>Thành tích</th>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <a href="#" className={styles.tableTeamName}>
                <img
                  src="/assets/img/homepage/tourn2.png"
                  alt="tour"
                  className={styles.avt}
                />
                <p>Peter Tèo</p>
              </a>
            </td>
            <td>
              <p>Vô địch</p>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <a href="#" className={styles.tableTeamName}>
                <img
                  src="/assets/img/homepage/tourn2.png"
                  alt="tour"
                  className={styles.avt}
                />
                <p>Peter Tèo</p>
              </a>
            </td>
            <td>
              <p>Á quân</p>
            </td>
          </tr>
        </table>
      </div>
      <p className={`${styles.titleAchieve} ${styles.titleAchieve1}`}>
        Vua phá lưới
      </p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>Giải tham gia</th>
            <th>Cầu thủ</th>
            <th>Số áo</th>
            <th>Đội thi đấu</th>
            <th>Số bàn ghi được</th>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <a href="#" className={styles.tableTeamName}>
                <img
                  src="/assets/img/homepage/tourn2.png"
                  alt="tour"
                  className={styles.avt}
                />
                <p>Vui hè</p>
              </a>
            </td>
            <td>
              <a href="#">Peter Tèo</a>
            </td>
            <td className={styles.tablePlayerName}>
              <img
                src="/assets/img/homepage/tourn2.png"
                alt="tour"
                className={styles.avt}
              />
              <p>09</p>
            </td>
            <td>
              <a href="#">FC Hà Nội</a>
            </td>
            <td>10</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default AchivementInPlayer;
