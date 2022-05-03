import React ,{useState} from "react";
import { Link } from "react-router-dom";
import "./styles/style.css";
function Header() {
  const [clickMenu, setClickMenu] = useState(false);
  const [activeMenu, setactiveMenu] = useState("home")
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="logo">
          <Link to={"/"}>
            <img
              src="assets/img/homepage/logo.png"
              alt="logo"
              className="logo"
            />
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to={"/"} className={activeMenu==="home"?"title active":"title"} onClick={()=>setactiveMenu("home")}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to={"/findTournaments"} className={activeMenu==="tour"?"title active":"title"} onClick={()=>setactiveMenu("tour")}>
              Giải đấu
            </Link>
            <div className="sub_menu">
              <a href="#">Tìm giải đấu</a>
              <a href="#">Tạo giải đấu</a>
            </div>
          </li>
          <li>
            <Link to={"/"}  className={activeMenu==="team"?"title active":"title"} onClick={()=>setactiveMenu("team")}>
              Đội bóng
            </Link>
            <div className="sub_menu">
              <a href="#">Tìm đội bóng</a>
              <a href="#">Tạo đội bóng</a>
            </div>
          </li>
          <li>
            <Link to={"/"} className={activeMenu==="intro"?"title active":"title"} onClick={()=>setactiveMenu("intro")}>
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link to={"/"} href="#" className={activeMenu==="news"?"title active":"title"} onClick={()=>setactiveMenu("news")}>
              Tin tức
            </Link>
          </li>
        </ul>
        <div className="account">
          <div className="current">
            <div className="avatar">
              <img src="assets/img/homepage/pic-1.png" alt="avatar" />
            </div>
            <p className="name_account">Tú Nguyễn</p>
            <i>
              <img src="assets/icons/arrowDown.svg" alt="arrowDown" />
            </i>
          </div>
          <div className="popup_down">
            <a href="#">Hồ sơ</a>
            <a href="#">Bình luận</a>
            <a href="#">Đăng xuất</a>
          </div>
          <div className={`btn__menu ${clickMenu}`} onClick={()=>setClickMenu((clickMenu)=>!clickMenu)}>
            <span ></span>
          </div>
        </div>
        <nav className={`nav ${clickMenu}`} id="nav">
                <ul class="menu --mobile">
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="#">Giải đấu</a></li>
                    <li><a href="#">Đội bóng</a></li>
                    <li><a href="#">Giới thiệu</a></li>
                    <li><a href="#">Tin tức</a></li>
                </ul>
            </nav>
      </div>
    </header>
  );
}

export default Header;
