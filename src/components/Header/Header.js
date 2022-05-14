import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";
function Header(id) {
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
            <a
              href="javascript:void(0)"
              className={checkTour()}
              onClick={() => setactiveMenu("/findTournaments")}
            >
              Giải đấu
            </a>
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
            <a
              href="javascript:void(0)"
              className={checkTeam()}
              onClick={() => setactiveMenu("/findTeam")}
            >
              Đội bóng
            </a>
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
          <li>
            <Link
              to={"/"}
              href="#"
              className={activeMenu === "news" ? "title active" : "title"}
              onClick={() => setactiveMenu("news")}
            >
              Tin tức
            </Link>
          </li>
        </ul>
        <div className="account">
        <div className="current">
          <Link to={"/login"} className="login__text">Đăng nhập</Link>
          <span className="dash">/</span>
          <Link to={"/signup"} className="login__text">Đăng ký</Link>
        </div>
          {/* <div
            className="current"
            onClick={() => setClickUserMenu(!clickUserMenu)}
          >
            <div className="avatar">
              <img src="/assets/img/homepage/pic-1.png" alt="avatar" />
            </div>
            <p className="name_account">Tú Nguyễn</p>
            <i>
              <img src="/assets/icons/arrowDown.svg" alt="arrowDown" />
            </i>
          </div> */}
          <div className={clickMenu ? "popup_down active" : "popup_down"}>
            <a href="#">Hồ sơ</a>
            <a href="#">Giải đấu của bạn</a>
            <a href="#">Đội bóng của bạn</a>
            <a href="#">Đăng xuất</a>
          </div>
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
            <li>
              <a href="#">Tin tức</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
