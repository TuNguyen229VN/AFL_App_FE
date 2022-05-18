import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import GalleryTournamentDetail from "./GalleryTournamentDetail";
import InforTournamentDetail from "./InforTournamentDetail";
import ScheduleTournamentDetail from "./ScheduleTournamentDetail";
import RankTableTournamentDetail from "./RankTableTournamentDetail";
import TeamInTournament from "./TeamInTournament";
import PredictionTournamentDetail from "./PredictionTournamentDetail";
import CommentTournamentDetail from "./CommentTournamentDetail";
import Loading from "../LoadingComponent/Loading";
import { getAPI } from "../../api";
import { useNavigate } from 'react-router-dom';


function HeaderTournamentDetail() {
  const { idTour } = useParams();
  const location = useLocation();
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const [tourDetail, setTourDetail] = useState("");
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  // Get Tour Detail
  const getTourDetail = async () => {
    let afterDefaultURL = `tournaments/${idTour}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTourDetail(res.data);
        getUserById(res.data.userId);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  //Get User
  const getUserById = async (id) => {
    let afterDefaultURL = `users/${id}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setHost(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Get Type
  const getType = (id) => {
    if (1 === id) {
      return "Loại trực tiếp";
    }
    if (2 === id) {
      return "Đá vòng tròn";
    }
    if (3 === id) {
      return "Đá chia bảng";
    } else {
      return "";
    }
  };

  // Get Feild
  const getFeild = (id) => {
    if (1 === id) {
      return "| Sân 5";
    }
    if (2 === id) {
      return "| Sân 7";
    }
    if (3 === id) {
      return "| Sân 11";
    } else {
      return "";
    }
  };

  // format Date
  const formatDate = (date) => {
    const day = new Date(date);
    return (
      String(day.getDate()).padStart(2, "0") +
      "/" +
      String(day.getMonth() + 1).padStart(2, "0") +
      "/" +
      day.getFullYear()
    );
  };

  // render by link
  const renderByLink = () => {
    if (
      activeTeamDetail === `/tournamentDetail/${idTour}/inforTournamentDetail`
    ) {
      return <InforTournamentDetail tourDetail={tourDetail} />;
    }
    if (
      activeTeamDetail === `/tournamentDetail/${idTour}/galleryTournamentDetail`
    ) {
      return <GalleryTournamentDetail />;
    }
    if (
      activeTeamDetail ===
      `/tournamentDetail/${idTour}/scheduleTournamentDetail`
    ) {
      return <ScheduleTournamentDetail />;
    }
    if (
      activeTeamDetail ===
      `/tournamentDetail/${idTour}/rankTableTournamentDetail`
    ) {
      return <RankTableTournamentDetail />;
    }
    if (activeTeamDetail === `/tournamentDetail/${idTour}/teamInTournament`) {
      return <TeamInTournament />;
    }
    if (
      activeTeamDetail ===
      `/tournamentDetail/${idTour}/predictionTournamentDetail`
    ) {
      return <PredictionTournamentDetail />;
    }
    if (
      activeTeamDetail === `/tournamentDetail/${idTour}/commentTournamentDetail`
    ) {
      return <CommentTournamentDetail />;
    }
  };

  useEffect(() => {
    setActiveTeamDetail(location.pathname);
    getTourDetail();
  }, [location.pathname]);


  const updateClick = (data) => {
    navigate(`update-tournament-detail`,{state: {id: data} })
  }

  return (
    <>
      <Header  id={idTour}/>

      <div className="teamdetail">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="HeaderTeamDetail">
              <div className="info__manager infor_tourdetail">
                <div className="avt__Team">
                  <img
                    src={tourDetail.tournamentAvatar}
                    alt={tourDetail.tournamentName}
                  />
                  <button style={{
                    marginTop: 300,
                    padding: 20,
                    marginLeft: 50,
                    fontWeight: 600
                  }}
                  onClick={() => {
                    updateClick(tourDetail.id)
                  }}
                  >Chỉnh sửa thông tin giải đấu</button>
                </div>
                <div className="headertext__team">
                  <h2>{tourDetail.tournamentName}</h2>
                  <div className="man name__manager">
                        <i class="fa-solid fa-bullhorn"></i>
                          <span className="title">
                            Chế độ:{" "}
                          </span>
                          <span >
                           {tourDetail.mode==="PRIVATE"?"Riêng tư":"Công khai"}
                          </span>
                        </div>
                  <div className="man name__manager">
                    <i className="fas fa-light fa-user"></i>
                    <span className="title">Người tổ chức: </span>
                    <span>{host.username}</span>
                  </div>
                  <div className="man phone__manager">
                    <i>
                      <img src="/assets/icons/telephone.png" alt="tp" />
                    </i>
                    <span className="title">Số điện thoại: </span>
                    <span>{tourDetail.tournamentPhone}</span>
                  </div>
                  <div className="man email__manager">
                    <i>
                      <img src="/assets/icons/mail-icon.svg" alt="mail" />
                    </i>
                    <span className="title">Email: </span>
                    <span>{host.email}</span>
                  </div>
                  <div className="man member__manager">
                    <i>
                      <img src="/assets/icons/join.png" alt="join" />
                    </i>
                    <span className="title">Đội tham gia: </span>
                    <span>
                      {tourDetail.numberTeamInTournament} /{" "}
                      {tourDetail.footballTeamNumber} đội
                    </span>
                  </div>
                  <div className="man gender__manager">
                    <i className="fas fa-solid fa-font-awesome"></i>
                    <span className="title">Hình thức: </span>
                    <span>
                      {getType(tourDetail.tournamentTypeId)}{" "}
                      {getFeild(tourDetail.footballFieldTypeId)}
                    </span>
                  </div>
                  <div className="man gender__manager location">
                    <i className="fas fa-solid fa-location-dot"></i>
                    <span className="title">Địa điểm: </span>
                    <span className="text_field">
                      {tourDetail.footballFieldAddress}
                    </span>
                  </div>
                  <div className="man gender__manager">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span className="title">Thời gian diễn ra: </span>
                    <span>
                      {formatDate(tourDetail.tournamentStartDate)} -{" "}
                      {formatDate(tourDetail.tournamentEndDate)}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="headerteamdetail__tag headertour__tag">
                <Link
                  to={`/tournamentDetail/${idTour}/inforTournamentDetail`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/inforTournamentDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/inforTournamentDetail`
                    )
                  }
                >
                  Thông tin
                </Link>
                <Link
                  to={`/tournamentDetail/${idTour}/commentTournamentDetail`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/commentTournamentDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/commentTournamentDetail`
                    )
                  }
                >
                  Tin tức
                </Link>
                <Link
                  to={`/tournamentDetail/${idTour}/galleryTournamentDetail`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/galleryTournamentDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/galleryTournamentDetail`
                    )
                  }
                >
                  Hình ảnh
                </Link>
                <Link
                  to={`/tournamentDetail/${idTour}/scheduleTournamentDetail`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/scheduleTournamentDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/scheduleTournamentDetail`
                    )
                  }
                >
                  Lịch thi đấu
                </Link>
                <Link
                  to={`/tournamentDetail/${idTour}/rankTableTournamentDetail`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/rankTableTournamentDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/rankTableTournamentDetail`
                    )
                  }
                >
                  Bảng xếp hạng
                </Link>
                <Link
                  to={`/tournamentDetail/${idTour}/teamInTournament`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/teamInTournament`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/teamInTournament`
                    )
                  }
                >
                  Đội bóng
                </Link>
                <Link
                  to={`/tournamentDetail/${idTour}/predictionTournamentDetail`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/predictionTournamentDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/predictionTournamentDetail`
                    )
                  }
                >
                  Dự đoán
                </Link>
                <Link
                  to={`/tournamentDetail/${idTour}/commentTournamentDetail`}
                  className={
                    activeTeamDetail ===
                    `/tournamentDetail/${idTour}/commentTournamentDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/tournamentDetail/${idTour}/commentTournamentDetail`
                    )
                  }
                >
                  Bình luận
                </Link>           
              </div>
            </div>
            {renderByLink()}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default HeaderTournamentDetail;
