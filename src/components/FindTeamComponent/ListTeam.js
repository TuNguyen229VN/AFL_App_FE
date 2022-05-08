import React from 'react'
import Team from './Team';
import styles from "./TeamFind.module.css";

const ListTeam = () => {
    
    return(
        <div className={styles.listTournament} data-aos="fade-up">
        <h1 className={styles.titleListTour}>Các đội bóng</h1>
        <div className={styles.listTour}>
        <Team img="./assets/img/homepage/team1.png" />
        <Team img="./assets/img/homepage/team2.png" />
        <Team img="./assets/img/homepage/team3.png" />
        <Team img="./assets/img/homepage/team3.png" />
        <Team img="./assets/img/homepage/team2.png" />
        <Team img="./assets/img/homepage/team1.png" />
        </div>
        </div>
    )
}


export default ListTeam;