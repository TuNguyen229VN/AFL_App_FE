import React from 'react'
import Team from './Team';
import styles from "./TeamFind.module.css";

const ListTeam = (teams) => {
    
    return(
        <div className={styles.listTournament}>
        <h1 className={styles.titleListTour}>Các đội bóng</h1>
        <div className={styles.listTour}>
        {teams.teams.map((team) => {
          return (
            <div key={Team.id}>
              <Team tour={team} />;
            </div>
          );
        })}
        </div>
        </div>
    )
}


export default ListTeam;