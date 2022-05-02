import React from "react";
import ListTournament from "./ListTournament";
import FindTournaments from "./FindTournament";
import PagingTournament from "./PagingTournament";
import styles from "./TournamentFind.module.css";

const MyTournamemts = () => {
  return (
    <div className="myTournaments">
        <div className={styles.myTourImg}>
        <img
        className={styles.img_mytour}
        src="/assets/img/findTournaments/cr7.png"
        alt="homeImg"
      />
        </div>
      

      <FindTournaments />
      <ListTournament />
      <PagingTournament />
    </div>
  );
};

export default MyTournamemts;
