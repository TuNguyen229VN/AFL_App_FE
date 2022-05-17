import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ChangePassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);

  const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [rePassword, setRePassword] = useState({ value: "", error: "" });
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRePass = () => {
    setRePasswordShown(!rePasswordShown);
  };
  const toggleOldPass = () => {
    setOldPasswordShown(!oldPasswordShown);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const flagValid = validateForm(name, value);
    switch (name) {
      case "oldpassword":
        let oldpassword = null;
        if (flagValid.flag === false) {
            console.log("asas")
          oldpassword = {
            value,
            error: flagValid.content,
          };
        } else {
          oldpassword = {
            value,
            error: null,
          };
        }
        setOldPassword({
          ...oldpassword,
        });
        break;
      case "password":
        let password = null;
        if (flagValid.flag === false) {
          password = {
            value,
            error: flagValid.content,
          };
        } else {
          password = {
            value,
            error: null,
          };
        }
        setPassword({
          ...password,
        });
        break;
      case "rePassword":
        let rePassword = null;
        if (flagValid.flag === false) {
          rePassword = {
            value,
            error: flagValid.content,
          };
        } else {
          rePassword = {
            value,
            error: null,
          };
        }
        setRePassword({
          ...rePassword,
        });
        break;
      default:
        break;
    }
  };

  const validateForm = (name, value) => {
    switch (name) {
      case "oldpassword":
        break;
      case "password":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        break;
      case "rePassword":
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
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className={styles.changePass}>
        <h2 className={styles.changePass__title}>Đổi mật khẩu</h2>
        <form>
          <div>
            <img src="/assets/icons/lock-icon.svg" alt="lock" />
            <input
              type={oldPasswordShown ? "text" : "password"}
              className={styles.pass}
              placeholder="Mật khẩu cũ*"
              name="oldpassword"
              onChange={handleOnChange}
            />
            <img
              src="/assets/icons/eye-close-up.png"
              alt="eye"
              className={styles.eyesPass}
              onClick={toggleOldPass}
            />
            {oldPassword.error != null ? (
              <p className={styles.error}>{oldPassword.error}</p>
            ) : null}
          </div>
          <div>
            <img src="/assets/icons/lock-icon.svg" alt="lock" />
            <input
              type={passwordShown ? "text" : "password"}
              className={styles.pass}
              placeholder="Mật khẩu mới*"
              name="password"
              onChange={handleOnChange}
            />
            <img
              src="/assets/icons/eye-close-up.png"
              alt="eye"
              className={styles.eyesPass}
              onClick={togglePass}
            />
          </div>
          {password.error != null ? (
            <p className={styles.error}>{password.error}</p>
          ) : null}
          <div>
            <img src="/assets/icons/lock-icon.svg" alt="lock" />
            <input
              type={rePasswordShown ? "text" : "password"}
              className={`${styles.pass} ${styles.repass}`}
              placeholder="Xác nhận lại mật khẩu mới*"
              name="rePassword"
              onChange={handleOnChange}
            />
            <img
              src="/assets/icons/eye-close-up.png"
              alt="eye"
              className={styles.eyesPass}
              onClick={toggleRePass}
            />
            {rePassword.error != null ? (
              <p className={styles.error}>{rePassword.error}</p>
            ) : null}
          </div>
          <button className={styles.btnChange}>Đổi mật khẩu</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
