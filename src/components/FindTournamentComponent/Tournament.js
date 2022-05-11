import React from "react";
import styles from "./TournamentFind.module.css";

const Tournament = (tour) => {
  return (
    <div className={styles.tournament}>
      <div className={styles.tournamentImgAd}>
        <img
          className={styles.tournamentImg}
          src={tour.tour.tournamentAvatar}
          alt={tour.tour.tournamentName}
        />
      </div>

      <div className={styles.tournamentInfor}>
        <h1 className={styles.tournamentName}>{tour.tour.tournamentName}</h1>
        <p className={styles.type}>Loại trực tiếp | Tp. Hồ Chí Minh</p>

        <div className={styles.tournamentFooter}>
          <div className={styles.teamPart}>
            <img className={styles.teamPartImg} src="./assets/icons/join.png" />
            <p>24</p>
          </div>
          <div className="heart__shape"></div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
