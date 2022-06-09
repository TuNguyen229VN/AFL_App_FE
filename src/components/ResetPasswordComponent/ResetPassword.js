import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postAPI } from "../../api";
import LoadingAction from "../LoadingComponent/LoadingAction";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [code, setCode] = useState({ value: "", error: "" });
  const [check, setCheck] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [codeFromMail, setCodeFromMail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [rePassword, setRePassword] = useState({ value: "", error: "" });
  const [passwordShown, setPasswordShown] = useState(false);
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRePass = () => {
    setRePasswordShown(!rePasswordShown);
  };
  const validateForm = (name, value) => {
    switch (name) {
      case "username":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          return {
            flag: false,
            content: "*Sai định dạng mail",
          };
        }
        break;
      case "code":
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
          };
        }
        if (value.length !== 6) {
          return {
            flag: false,
            content: "*Mã xác thực có 6 số",
          };
        }
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
        } else if (password.value !== value) {
          return {
            flag: false,
            content: "*Xác nhận mật khẩu chưa khớp với mật khẩu",
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
      case "username":
        let username = null;
        if (flagValid.flag === false) {
          username = {
            value,
            error: flagValid.content,
          };
        } else {
          username = {
            value,
            error: null,
          };
        }
        setEmail({
          ...username,
        });
        break;
      case "code":
        let code = null;
        if (flagValid.flag === false) {
          code = {
            value,
            error: flagValid.content,
          };
        } else {
          code = {
            value,
            error: null,
          };
        }
        setCode({
          ...code,
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

  const onSendVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      email.value.trim() === "" ||
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
    ) {
      toast.error("Vui lòng kiểm tra lại thông tin", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const data = {
      email: email.value,
      toDo: 2,
    };
    let afterDefaultURL = `auth/send-verify-code?email=${email.value}&toDo=2`;
    const response = postAPI(afterDefaultURL, data, false);
    response
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success(
            "Gửi mã xác thực thành công vui lòng kiểm tra mail của bạn",
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
        setCheck(true);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data, {
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

  const confirmVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      code.value.trim() === "" ||
      email.value.trim() === "" ||
      code.value.length !== 6
    ) {
      toast.error("Vui lòng kiểm tra lại thông tin", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const data = {
      email: email.value,
      code: code.value,
    };
    let afterDefaultURL = `auth/check-verify-code?email=${email.value}&code=${code.value}`;
    const response = postAPI(afterDefaultURL, data, false);
    response
      .then((res) => {
        if (res.status === 200) {
          toast.success("Vui lòng điền mật khẩu mới", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
          setChangePassword(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data, {
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

  const onSubmitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      password.value.trim() === "" ||
      rePassword.value.trim() === "" ||
      password.value !== rePassword.value
    ) {
      toast.error("Vui lòng kiểm tra lại thông tin", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const data = {
      email: email.value,
      newPassword: password.value,
    };
    const afterDefaultURL = `users/reset-password`;
    const response = postAPI(afterDefaultURL, data, false);
    response
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          toast.success("Đổi mật khẩu thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setEmail({ value: "", error: "" });
          setCheck(false);
          setCodeFromMail(false);
          setPassword({ value: "", error: "" });
          setRePassword({ value: "", error: "" });
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data, {
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
  return (
    <div className={styles.login}>
      <ScrollToTop />
      {loading ? <LoadingAction /> : null}
      <div className={styles.container__wrap}>
        <div className={styles.login__sub}>
          <img
            src="assets/img/login/cornor.jpg"
            alt="cornor"
            className={styles.imgBack}
          />
          <Link to="/" className={styles.logo}>
            <img src="assets/img/homepage/logo.png" alt="logo" />
          </Link>
          <div className={styles.login__sub__text}>
            <h3>Chúng tôi rất vui khi thấy bạn trở lại!</h3>
            <h2>Amateur Football League</h2>
          </div>
        </div>
        <div className={styles.login__main}>
          <div className={styles.login__signup}>
            <p>Bạn chưa có tài khoản ?</p>
            <Link to="/signup">Đăng ký</Link>
          </div>
          {changePassword ? (
            <form onSubmit={onSubmitHandler} className={styles.changePass}>
              <h4>Đổi mật khẩu mới</h4>
              <div>
                <img src="/assets/icons/lock-icon.svg" alt="lock" />
                <input
                  type={passwordShown ? "text" : "password"}
                  className={styles.pass}
                  placeholder="Mật khẩu mới*"
                  name="password"
                  value={password.value}
                  onChange={onChangeHandler}
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
                  value={rePassword.value}
                  onChange={onChangeHandler}
                />
                <img
                  src="/assets/icons/eye-close-up.png"
                  alt="eye"
                  className={styles.eyesPass}
                  onClick={toggleRePass}
                />
              </div>
              {rePassword.error != null ? (
                <p className={styles.error}>{rePassword.error}</p>
              ) : null}
              <input
                type="submit"
                value="Đổi mật khẩu"
                className={styles.btnChange}
              />
            </form>
          ) : (
            <form
              onSubmit={check ? confirmVerify : onSendVerify}
              className={styles.login__form}
            >
              <h4>Quên mật khẩu</h4>
              <div>
                <img src="/assets/icons/mail-icon.svg" alt="lock" />
                <input
                  type="text"
                  required
                  autoComplete="off"
                  className={styles.email}
                  value={email.value}
                  name="username"
                  placeholder="Địa chỉ email*"
                  onChange={onChangeHandler}
                />
              </div>
              {email.error != null ? (
                <p className={styles.error}>{email.error}</p>
              ) : null}
              {check ? (
                <>
                  <div>
                    <img src="/assets/icons/lock-icon.svg" alt="lock" />
                    <input
                      type="number"
                      required
                      className={styles.pass}
                      name="code"
                      value={code.value}
                      placeholder="Mã xác thực*"
                      onChange={onChangeHandler}
                      autoComplete="off"
                    />
                  </div>
                  {code.error != null ? (
                    <p className={styles.error}>{code.error}</p>
                  ) : null}
                  <div className={styles.buttonWrap}>
                    <p className={styles.remind}>
                      *Lưu ý mã xác minh tồn tại trong 2 phút
                    </p>
                    <p
                      className={styles.remind1}
                      onClick={(event) => {
                        onSendVerify(event);
                      }}
                    >
                      Gửi lại mã
                    </p>
                  </div>
                </>
              ) : null}
              <button type="submit" className={styles.btn_login}>
                {check ? "Xác thực" : "Gửi mã xác thực"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
