import React from "react";
import "./styles/style.css";
const TournamentHome = () => {
  return (
    <div className="tournamenthome">
      <h2 className="title">Giải đấu nổi bật</h2>
      <a href="#" className="view__more">
        Xem thêm
      </a>
      <div className="tournament__list">
        <a href="#" className="tournaments__list-item">
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
