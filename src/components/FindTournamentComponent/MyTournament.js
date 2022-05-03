import React from "react";
import ListTournament from "./ListTournament";
import FindTournaments from "./FindTournament";
import PagingTournament from "./PagingTournament";
import styles from "./TournamentFind.module.css";
import gsap from "gsap";
import AOS  from "aos";
import Transitions from "../Transitions/Transitions";
const MyTournamemts = () => {
  AOS.init();
  const tour = gsap.timeline();
  return (
    <>
      <Transitions timeline={tour}/>
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
    </>
  );
};

export default MyTournamemts;
