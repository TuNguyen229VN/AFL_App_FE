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
import {
  checkPlayerInTeamAPI,
  addPlayerInTeamAPI,
} from "../../api/PlayerInTeamAPI";
import { toast } from "react-toastify";
import "./styles/style.css";

function HeaderTeamDetail() {
  const { idTeam } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState("");
  const [manager, setManager] = useState("");
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [statusPaticipate, setStatusPaticipate] = useState("Tham gia đội bóng");
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

  useEffect(() => {
    if (user != undefined && user.userVM.roleId === 5) {
      checkPaticipateTeam();
    }
  }, []);

  const checkPaticipateTeam = () => {
    const respone = checkPlayerInTeamAPI(idTeam, user.userVM.id);
    respone
      .then((res) => {
        if (res.status === 200) {
          if (res.data.playerInTeamsFull.length > 0) {
            const playerInTeam = res.data.playerInTeamsFull[0];

            if (playerInTeam.status === "true") {
              setStatusPaticipate("Đã tham gia đội bóng");
            } else if (playerInTeam.status === "Chờ xét duyệt từ đội bóng") {
              setStatusPaticipate("Chờ xét duyệt từ đội bóng");
            } else setStatusPaticipate("Đội bóng đang chờ bạn xét duyệt");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getInforTeam = () => {
    setLoading(true);
    let afterDefaultURL = `teams/${idTeam}`;
    let response = getAPI(afterDefaultURL);
    response
      .then((res) => {
        setTeam(res.data);
        getUserById(idTeam);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.status === 500) {
          setLoading(false);
        }
      });
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
      return (
        <ListPlayer
          idHost={user != undefined ? user.userVM.id : undefined}
          id={team.id}
          gender={team.teamGender}
          numberPlayerInTeam={team.numberPlayerInTeam}
        />
      );
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/reportTeamDeatail`) {
      return <ReportTeamDetail />;
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/commentTeamDetail`) {
      return <CommentTeamDetail />;
    }
  };
  const addResquestToTeam = () => {
    setLoading(true);
    const data = {
      status: "Chờ xét duyệt từ đội bóng",
      teamId: idTeam,
      footballPlayerId: user.userVM.id,
    };
    const respone = addPlayerInTeamAPI(data);
    respone
      .then((res) => {
        if (res.status === 201) {
          setStatusPaticipate("Chờ xét duyệt từ đội bóng");
          toast.success(
            "Yêu cầu tham gia đội bóng thành công.Chờ phản hồi từ đội bóng nhé!",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  useEffect(() => {
    getInforTeam();
  }, [idTeam]);
  useEffect(() => {
    setActiveTeamDetail(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <Header id={idTeam} />
      <div className="teamdetail">
        {loading ? (
          <Loading />
        ) : (
          <div>
            {team !== "" ? (
              <div className="HeaderTeamDetail">
                <div className="info__manager">
                  <div>
                    <div className="avt__Team">
                      <img src={team.teamAvatar} alt="team" />
                    </div>
                    {user !== null ? (
                      <>
                        {user.userVM.id !== undefined &&
                        user.userVM.id === team.id ? (
                          <Link
                            to={`/updateTeam/${team.id}`}
                            state={{ address: team.teamArea }}
                            className="editTeam"
                          >
                            <i class="fa-solid fa-pen-to-square"></i>Chỉnh Sửa
                            Đội Bóng
                          </Link>
                        ) : user.userVM.id != undefined &&
                          user.userVM.roleId === 5 ? (
                          <button
                            className="editTeamTest"
                            style={{
                              cursor:
                                statusPaticipate === "Tham gia đội bóng"
                                  ? "pointer"
                                  : "default",
                              hover: {
                                backgroundColor:
                                  statusPaticipate === "Tham gia đội bóng"
                                    ? "#16192b"
                                    : "#d7fc6a",
                                color:
                                  statusPaticipate === "Tham gia đội bóng"
                                    ? "#ffffff"
                                    : "black",
                              },
                            }}
                            onClick={() => {
                              if (statusPaticipate === "Tham gia đội bóng") {
                                addResquestToTeam();
                              }
                            }}
                          >
                            {statusPaticipate}
                          </button>
                        ) : null}
                      </>
                    ) : null}
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
                      activeTeamDetail ===
                      `/teamDetail/${idTeam}/inforTeamDetail`
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTeamDetail(
                        `/teamDetail/${idTeam}/inforTeamDetail`
                      )
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
                {renderByLink()}
              </div>
            ) : null}
          </div>
        )}
        {team === "" ? (
          <h1 className="nupakachi">
            Bạn chưa có đội bóng nào
            <Link to="/createTeam">{`->`}Tạo đội bóng ngày</Link>
          </h1>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default HeaderTeamDetail;
