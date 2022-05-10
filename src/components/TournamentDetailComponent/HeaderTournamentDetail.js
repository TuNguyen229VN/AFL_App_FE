import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";
function HeaderTournamentDetail() {
  const location = useLocation();
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  useEffect(() => {
    setActiveTeamDetail(location.pathname);
  }, [location.pathname]);
  return (
    <div className="HeaderTeamDetail">
      <div className="info__manager infor_tourdetail">
        <div className="avt__Team">
          <img src="./assets/img/homepage/tourn1.png" alt="team" />
        </div>
        <div className="headertext__team">
          <h2>Giải Vui Cùng Bóng Đá Phủi</h2>
          <div className="man name__manager">
            <i class="fas fa-light fa-user"></i>
            <span className="title">Người tổ chức: </span>
            <span>Nguyễn Thanh Phủi</span>
          </div>
          <div className="man phone__manager">
            <i>
              <img src="/assets/icons/telephone.png" alt="tp" />
            </i>
            <span className="title">Số điện thoại: </span>
            <span>0909901282</span>
          </div>
          <div className="man email__manager">
            <i>
              <img src="/assets/icons/mail-icon.svg" alt="mail" />
            </i>
            <span className="title">Email: </span>
            <span>phuideptrai123@gmail.com</span>
          </div>
          <div className="man member__manager">
            <i>
              <img src="/assets/icons/join.png" alt="join" />
            </i>
            <span className="title">Đội tham gia: </span>
            <span>33 Người</span>
          </div>
          <div className="man gender__manager">
            <i className="fas fa-solid fa-font-awesome"></i>
            <span className="title">Hình thức: </span>
            <span>Đá vòng tròn || Sân 7</span>
          </div>
          <div className="man gender__manager">
            <i className="fas fa-solid fa-location-dot"></i>
            <span className="title">Địa điểm: </span>
            <span>Nhà thi đấu quân khu 7, TP.HCM </span>
          </div>
          <div className="man gender__manager">
            <i className="fa-solid fa-calendar-days"></i>
            <span className="title">Thời gian diễn ra: </span>
            <span>10/05/2022 - 10/06/2022 </span>
          </div>
        </div>
      </div>
      <div className="headerteamdetail__tag headertour__tag">
        <Link
          to="/inforTournamentDetail"
          className={
            activeTeamDetail === "/inforTournamentDetail" ? "active" : ""
          }
          onClick={() => setActiveTeamDetail("/inforTournamentDetail")}
        >
          Thông tin
        </Link>
        <Link
          to="/galleryTournamentDetail"
          className={
            activeTeamDetail === "/galleryTournamentDetail" ? "active" : ""
          }
          onClick={() => setActiveTeamDetail("/galleryTournamentDetail")}
        >
          Hình ảnh
        </Link>
        <Link
          to="/scheduleTournamentDetail"
          className={
            activeTeamDetail === "/scheduleTournamentDetail" ? "active" : ""
          }
          onClick={() => setActiveTeamDetail("/scheduleTournamentDetail")}
        >
          Lịch thi đấu
        </Link>
        <Link
          to="/rankTableTournamentDetail"
          className={
            activeTeamDetail === "/rankTableTournamentDetail" ? "active" : ""
          }
          onClick={() => setActiveTeamDetail("/rankTableTournamentDetail")}
        >
          Bảng xếp hạng
        </Link>
        <Link
          to="/teamInTournament"
          className={activeTeamDetail === "/teamInTournament" ? "active" : ""}
          onClick={() =>
            setActiveTeamDetail("/rankTableTournteamInTournamentamentDetail")
          }
        >
          Đội bóng
        </Link>
        <Link
          to="/predictionTournamentDetail"
          className={
            activeTeamDetail === "/predictionTournamentDetail" ? "active" : ""
          }
          onClick={() => setActiveTeamDetail("/predictionTournamentDetail")}
        >
          Dự đoán
        </Link>
        <Link
          to="/commentTournamentDetail"
          className={
            activeTeamDetail === "/commentTournamentDetail" ? "active" : ""
          }
          onClick={() => setActiveTeamDetail("/commentTournamentDetail")}
        >
          Bình luận
        </Link>
      </div>
    </div>
  );
}

export default HeaderTournamentDetail;
