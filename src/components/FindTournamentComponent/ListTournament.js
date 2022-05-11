import React from "react";
import Tournament from "./Tournament";
import styles from "./TournamentFind.module.css";

const ListTournament = (tournaments,loading) => {
    // console.log(loading);
  return (
    <div className={styles.listTournament}>
      <h1 className={styles.titleListTour}>Các Giải đấu</h1>
      <div className={styles.listTour}>
        {tournaments.tournaments.map((tour) => {
          return (
            <div key={tour.id}>
              <Tournament tour={tour} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListTournament;
