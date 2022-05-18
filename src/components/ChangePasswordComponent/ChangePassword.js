import React, { useState } from "react";
import { toast } from "react-toastify";
import { postAPI } from "../../api";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function ChangePassword() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
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
          console.log("asas");
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
        if (value.length === 0) {
          return {
            flag: false,
            content: "*Không được để trống",
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
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      password.value.trim() === "" ||
      rePassword.value.trim() === "" ||
      oldPassword.value.trim() === "" ||
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
      return;
    }
    const data = {
      id: user.userVM.id,
      currentPassword: oldPassword.value,
      newPassword: password.value,
    };
    const afterDefaultURL = `users/change-password`;
    const response = postAPI(afterDefaultURL, data, false);
    response
      .then((res) => {
        if (res.status === 200) {
          toast.success("Thay đổi mật khẩu thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setOldPassword({value:"",error:""})
          setPassword({value:"",error:""})
          setRePassword({value:"",error:""})
        }
      })
      .catch((err) => {
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
    <>
      <ScrollToTop />
      <Header />
      <div className={styles.changePass}>
        <h2 className={styles.changePass__title}>Đổi mật khẩu</h2>
        <form onSubmit={onSubmitHandler}>
          <div>
            <img src="/assets/icons/lock-icon.svg" alt="lock" />
            <input
              type={oldPasswordShown ? "text" : "password"}
              className={styles.pass}
              placeholder="Mật khẩu cũ*"
              name="oldpassword"
              value={oldPassword.value}
              onChange={handleOnChange}
            />
            <img
              src="/assets/icons/eye-close-up.png"
              alt="eye"
              className={styles.eyesPass}
              onClick={toggleOldPass}
            />
          </div>
          {oldPassword.error != null ? (
            <p className={styles.error}>{oldPassword.error}</p>
          ) : null}
          <div>
            <img src="/assets/icons/lock-icon.svg" alt="lock" />
            <input
              type={passwordShown ? "text" : "password"}
              className={styles.pass}
              placeholder="Mật khẩu mới*"
              name="password"
              value={password.value}
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
              value={rePassword.value}
              onChange={handleOnChange}
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
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
