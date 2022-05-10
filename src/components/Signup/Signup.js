import React, { useState } from "react";
import "./styles/style.css";
import { Link } from "react-router-dom";
function Signup() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRePass = () => {
    setRePasswordShown(!rePasswordShown);
  };

  return (
    <div className="signup">
    <div className="container__wrap">
      <div className="sign__sub">
        <img
          src="assets/img/login/signup.jpg"
          alt="cornor"
          className="imgBack"
        />
        <Link to="/" className="logo">
          <img src="assets/img/homepage/logo.png" alt="logo" />
        </Link>
        <div className="sign__sub-text">
          <h3>Đăng ký</h3>
          <h2>Để trở thành một thành viên của Amateur Football League</h2>
        </div>
      </div>
      <div className="sign__main">
        <div className="sign__signup">
          <p>Bạn đã có tài khoản ?</p>
          <Link to="/login">Đăng nhập</Link>
        </div>
        <form action="" method="POST" className="signup__form">
          <h4>Đăng ký</h4>
          <div>
            <img src="/assets/icons/user-icon.svg" alt="lock" />
            <input
              type="text"
              required
              autoComplete="none"
              className="lastname"
              placeholder="Họ *"
            />
          </div>
          <div>
            <img src="/assets/icons/user-icon.svg" alt="lock" />
            <input
              type="text"
              required
              autoComplete="none"
              className="firstname"
              placeholder="Tên *"
            />
          </div>
          <div>
            <img src="/assets/icons/mail-icon.svg" alt="lock" />
            <input
              type="text"
              required
              autoComplete="none"
              className="email"
              placeholder="Địa chỉ email *"
            />
          </div>
          <div>
            <img src="/assets/icons/telephone.png" alt="lock" />
            <input
              type="number"
              required
              autoComplete="none"
              className="email"
              placeholder="Số điện thoại *"
            />
          </div>
          <div>
            <img src="/assets/icons/lock-icon.svg" alt="lock" />
            <input
              type={passwordShown ? "text" : "password"}
              required
              className="pass"
              placeholder="Mật khẩu *"
            />
            <img
              src="/assets/icons/eye-close-up.png"
              alt="eye"
              className="eyesPass"
              onClick={togglePass}
            />
          </div>
          <div>
            <img src="/assets/icons/lock-icon.svg" alt="lock" />
            <input
              type={passwordShown ? "text" : "password"}
              required
              className="pass repass"
              placeholder="Xác nhận lại mật khẩu *"
            />
            <img
              src="/assets/icons/eye-close-up.png"
              alt="eye"
              className="eyesPass"
              onClick={toggleRePass}
            />
          </div>
          <div className="remember__pass">
              <a href="#">Quên mật khẩu?</a>
            </div>
          <button type="submit" className="btn_login">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Signup;
