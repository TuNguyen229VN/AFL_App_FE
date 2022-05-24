import React, { useState, useEffect } from "react";
import "./styles/style.css";
import LoadingAction from "../LoadingComponent/LoadingAction";
import {getTeamByIdAPI} from "../../api/TeamAPI";
import {getTeamInTournamentByTourIdAPI} from "../../api/TeamInTournamentAPI"
function TeamInTournament(props) {
  const {tourDetailId } = props;
  const [active, setactive] = useState(true);


  useEffect(() => {

  },[tourDetailId])

  const getAllTeamInTournamentByTourId = () => {

  }

  const getTeamByID = () => {

  }


  return (
    <>
      <div className="tournamentdetail">
        <div className="teamdetail__content listPlayer schedule__tour">
          <h3 className="listPlayer__title">Danh sách đội bóng</h3>
          <h2 className="listPlayer__total">Có 30 đội bóng đã tham gia</h2>
          <div
            style={{
              marginBottom: 20,
            }}
            className="option__view"
          >
            <p
              className={active ? "active" : ""}
              onClick={() => {
                setactive(true);
              }}
            >
              Tham gia
            </p>
            <p
              className={!active ? "active" : ""}
              onClick={() => {
                setactive(false);
              }}
            >
              Chờ duyệt
            </p>
          </div>
          {active ? (
            <div className="listPlayer__list">
              <div className="listPlayer__item">
                <div className="avt">
                  <img src="/assets/img/homepage/team1.png" alt="team" />
                </div>
                <div className="des">
                  <p className="namePlayer">
                    <span>Tên đội:</span>FC.Bình
                  </p>
                  <p className="mailPlayer">
                    <span>Người quản lý:</span>Tú Nguyễn
                  </p>
                  <p className="genderPlayer">
                    <span>Số cầu thủ:</span>12
                  </p>
                  <p className="phonePlayer">
                    <span>Khu vực:</span>Bình Thạnh, TP. HCM
                  </p>
                </div>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default TeamInTournament;
