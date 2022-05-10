import React from "react";
import "./styles/style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderTournamentDetail from "./HeaderTournamentDetail";
function ScheduleTournamentDetail() {
  return (
    <>
      <Header />
      <div className="teamdetail ">
        <HeaderTournamentDetail />
        <div className="teamdetail__content schedule__tour"></div>
      </div>
      <Footer/>
    </>
  );
}

export default ScheduleTournamentDetail;
