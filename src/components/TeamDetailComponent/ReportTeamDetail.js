import React from "react";
import "./styles/style.css";
import HeaderTeamDetail from "./HeaderTeamDetail";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
function ReportTeamDetail() {
  return (
    <>
    <Header/>
    <div className="teamdetail">
      <HeaderTeamDetail />
      <div className="teamdetail__content reportTeam">
        <div className="archivement">
          <h2 className="archivement__title">Giải thưởng</h2>
          <div className="archivement__list">
            <div className="archivement__item">
              <p className="archivement__name">Giải nhất</p>
              <img src="assets/img/teamdetail/gold-cup.png" alt="1"></img>
              <p className="archivement__number">1</p>
            </div>
            <div className="archivement__item">
              <p className="archivement__name">Giải nhì</p>
              <img src="assets/img/teamdetail/silver-cup.png" alt="2"></img>
              <p className="archivement__number">1</p>
            </div>
            <div className="archivement__item">
              <p className="archivement__name">Giải ba</p>
              <img src="assets/img/teamdetail/bronze-cup.png" alt="3"></img>
              <p className="archivement__number">1</p>
            </div>
          </div>
        </div>
        <div className="match">
          <h2 className="match__title">Trận đấu</h2>
          <div className="match__list">
            <div className="match__item">
              <p className="match__name">Tổng số trận</p>
              <img src="assets/img/teamdetail/match.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận thắng</p>
              <img src="assets/img/teamdetail/winning.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận hòa</p>
              <img src="assets/img/teamdetail/win.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
            <div className="match__item">
              <p className="match__name">Số trận thua</p>
              <img src="assets/img/teamdetail/exhausted-man.png" alt="1"></img>
              <p className="match__number">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ReportTeamDetail;
