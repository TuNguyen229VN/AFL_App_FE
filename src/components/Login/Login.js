import React from "react";
import "./styles/style.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div>
      <div className="container__wrap">
        <div className="login__sub">
        <img src="assets/img/login/cornor.jpg" alt="cornor"/>
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
              <input type="text" required autoComplete="none"/>
              <input type="password" required/>
              <button type="submit" class="btn_login">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
