import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";
import { useParams } from "react-router-dom";
function HeaderTournamentDetail() {
  const { idTour } = useParams();
  const location = useLocation();
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const [tourDetail, setTourDetail] = useState("");
  const [host, setHost] = useState("");

  // Get Tour Detail
  const getTourDetail = async () => {
    try {
      const res = await axios.get(
        `https://afootballleague.ddns.net/api/v1/tournaments/${idTour}`
      );
      if (res.status === 200) {
        setTourDetail(res.data);
        getUserById(res.data.userId);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  //Get User 
  const getUserById=async(id)=>{
    try {
      const res=await axios.get(`https://afootballleague.ddns.net/api/v1/users/${id}`)
      if(res.status===200){
        setHost(res.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

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
    }
    else{
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

  useEffect(() => {
    setActiveTeamDetail(location.pathname);
    getTourDetail();
  }, [location.pathname]);

  return (
    <div className="HeaderTeamDetail">
      <div className="info__manager infor_tourdetail">
        <div className="avt__Team">
          <img
            src={tourDetail.tournamentAvatar}
            alt={tourDetail.tournamentName}
          />
        </div>
        <div className="headertext__team">
          <h2>{tourDetail.tournamentName}</h2>
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
            <span>{tourDetail.numberTeamInTournament}/ {tourDetail.footballTeamNumber} đội</span>
          </div>
          <div className="man gender__manager">
            <i className="fas fa-solid fa-font-awesome"></i>
            <span className="title">Hình thức: </span>
            <span>{getType(tourDetail.tournamentTypeId)} {getFeild(tourDetail.footballFieldTypeId)}</span>
          </div>
          <div className="man gender__manager location">
            <i className="fas fa-solid fa-location-dot"></i>
            <span className="title">Địa điểm: </span>
            <span className="text_field">{tourDetail.footballFieldAddress}</span>
          </div>
          <div className="man gender__manager">
            <i className="fa-solid fa-calendar-days"></i>
            <span className="title">Thời gian diễn ra: </span>
            <span>{formatDate(tourDetail.tournamentStartDate)} - {formatDate(tourDetail.tournamentEndDate)} </span>
          </div>
        </div>
      </div>
      <div className="headerteamdetail__tag headertour__tag">
        <Link
          to={`/inforTournamentDetail/${idTour}`}
          className={
            activeTeamDetail === `/inforTournamentDetail/${idTour}`
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTeamDetail(`/inforTournamentDetail/${idTour}`)
          }
        >
          Thông tin
        </Link>
        <Link
          to={`/galleryTournamentDetail/${idTour}`}
          className={
            activeTeamDetail === `/galleryTournamentDetail/${idTour}`
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTeamDetail(`/galleryTournamentDetail/${idTour}`)
          }
        >
          Hình ảnh
        </Link>
        <Link
          to={`/scheduleTournamentDetail/${idTour}`}
          className={
            activeTeamDetail === `/scheduleTournamentDetail/${idTour}`
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTeamDetail(`/scheduleTournamentDetail/${idTour}`)
          }
        >
          Lịch thi đấu
        </Link>
        <Link
          to={`/rankTableTournamentDetail/${idTour}`}
          className={
            activeTeamDetail === `/rankTableTournamentDetail/${idTour}`
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTeamDetail(`/rankTableTournamentDetail/${idTour}`)
          }
        >
          Bảng xếp hạng
        </Link>
        <Link
          to={`/teamInTournament/${idTour}`}
          className={
            activeTeamDetail === `/teamInTournament/${idTour}` ? "active" : ""
          }
          onClick={() => setActiveTeamDetail(`/teamInTournament/${idTour}`)}
        >
          Đội bóng
        </Link>
        <Link
          to={`/predictionTournamentDetail/${idTour}`}
          className={
            activeTeamDetail === `/predictionTournamentDetail/${idTour}`
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTeamDetail(`/predictionTournamentDetail/${idTour}`)
          }
        >
          Dự đoán
        </Link>
        <Link
          to={`/commentTournamentDetail/${idTour}`}
          className={
            activeTeamDetail === `/commentTournamentDetail/${idTour}` ? "active" : ""
          }
          onClick={() => setActiveTeamDetail(`/commentTournamentDetail/${idTour}`)}
        >
          Bình luận
        </Link>
      </div>
    </div>
  );
}

export default HeaderTournamentDetail;
