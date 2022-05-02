import React from "react";
import styles from "./TournamentFind.module.css";

const Tournament = (props) => {
  const { img } = props;
  return (
    <div className={styles.tournament}>
      <div className={styles.tournamentImgAd}>
        <img
          className={styles.tournamentImg}
          src={img}
          alt="myItem"
          width={180}
          height={150}
        />
      </div>

      <div className={styles.tournamentInfor}>
        <h1 className={styles.tournamentName}>UEFA Champion Leaguea</h1>
        <p className={styles.type}>Loại trực tiếp | Tp. Hồ Chí Minh</p>

        <div className={styles.tournamentFooter}>
          <div className={styles.teamPart}>
            <img className={styles.teamPartImg} src="./assets/icons/join.png" />
            <p>24</p>
          </div>
          <div>
            <p className={styles.tournamentLenght}>44/52</p>
            <div style={{
                marginTop: 10,
                width: 100
            }} class="progress">
              <div
                class="progress-bar w-25"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          
          </div>
          <div className="heart__shape"></div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
