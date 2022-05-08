import React from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
const TeamHome = () => {
  return (
    <div className="teamhome">
      <h2 className="title" data-aos={"fade-up"}>
        Đội bóng nổi bật
      </h2>
      <Link to={"/findTeam"} className="view__more" data-aos={"fade-up"}>
        Xem thêm
      </Link>
      <div className="tournament__list" data-aos={"fade-up"}>
        <a href="#" className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/img/homepage/team3.png" alt="team" />
          </div>
          <div className="tournament__text">
            <h3>AE Phủi F.C</h3>
            <p>
              {" "}
              Đội Bóng Nam <b>||</b> TP. Hồ Chí Minh
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
              Đội Bóng Nam <b>||</b> TP. Hồ Chí Minh
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
              Đội Bóng Nam <b>||</b> TP. Hồ Chí Minh
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
