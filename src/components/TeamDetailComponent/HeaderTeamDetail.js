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
import styles from "./styles/style.module.css";
import {
  checkPlayerInTeamAPI,
  addPlayerInTeamAPI,
} from "../../api/PlayerInTeamAPI";
import { toast } from "react-toastify";
import "./styles/style.css";
import { PlayerRegisterAPI, TeamAcceptAPI } from "../../api/System";
import LoadingAction from "../LoadingComponent/LoadingAction";
import axios from "axios";
import TournamentTeamDetail from "./TournamentTeamDetail";
import postNotifacation from "../../api/NotificationAPI";
import { async } from "@firebase/util";

function HeaderTeamDetail() {
  const { idTeam } = useParams();
  const location = useLocation();
  const [loadingAc, setLoadingAc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState("");
  const [manager, setManager] = useState("");
  const [activeTeamDetail, setActiveTeamDetail] = useState(location.pathname);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [statusPaticipate, setStatusPaticipate] = useState("Tham gia đội bóng");
  const [popupReport, setPopupReport] = useState(false);
  const [contentReport, setContentReport] = useState({ value: "", error: "" });
  const [contentCheckbox, setContentCheckbox] = useState({
    value: "",
    error: "",
  });
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
        if (err.response.status === 404) {
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
          getInforTeam={getInforTeam}
          postNotifacation={postNotifacation}
        />
      );
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/reportTeamDeatail`) {
      return <ReportTeamDetail />;
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/commentTeamDetail`) {
      return <CommentTeamDetail />;
    }
    if (activeTeamDetail === `/teamDetail/${idTeam}/tournamentTeamDetail`) {
      return <TournamentTeamDetail user={user} team={team} />;
    }
  };
  const postNotificationforTeamManager = async () => {
    const data = {
      content: "Có cầu thủ muốn tham gia vào đội bóng.Xem ngay",
      userId: idTeam,
      tournamentId: 0,
      teamId: idTeam,
    };
    try {
      const response = await postNotifacation(data);
      if (response.status === 201) {
        setLoadingAc(false);
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
      }
    } catch (err) {
      console.error(err);
    }
  };
  const sendMailPlayerRequestInTeam = (iPdlayer, idTeam) => {
    const respone = PlayerRegisterAPI(iPdlayer, +idTeam);
    respone
      .then((res) => {
        if (res.status === 200) {
          postNotificationforTeamManager();
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingAc(false);
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

  const addResquestToTeam = () => {
    setLoadingAc(true);
    const data = {
      status: "Chờ xét duyệt từ đội bóng",
      teamId: idTeam,
      footballPlayerId: user.userVM.id,
    };
    const respone = addPlayerInTeamAPI(data);
    respone
      .then((res) => {
        if (res.status === 201) {
          sendMailPlayerRequestInTeam(user.userVM.id, idTeam);
        }
      })
      .catch((err) => {
        setLoadingAc(false);
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

  const validateForm = (name, value) => {
    switch (name) {
      case "contentU":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      default:
        break;
    }

    return { flag: true, content: null };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const flagValid = validateForm(name, value);
    switch (name) {
      case "radio-group":
        let contentRadio = null;
        if (flagValid.flag === false) {
          contentRadio = {
            value,
            error: flagValid.content,
          };
        } else {
          contentRadio = {
            value,
            error: null,
          };
        }
        setContentCheckbox({
          ...contentRadio,
        });
        setContentReport({ value: "", error: "" });
        break;
      case "contentU":
        let contentU = null;
        if (flagValid.flag === false) {
          contentU = {
            value,
            error: flagValid.content,
          };
        } else {
          contentU = {
            value,
            error: null,
          };
        }
        setContentReport({
          ...contentU,
        });
        break;
      default:
        break;
    }
  };

  const sendReport = async (e) => {
    setLoadingAc(true);
    e.preventDefault();
    if (
      (contentReport.value === null && contentCheckbox.value === null) ||
      (contentReport.value === "" && contentCheckbox.value === "") ||
      (contentReport.value === "" && contentCheckbox.value === "Lý do khác")
    ) {
      toast.error("Không được để trống", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoadingAc(false);
      return;
    }
    const data = {
      reason:
        contentReport.value !== ""
          ? contentReport.value
          : contentCheckbox.value,
      userId: user.userVM.id,
      teamId: idTeam,
      status: "Chưa duyệt",
    };
    try {
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/reports",
        data
      );
      if (response.status === 201) {
        setPopupReport(false);
        setContentReport({ value: "", error: "" });
        setLoadingAc(false);
        toast.success("Báo cáo thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoadingAc(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };
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
                            className="editTeamTest"
                          >
                            <i class="fa-solid fa-pen-to-square"></i>Chỉnh Sửa
                            Đội Bóng
                          </Link>
                        ) : user.userVM.id != undefined &&
                          user.playerInfo != null ? (
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
                  {user !== null && user.userVM.id !== team.id ? (
                    <>
                      <div
                        className="report"
                        onClick={() => setPopupReport(true)}
                      >
                        <i class="fa-solid fa-exclamation"></i>
                        <p>Báo cáo</p>
                      </div>
                      <div
                        className={popupReport ? `overlay active` : "active"}
                        onClick={() => {
                          setPopupReport(false);
                        }}
                      ></div>
                      <form
                        className={
                          popupReport ? "popup__news active" : "popup__news"
                        }
                        onSubmit={sendReport}
                      >
                        <div
                          className="close"
                          onClick={() => setPopupReport(false)}
                        >
                          X
                        </div>
                        <h4>Báo cáo đội bóng</h4>
                        <div className={styles.checkbox}>
                          <p>
                            <input
                              className={styles.radio__input}
                              type="radio"
                              id="test1"
                              name="radio-group"
                              value={"Đội bóng giả mạo"}
                              onChange={onChangeHandler}
                            />
                            <label
                              htmlFor="test1"
                              className={styles.radio__label}
                            >
                              Đội bóng giả mạo
                            </label>
                          </p>
                          <p>
                            <input
                              className={styles.radio__input}
                              type="radio"
                              id="test2"
                              name="radio-group"
                              value={"Tên đội bóng không hợp lệ"}
                              onChange={onChangeHandler}
                            />
                            <label
                              htmlFor="test2"
                              className={styles.radio__label}
                            >
                              Tên đội bóng không hợp lệ
                            </label>
                          </p>
                          <p>
                            <input
                              className={styles.radio__input}
                              type="radio"
                              id="test3"
                              name="radio-group"
                              value={"Quấy rối, bắt nạt"}
                              onChange={onChangeHandler}
                            />
                            <label
                              htmlFor="test3"
                              className={styles.radio__label}
                            >
                              Quấy rối, bắt nạt
                            </label>
                          </p>
                          <p>
                            <input
                              className={styles.radio__input}
                              type="radio"
                              id="test4"
                              name="radio-group"
                              value={"Nội dung không phù hợp"}
                              onChange={onChangeHandler}
                            />
                            <label
                              htmlFor="test4"
                              className={styles.radio__label}
                            >
                              Nội dung không phù hợp
                            </label>
                          </p>
                          <p>
                            <input
                              className={styles.radio__input}
                              type="radio"
                              id="test5"
                              name="radio-group"
                              value={"Lý do khác"}
                              onChange={onChangeHandler}
                            />
                            <label
                              htmlFor="test5"
                              className={styles.radio__label}
                            >
                              Lý do khác:
                            </label>
                          </p>
                        </div>
                        <p className="error errRp">{contentReport.error}</p>
                        {contentCheckbox.value === "Lý do khác" ? (
                          <textarea
                            placeholder="Lý do báo cáo đội bóng này"
                            className="content"
                            name="contentU"
                            autoComplete="off"
                            value={contentReport.value}
                            onChange={onChangeHandler}
                          />
                        ) : null}
                        <button>Báo cáo</button>
                      </form>
                    </>
                  ) : null}
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
                    to={`/teamDetail/${idTeam}/tournamentTeamDetail`}
                    className={
                      activeTeamDetail ===
                      `/teamDetail/${idTeam}/tournamentTeamDetail`
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTeamDetail(
                        `/teamDetail/${idTeam}/tournamentTeamDetail`
                      )
                    }
                  >
                    Giải đấu
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
            ) : (
              <h1 className="nupakachi">
                Bạn chưa có đội bóng nào
                <Link to="/createTeam">{`->`}Tạo đội bóng ngày</Link>
              </h1>
            )}
          </div>
        )}
      </div>
      {loadingAc ? <LoadingAction /> : null}
      <Footer />
    </>
  );
}

export default HeaderTeamDetail;
