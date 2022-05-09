import React from "react";
import ListTeam from "./ListTeam";
import FindTeam from "./FindTeam";
import PagingTeam from "./PagingTeam";
import styles from "./TeamFind.module.css";
import gsap from "gsap";
import AOS from "aos";
import Transitions from "../Transitions/Transitions";
const MyTournamemts = () => {
  AOS.init();
  const tour = gsap.timeline();
  return (
    <>
      <Transitions timeline={tour} />
      <div
        className="myTournaments"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className={styles.myTourImg}>
          <img
            className={styles.img_mytour}
            src="/assets/img/findTournaments/cr7.png"
            alt="homeImg"
          />
        </div>

        <FindTeam />
        <ListTeam />
        <PagingTeam />
      </div>
    </>
  );
};

export default MyTournamemts;
