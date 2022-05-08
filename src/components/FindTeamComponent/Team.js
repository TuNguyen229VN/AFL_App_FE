import React from "react";
import styles from "./TeamFind.module.css";

const Team = (props) => {
  const { img } = props;
  return (
    <div className={styles.team}>
      <div className={styles.tournamentImgAd}>
        <img
          className={styles.teamImg}
          src={img}
          alt="myItem"
        />
      </div>

      <div className={styles.tournamentInfor}>
        <h1 className={styles.tournamentName}>KhoaTuAnhTam F.C</h1>
        <p className={styles.type}>Bóng Đá Nam | Tp. Hồ Chí Minh</p>
        <div className={styles.line}/>
        <div className={styles.tournamentFooter}>
          <div className={styles.teamPart}>
            <img className={styles.teamPartImg} src="./assets/icons/join.png" alt="join"/>
            <p>24</p>
          </div>
          <div className={styles.heart__shape}></div>
        </div>
      </div>
    </div>
  );
};

export default Team;
