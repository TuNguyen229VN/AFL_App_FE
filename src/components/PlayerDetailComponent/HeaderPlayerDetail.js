import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./styles/style.css";
import Loading from "../LoadingComponent/Loading";
import MyTeamInPlayer from "./MyTeamInPlayer";
import MyTournamentInPlayer from "./MyTournamentInPlayer";
import ScheduleInPlayer from "./ScheduleInPlayer";
import RequestInPlayer from "./RequestInPlayer";
import AchivementInPlayer from "./AchivementInPlayer";

function HeaderPlayerDetail() {
  const { idPlayer } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  // render by link
  const renderByLink = () => {
    if (activeTeamDetail === `/playerDetail/${idPlayer}/myTeamInPlayer`) {
      return <MyTeamInPlayer />;
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/myTournamentInPlayer`) {
      return <MyTournamentInPlayer />;
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/scheduleInPlayer`) {
      return <ScheduleInPlayer />;
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/requestInPlayer`) {
      return <RequestInPlayer />;
    }
    if (activeTeamDetail === `/playerDetail/${idPlayer}/achivementInPlayer`) {
      return <AchivementInPlayer />;
    }
  };
  return (
    <>
      <Header id={idPlayer} />
      <div className="teamdetail">
        {/* {loading ? (
          <Loading />
        ) : ( */}
        <div>
          <div className="HeaderTeamDetail">
            <div className="info__manager player_detail ">
              <div>
                <div className="avt__Team">
                  <img src="/assets/img/homepage/pic-1.png" alt="a" />
                </div>
              </div>

              <div className="headertext__team">
                <h2></h2>
                <div className="man name__manager">
                  <i className="fas fa-light fa-user"></i>
                  <span className="title">Họ và tên: </span>
                  <span>Nguyễn Văn A</span>
                </div>
                <div className="man phone__manager">
                  <i>
                    <img src="/assets/icons/telephone.png" alt="tp" />
                  </i>
                  <span className="title">Số điện thoại: </span>
                  <span>090990544</span>
                </div>
                <div className="man email__manager">
                  <i>
                    <img src="/assets/icons/mail-icon.svg" alt="mail" />
                  </i>
                  <span className="title">Email: </span>
                  <span>abc@gmail.com</span>
                </div>
                <div className="man member__manager">
                  <i>
                    <img src="/assets/icons/join.png" alt="join" />
                  </i>
                  <span className="title">Vị trí thi đấu: </span>
                  <span>Tiền đạo</span>
                </div>
                <div className="man gender__manager">
                  <i className="fa-solid fa-calendar-days"></i>
                  <span className="title">Ngày sinh: </span>
                  <span>22/09/2000</span>
                </div>
                <div className="man gender__manager location">
                  <i className="fas fa-solid fa-location-dot"></i>
                  <span className="title">Địa chỉ: </span>
                  <span className="text_field">224/6 Bình Thạnh, TP.HCM</span>
                </div>
                <div className="man gender__manager">
                  <i className="fas fa-solid fa-font-awesome"></i>
                  <span className="title">Mô tả bản thân: </span>
                  <span>Đá sân 7, hòa đồng thân thiện</span>
                </div>
              </div>
            </div>
            <div className="headerteamdetail__tag headertour__tag">
              <Link
                to={`/playerDetail/${idPlayer}/myTeamInPlayer`}
                className={
                  activeTeamDetail ===
                  `/playerDetail/${idPlayer}/myTeamInPlayer`
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTeamDetail(
                    `/playerDetail/${idPlayer}/myTeamInPlayer`
                  )
                }
              >
                Đội bóng tham gia
              </Link>
              <Link
                to={`/playerDetail/${idPlayer}/myTournamentInPlayer`}
                className={
                  activeTeamDetail ===
                  `/playerDetail/${idPlayer}/myTournamentInPlayer`
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTeamDetail(
                    `/playerDetail/${idPlayer}/myTournamentInPlayer`
                  )
                }
              >
                Giải đấu tham gia
              </Link>
              <Link
                to={`/playerDetail/${idPlayer}/requestInPlayer`}
                className={
                  activeTeamDetail ===
                  `/playerDetail/${idPlayer}/requestInPlayer`
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTeamDetail(
                    `/playerDetail/${idPlayer}/requestInPlayer`
                  )
                }
              >
                Yêu cầu tham gia
              </Link>
              <Link
                to={`/playerDetail/${idPlayer}/scheduleInPlayer`}
                className={
                  activeTeamDetail ===
                  `/playerDetail/${idPlayer}/scheduleInPlayer`
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTeamDetail(
                    `/playerDetail/${idPlayer}/scheduleInPlayer`
                  )
                }
              >
                Lịch thi đấu
              </Link>
              <Link
                to={`/playerDetail/${idPlayer}/achivementInPlayer`}
                className={
                  activeTeamDetail ===
                  `/playerDetail/${idPlayer}/achivementInPlayer`
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTeamDetail(
                    `/playerDetail/${idPlayer}/achivementInPlayer`
                  )
                }
              >
                Thành tích
              </Link>
            </div>
          </div>
          {renderByLink()}
        </div>
        {/* )} */}
      </div>
      <Footer />
    </>
  );
}

export default HeaderPlayerDetail;
