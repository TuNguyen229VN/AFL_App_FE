import React, { useState } from "react";
import "./styles/style.css";
import { Link } from "react-router-dom";
function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="login">
      <div className="container__wrap">
        <div className="login__sub">
          <img
            src="assets/img/login/cornor.jpg"
            alt="cornor"
            className="imgBack"
          />
          <div className="logo">
            <img src="assets/img/homepage/logo.png" alt="logo" />
          </div>
          <div className="login__sub-text">
            <h3>Chúng tôi rất vui khi thấy bạn trở lại!</h3>
            <h2>Amateurs Football League</h2>
          </div>
        </div>
        <div className="login__main">
          <div className="login__signup">
            <p>Không phải là thành viên?</p>
            <Link to="/signup">Đăng ký</Link>
          </div>
          <form action="" method="POST" className="login__form">
            <h4>Đăng nhập</h4>
            <div>
              <img src="/assets/icons/mail-icon.svg" alt="lock" />
              <input
                type="text"
                required
                autoComplete="none"
                className="name"
              />
            </div>
            <div>
              <img src="/assets/icons/lock-icon.svg" alt="lock" />
              <input
                type={passwordShown ? "text" : "password"}
                required
                className="pass"
              />
              <img
                src="/assets/icons/eye-close-up.png"
                alt="eye"
                className="eyesPass"
                onClick={togglePass}
              />
            </div>
            <button type="submit" className="btn_login">
              Đăng nhập
            </button>
          </form>
          <div className="remember__pass">
            <a href="#">Quên mật khẩu?</a>
          </div>
          <div className="other_login"></div>
          <div className="social-share">
          <div className="social-share-item facebook">
            <i className="fab fa-facebook social-share-icon">
              <img src="/assets/img/login/facebook.png" alt="fb"/>
            </i>
            <span className="social-share-text">Đăng nhập bằng tài khoản Facebook</span>
          </div>
          <div className="social-share-item twitter">
            <i className="fab fa-twitter social-share-icon">
            <img src="/assets/img/login/google.png" alt="fb"/>
            </i>
            <span className="social-share-text">Đăng nhập bằng tài khoản Google</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
