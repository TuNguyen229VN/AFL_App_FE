import React from 'react'
import Tournament from './Tournament';
import styles from "./TournamentFind.module.css";

const ListTournament = () => {
    
    return(
        <div className={styles.listTournament}>
        <h1 className={styles.titleListTour}>Các Giải đấu</h1>
        <div className={styles.listTour}>
        <Tournament img="./assets/img/findTournaments/poster1.jpg" />
        <Tournament img="./assets/img/findTournaments/poster2.jpg" />
        <Tournament img="./assets/img/findTournaments/poster3.jpg" />
        <Tournament img="./assets/img/findTournaments/poster4.jpg" />
        <Tournament img="./assets/img/findTournaments/poster5.jpg" />
        <Tournament img="./assets/img/findTournaments/poster6.jpg" />
        </div>
        </div>
    )
}


export default ListTournament;