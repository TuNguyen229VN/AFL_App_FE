import React from "react";
import "./styles/style.css";
import styles from "./styles/style.module.css"
function ReportTeamDetail() {
  return (
    <>     
      <div className="teamdetail__content reportTeam">
        <div className="archivement">
          <h2 className="archivement__title">Giải thưởng</h2>
          <div className="archivement__list">
            <div className="archivement__item">
              <p className="archivement__name">Giải nhất</p>
              <img src="/assets/img/teamdetail/gold-cup.png" alt="1"></img>
              <p className="archivement__number">1</p>
            </div>
            <div className="archivement__item">
              <p className="archivement__name">Giải nhì</p>
              <img src="/assets/img/teamdetail/silver-cup.png" alt="2"></img>
              <p className="archivement__number">1</p>
            </div>
            <div className="archivement__item">
              <p className="archivement__name">Giải ba</p>
              <img src="/assets/img/teamdetail/bronze-cup.png" alt="3"></img>
              <p className="archivement__number">1</p>
            </div>
          </div>
        </div>
        <div className="match">
          <h2 className="match__title">Trận đấu</h2>
          <div className="match__list">
            <div className="match__item">
              <p className="match__name">Tổng số trận</p>
              <img src="/assets/img/teamdetail/match.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận thắng</p>
              <img src="/assets/img/teamdetail/winning.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận hòa</p>
              <img src="/assets/img/teamdetail/win.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận thua</p>
              <img src="/assets/img/teamdetail/exhausted-man.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
          </div>
        </div>
        <p className={`${styles.titleAchieve} ${styles.titleAchieve1}`}>
        Thống kê chi tiết từng giải
      </p>
      <div className={styles.wrapcontent}>
        <table className={styles.tableAchieve}>
          <tr>
            <th>#</th>
            <th>
              Tên giải <i class="fa-solid fa-sort"></i>
            </th>
            <th>
              Thành tích
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
              <p>Vô địch</p>
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
              <p>N/A</p>
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
    </>
  );
}

export default ReportTeamDetail;
