import React from "react";
import "./styles/style.css";
function Header() {
  return (
    <header>
      <div className="container-fluid">
        <div className="logo">
          <a href="#">
            <img
              src="assets/img/homepage/logo.png"
              alt="logo"
              className="logo"
            />
          </a>
        </div>
        <ul className="menu">
          <li>
            <a href="#" className="title active">
              Trang chủ
            </a>
          </li>
          <li>
            <a href="#" className="title">Giải đấu</a>
            <div className="sub_menu">
              <a href="#">Tìm giải đấu</a>
              <a href="#">Tạo giải đấu</a>
            </div>
          </li>
          <li>
            <a href="#" className="title">Đội bóng</a>
            <div className="sub_menu">
              <a href="#">Tìm đội bóng</a>
              <a href="#">Tạo đội bóng</a>
            </div>
          </li>
          <li>
            <a href="#" className="title">Giới thiệu</a>
          </li>
          <li>
            <a href="#" className="title">Tin tức</a>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
