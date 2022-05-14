import React from "react";
import "./styles/style.css";
function TeamInTournament() {
  return (
    <>
      <div className="tournamentdetail">
        <div className="teamdetail__content listPlayer">
          <h3 className="listPlayer__title">Danh sách đội bóng</h3>
          <h2 className="listPlayer__total">Có 30 đội bóng</h2>
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
            <div className="listPlayer__item">
              <div className="avt">
                <img src="/assets/img/homepage/team3.png" alt="team" />
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
            <div className="listPlayer__item">
              <div className="avt">
                <img src="/assets/img/homepage/team2.png" alt="team" />
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
            <div className="listPlayer__item">
              <div className="avt">
                <img src="/assets/img/homepage/team3.png" alt="team" />
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
        </div>
      </div>
    </>
  );
}

export default TeamInTournament;
