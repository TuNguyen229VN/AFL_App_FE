import React from "react";
import "./styles/style.css";
const TeamHome = () => {
  return (
    <div className="teamhome">
      <h2 className="title">Đội bóng nổi bật</h2>
      <a href="#" className="view__more">
        Xem thêm
      </a>
      <div className="tournament__list">
        <a href="#" className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/img/homepage/team3.png" alt="team" />
          </div>
          <div className="tournament__text">
            <h3>AE Phủi F.C</h3>
            <p>
              {" "}
              Vui vẻ, hòa đồng <b>||</b> Nam
            </p>
            <div className="torunament__another">
              <div className="join">
                <img src="./assets/icons/join.png" alt="join" />
                <div className="join__text">10</div>
              </div>
            </div>
          </div>
        </a>
        <a href="#" className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/img/homepage/team1.png" alt="team" />
          </div>
          <div className="tournament__text">
            <h3>Bình Thạnh F.C</h3>
            <p>
              {" "}
              Đá là phải thắng <b>||</b> Nam
            </p>
            <div className="torunament__another">
              <div className="join">
                <img src="./assets/icons/join.png" alt="join" />
                <div className="join__text">10</div>
              </div>
            </div>
          </div>
        </a>
        <a href="#" className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/img/homepage/team2.png" alt="team" />
          </div>
          <div className="tournament__text">
            <h3>Văn phòng FC</h3>
            <p>
              Đụng là trụng <b>||</b> Nam
            </p>
            <div className="torunament__another">
              <div className="join">
                <img src="./assets/icons/join.png" alt="join" />
                <div className="join__text">10</div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default TeamHome;
