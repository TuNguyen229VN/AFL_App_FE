import React from "react";
import styles from "./TournamentFind.module.css";

const FindTournaments = () => {
  return (
    <div className={styles.findTournaments}>
      <div className={styles.findInfo}>
      <h1 className={styles.titleFindTour}>tìm giải đấu</h1>
      <p className={styles.desFindTour}>
        Tìm và đăng ký tham gia những giải đấu theo sở thích của mình
      </p>
      </div>
      <form className={styles.formFindTour}>
        <div>
          <input className={styles.inputNameTour} placeholder="Tên giải đấu" />
          <input className={styles.btnFindTour} type="button" value="Tìm kiến" />
        </div>
        <div className={styles.selectOp}>
          <select className={styles.selectArea}>
              <option>Khu vực</option>
          </select>
          <select className={styles.typeFootball}>
              <option>Hình thức</option>
          </select>
          <select className={styles.sortTour}>
              <option>Sắp Xếp</option>
          </select>
          <button className={styles.btnResetFind}>Cập nhật</button>
        </div>
      </form>
    </div>
  );
};

export default FindTournaments;
