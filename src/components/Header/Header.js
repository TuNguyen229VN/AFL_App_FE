import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAPI } from "../../api";
import Notification from "../NotificationComponent/Notification";
function Header(id) {
  const firebaseConfig = {
    apiKey: "AIzaSyCYXpUYy_KK1FjtBjz19gY2QTWi4sBcsgU",
    authDomain: "amateurfoooballleague.firebaseapp.com",
    databaseURL: "gs://amateurfoooballleague.appspot.com",
    projectId: "amateurfoooballleague",
    storageBucket: "amateurfoooballleague.appspot.com",
    messagingSenderId: "765175452190",
    appId: "1:765175452190:web:3e01517d116d4777c9140f",
    measurementId: "G-7Z7LB0W52J",
  };

  firebase.initializeApp(firebaseConfig);
  // get Locoal Storage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  // signout
  const signout = () => {
    firebase.auth().signOut();
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  const [myAccount, setMyAccount] = useState([]);
  const getMyAccount=()=>{
    const afterURL=`users/${user?user.userVM.id:""}`;
    const response=getAPI(afterURL);
    response.then(res=>{
        setMyAccount(res.data);
    }).catch(err=>{
      console.log(err)
    })
  }

  const location = useLocation();
  const [clickMenu, setClickMenu] = useState(false);
  const [activeMenu, setactiveMenu] = useState(location.pathname);
  const [clickUserMenu, setClickUserMenu] = useState(false);
  const tourHighlight = [
    "/findTournaments",
    "/createTournament",
    "/tournamentDetail",
    `/tournamentDetail/${id.id}/inforTournamentDetail`,
    `/tournamentDetail/${id.id}/galleryTournamentDetail`,
    `/tournamentDetail/${id.id}/scheduleTournamentDetail`,
    `/tournamentDetail/${id.id}/rankTableTournamentDetail`,
    `/tournamentDetail/${id.id}/teamInTournament`,
    `/tournamentDetail/${id.id}/commentTournamentDetail`,
    `/tournamentDetail/${id.id}/predictionTournamentDetail`,
  ];
  const teamHighlight = [
    "/findTeam",
    "/createTeam",
    `/teamDetail/${id.id}/inforTeamDetail`,
    `/teamDetail/${id.id}/listPlayer`,
    `/teamDetail/${id.id}/reportTeamDeatail`,
    `/teamDetail/${id.id}/commentTeamDetail`,
  ];
  useEffect(()=>{
    getMyAccount();
  },[])
  useEffect(() => {
    setactiveMenu(location.pathname);
  }, [location]);

  const checkTour = () => {
    if (tourHighlight.indexOf(window.location.pathname) < 0) {
      return "title";
    } else {
      return "title active";
    }
  };

  const checkTeam = () => {
    if (teamHighlight.indexOf(window.location.pathname) < 0) {
      return "title";
    } else {
      return "title active";
    }
  };
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="logo">
          <Link to={"/"}>
            <img
              src="/assets/img/homepage/logo.png"
              alt="logo"
              className="logo"
            />
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link
              to={"/"}
              className={
                activeMenu === "/home" || activeMenu === "/"
                  ? "title active"
                  : "title"
              }
              onClick={() => setactiveMenu("/home")}
            >
              Trang chủ
            </Link>
          </li>
          <li className="tourheader">
            <span className={checkTour()}>Giải đấu</span>
            <div className="sub_menu">
              <Link
                to={"/findTournaments"}
                onClick={() => setactiveMenu("/findTournaments")}
              >
                Tìm giải đấu
              </Link>
              <Link
                to={"/createTournament"}
                onClick={() => setactiveMenu("/createTournament")}
              >
                Tạo giải đấu
              </Link>
            </div>
          </li>
          <li className="teamheader">
            <span className={checkTeam()}>Đội bóng</span>
            <div className="sub_menu">
              <Link to={"/findTeam"} onClick={() => setactiveMenu("/findTeam")}>
                Tìm đội bóng
              </Link>
              <Link
                to={"/createTeam"}
                onClick={() => setactiveMenu("/findTeam")}
              >
                Tạo đội bóng
              </Link>
            </div>
          </li>
          <li>
            <Link
              to={"/login"}
              className={activeMenu === "intro" ? "title active" : "title"}
              onClick={() => setactiveMenu("intro")}
            >
              Giới thiệu
            </Link>
          </li>
        </ul>
        <div className="account">
          {user ? (
            <div
              className="current"
              onClick={() => setClickUserMenu(!clickUserMenu)}
            >
              <div className="avatar">
                <img src={myAccount.avatar} alt={myAccount.username} />
              </div>
              <p className="name_account">{myAccount.username}</p>
              <i>
                <img src="/assets/icons/arrowDown.svg" alt="arrowDown" />
              </i>
            </div>
          ) : (
            <div className="current">
              <Link to={"/login"} className="login__text">
                Đăng nhập
              </Link>
              <span className="dash">/</span>
              <Link to={"/signup"} className="login__text">
                Đăng ký
              </Link>
            </div>
          )}
          {user ? <Notification/>:null}
          {user ? (
            <div className={clickUserMenu ? "popup_down active" : "popup_down"}>
              <Link to={"/profile"}>Hồ sơ</Link>
              <Link to={`/myListTournament`}>Giải đấu của bạn</Link>
              <Link to={`/teamDetail/${myAccount.id}/inforTeamDetail`}>
                Đội bóng của bạn
              </Link>
              <a href="#" onClick={signout}>
                Đăng xuất
              </a>
            </div>
          ) : null}
          <div
            className={`btn__menu ${clickMenu}`}
            onClick={() => setClickMenu((clickMenu) => !clickMenu)}
          >
            <span></span>
          </div>
        </div>
        <nav className={`nav ${clickMenu}`} id="nav">
          <ul className="menu --mobile">
            <li>
              <Link
                to={"/"}
                className={
                  activeMenu === "/home" || activeMenu === "/"
                    ? "title active"
                    : "title"
                }
                onClick={() => setactiveMenu("/home")}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to={"/findTournaments"}
                className={
                  activeMenu === "/findTournaments" ? "title active" : "title"
                }
                onClick={() => setactiveMenu("/findTournaments")}
              >
                Giải đấu
              </Link>
            </li>
            <li>
              <Link
                to={"/findTeam"}
                className={
                  activeMenu === "/findTeam" ? "title active" : "title"
                }
                onClick={() => setactiveMenu("/findTeam")}
              >
                Đội bóng
              </Link>
            </li>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
