import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loading from "../LoadingComponent/Loading";
import CommentTeamDetail from "./CommentTeamDetail";
import InforTeamDetail from "./InforTeamDetail";
import ListPlayer from "./ListPlayer";
import ReportTeamDetail from "./ReportTeamDetail";
import "./styles/style.css";

function HeaderTeamDetail() {
  const { idTeam } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState("");
  const [manager, setManager] = useState("");
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);

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

  // splitteam Area
  const splitTeamArea = (teamArea) => {
    let myArray = teamArea.split(",");
    return myArray[myArray.length - 1];
  };

  const getInforTeam = () => {
    let afterDefaultURL = `teams/${idTeam}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTeam(res.data);
        getUserById(idTeam);
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
        setManager(res.data);
      })
      .catch((err) => console.error(err));
  };

  const renderByLink = () => {
    if (activeTeamDetail === `/teamDetail/${idTeam}/inforTeamDetail`) {
      return <InforTeamDetail description={team.description} />;
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/listPlayer`) {
      return <ListPlayer id={team.id} gender={team.teamGender} />;
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/reportTeamDeatail`) {
      return <ReportTeamDetail />;
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/commentTeamDetail`) {
      return <CommentTeamDetail />;
    }
  };

  useEffect(() => {
    setActiveTeamDetail(location.pathname);
    getInforTeam();
  }, [location.pathname]);
  return (
    <>
      <Header id={idTeam}/>
      <div className="teamdetail">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="HeaderTeamDetail">
              <div className="info__manager">
                <div className="avt__Team">
                  <img src={team.teamAvatar} alt="team" />
                </div>
                <div className="headertext__team">
                  <h2>{team.teamName}</h2>
                  <div className="man name__manager">
                    <i className="fas fa-light fa-user"></i>
                    <span className="title">Người quản lý: </span>
                    <span>{manager.username}</span>
                  </div>
                  <div className="man phone__manager">
                    <i>
                      <img src="/assets/icons/telephone.png" alt="tp" />
                    </i>
                    <span className="title">Số điện thoại: </span>
                    <span>{team.teamPhone}</span>
                  </div>
                  <div className="man email__manager">
                    <i>
                      <img src="/assets/icons/mail-icon.svg" alt="mail" />
                    </i>
                    <span className="title">Email: </span>
                    <span>{manager.email}</span>
                  </div>
                  <div className="man member__manager">
                    <i>
                      <img src="/assets/icons/join.png" alt="join" />
                    </i>
                    <span className="title">Thành viên: </span>
                    <span>
                      {team.numberPlayerInTeam > 0
                        ? team.numberPlayerInTeam + " thành viên"
                        : "Đội bóng chưa có thành viên"}
                    </span>
                  </div>
                  <div className="man gender__manager">
                    <i className="fas fa-transgender"></i>
                    <span className="title">Giới tính đội : </span>
                    <span>{team.teamGender === "Male" ? "Nam" : "Nữ"}</span>
                  </div>
                  <div className="man gender__manager">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span className="title">Ngày tạo đội: </span>
                    <span>{formatDate(team.dateCreate)}</span>
                  </div>
                  <div className="man gender__manager">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span className="title">Khu vực: </span>
                    <span>
                      {team.teamArea !== ""
                        ? "" + splitTeamArea(team.teamArea)
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="headerteamdetail__tag">
                <Link
                  to={`/teamDetail/${idTeam}/inforTeamDetail`}
                  className={
                    activeTeamDetail === `/teamDetail/${idTeam}/inforTeamDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(`/teamDetail/${idTeam}/inforTeamDetail`)
                  }
                >
                  Thông tin đội
                </Link>
                <Link
                  to={`/teamDetail/${idTeam}/listPlayer`}
                  className={
                    activeTeamDetail === `/teamDetail/${idTeam}/listPlayer`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(`/teamDetail/${idTeam}/listPlayer`)
                  }
                >
                  Thành viên
                </Link>
                <Link
                  to={`/teamDetail/${idTeam}/reportTeamDeatail`}
                  className={
                    activeTeamDetail ===
                    `/teamDetail/${idTeam}/reportTeamDeatail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/teamDetail/${idTeam}/reportTeamDeatail`
                    )
                  }
                >
                  Thống kê
                </Link>
                <Link
                  to={`/teamDetail/${idTeam}/commentTeamDetail`}
                  className={
                    activeTeamDetail ===
                    `/teamDetail/${idTeam}/commentTeamDetail`
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTeamDetail(
                      `/teamDetail/${idTeam}/commentTeamDetail`
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

export default HeaderTeamDetail;
