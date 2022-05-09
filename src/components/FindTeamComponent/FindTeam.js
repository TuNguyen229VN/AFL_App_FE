import React from "react";
import styles from "./TeamFind.module.css";

const FindTeam = () => {
  return (
    <div
      className={styles.findTournaments}
    >
      <div className={styles.findInfo}>
        <h1 className={styles.titleFindTour}>tìm đội bóng</h1>
        <p className={styles.desFindTour}>
          Tìm và đăng ký tham gia vào đội bóng theo đúng sở thích bản thân
        </p>
      </div>
      <form className={styles.formFindTour}>
        <div className={styles.findWrap}>
          <input className={styles.inputNameTour} placeholder="Tên đội bóng" />
          <input
            className={styles.btnFindTour}
            type="button"
            value="Tìm kiếm"
          />
        </div>
        <div className={styles.selectOp}>
          <select className={styles.selectArea}>
            <option>Khu vực</option>
          </select>
          <select className={styles.typeFootball}>
            <option>Trình độ</option>
          </select>
          <select className={styles.sortTour}>
            <option>Giới tính</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FindTeam;
