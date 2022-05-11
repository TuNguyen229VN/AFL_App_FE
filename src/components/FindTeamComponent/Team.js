import React from "react";
import styles from "./TeamFind.module.css";

const Team = (team) => {
  return (
    <div className={styles.team}>
      <div className={styles.tournamentImgAd}>
        <img
          className={styles.teamImg}
          src={team.tour.teamAvatar}
          alt="myItem"
        />
      </div>

      <div className={styles.tournamentInfor}>
        <h1 className={styles.tournamentName}>{team.tour.teamName}</h1>
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
