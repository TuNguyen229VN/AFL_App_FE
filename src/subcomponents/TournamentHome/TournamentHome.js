import React from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
const TournamentHome = () => {
  return (
    <div className="tournamenthome">
      <h2
        className="title"
        data-aos={"fade-up"}
        data-aos-anchor-placement="top-bottom"
      >
        Giải đấu nổi bật
      </h2>
      <Link to={"/findTournaments"} className="view__more" data-aos={"fade-up"}>
        Xem thêm
      </Link>
      <div
        className="tournament__list"
        data-aos={"fade-up"}
      >
        <a href="#" className="tournaments__list-item" >
          <div className="tournament__img">
            <img src="./assets/img/homepage/tourn1.png" alt="tour" />
          </div>
          <div className="tournament__text">
            <h3>UEFA Champion League </h3>
            <p>
              {" "}
              Đấu vòng tròn <b>||</b> Bóng đá sân 7 <b>||</b> sân Công viên các
              hoàng tử Cầu Giấy, Hà Nội
            </p>
            <div className="torunament__another">
              <div className="join">
                <img src="./assets/icons/join.png" alt="join" />
                <div className="join__text">10</div>
              </div>
              <div className="heart__shape active"></div>
            </div>
          </div>
        </a>
        <a href="#" className="tournaments__list-item" >
          <div className="tournament__img">
            <img src="./assets/img/homepage/tourn1.png" alt="tour" />
          </div>
          <div className="tournament__text">
            <h3>UEFA Champion League </h3>
            <p>
              {" "}
              Đấu vòng tròn <b>||</b> Bóng đá sân 7 <b>||</b> sân Công viên các
              hoàng tử Cầu Giấy, Hà Nội
            </p>
            <div className="torunament__another">
              <div className="join">
                <img src="./assets/icons/join.png" alt="join" />
                <div className="join__text">10</div>
              </div>
              <div className="heart__shape active"></div>
            </div>
          </div>
        </a>
        <a href="#" className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/img/homepage/tourn2.png" alt="tour" />
          </div>
          <div className="tournament__text">
            <h3>Vui cùng bóng đá phủi</h3>
            <p>
              {" "}
              Đấu vòng tròn <b>||</b> Bóng đá sân 7 <b>||</b> sân Công viên các
              hoàng tử Cầu Giấy, Hà Nội
            </p>
            <div className="torunament__another">
              <div className="join">
                <img src="./assets/icons/join.png" alt="join" />
                <div className="join__text">10</div>
              </div>
              <div className="heart__shape"></div>
            </div>
          </div>
        </a>
        <a href="#" className="tournaments__list-item">
          <div className="tournament__img">
            <img src="./assets/img/homepage/tourn3.png" alt="tour" />
          </div>
          <div className="tournament__text">
            <h3>EUROPA League</h3>
            <p>
              Đấu vòng tròn <b>||</b> Bóng đá sân 7 <b>||</b> sân Công viên các
              hoàng tử Cầu Giấy, Hà Nội
            </p>
            <div className="torunament__another">
              <div className="join">
                <img src="./assets/icons/join.png" alt="join" />
                <div className="join__text">10</div>
              </div>
              <div className="heart__shape"></div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default TournamentHome;
