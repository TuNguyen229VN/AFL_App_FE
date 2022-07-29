import React from "react";
import styles from "./styles/style.module.css";
function AchievementTournamnetDetail() {
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
          <img
            src="/assets/img/homepage/tourn2.png"
            alt="tour"
            className={styles.avt}
          />
          <a href="#">Lữ đoàn đỏ</a>
        </div>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/second.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Á quân:</p>
          <img
            src="/assets/img/homepage/tourn2.png"
            alt="tour"
            className={styles.avt}
          />
          <a href="#">Lữ đoàn đỏ</a>
        </div>
        <div className={styles.content_item}>
          <img
            src="/assets/icons/three.png"
            alt="one"
            className={styles.achiveImg}
          />
          <p>Hạng ba:</p>
          <img
            src="/assets/img/homepage/tourn2.png"
            alt="tour"
            className={styles.avt}
          />
          <a href="#">Lữ đoàn đỏ</a>
        </div>
      </div>
      <p className={styles.titleAchieve}>Vua phá lưới</p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>Cầu thủ</th>
            <th>Số áo</th>
            <th>Đội thi đấu</th>
            <th>Số bàn ghi được</th>
          </tr>
          <tr>
            <td>1</td>
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
      <p className={`${styles.titleAchieve} ${styles.titleAchieve1}`}>
        Thống kê từng đội
      </p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>
              Tên đội <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              T-H-B <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Số bàn thắng <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Số bàn thua <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Thẻ vàng <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Thẻ đỏ <i class="fa-solid fa-sort"></i>
            </th>
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
              <p>2-0-1</p>
            </td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
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
              <p>2-0-1</p>
            </td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default AchievementTournamnetDetail;
