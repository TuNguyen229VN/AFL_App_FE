import React, { useState, useEffect } from "react";
import styles from "./styles/style.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { toast } from "react-toastify";
function Signup() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRePass = () => {
    setRePasswordShown(!rePasswordShown);
  };
  const navigate = useNavigate();
  const [check, setCheck] = useState(0);
  const [isNull, setIsNull] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [rePasswordErr, setRePasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [duplcate, setDuplicate] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState("");
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    if (inputValues.firstName.trim() == "") {
      setFirstNameErr("Vui lòng nhập họ và tên*");
    } else {
      setFirstNameErr("");
    }
    if (inputValues.phone.trim() === "") {
      setPhoneErr("Vui lòng nhập số điện thoại*");
    } else {
      setPhoneErr("");
    }
    if (inputValues.gender.trim() === "") {
      setGenderErr("Vui lòng chọn giới tính*");
    } else {
      setGenderErr("");
    }
    if (inputValues.email.trim() === "") {
      setEmailErr("Vui lòng nhập email*");
    } else if (!validateEmail(inputValues.email)) {
      setEmailErr("Định dạng email không đúng");
    } else {
      setEmailErr("");
    }
    if (inputValues.password.trim() === "") {
      setPasswordErr("Vui lòng nhập mật khẩu*");
    } else {
      setPasswordErr("");
    }
    if (inputValues.rePassword.trim() === "") {
      setRePasswordErr("Vui lòng nhập lại mật khẩu");
    } else {
      setRePasswordErr("");
    }
    if (inputValues.rePassword !== inputValues.password) {
      setRePasswordErr("Mật khẩu không khớp*");
    } else {
      setRePasswordErr("");
    }
  }, [check]);

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const [inputValues, setInputValues] = useState({
    firstName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    gender: "",
    verify: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    console.log(inputValues);
    setCheck(check + 1);
    setDuplicate(false);
  };

  const getVerifyCode = async () => {
    try {
      if (
        inputValues.firstName.trim() === "" ||
        inputValues.phone.trim() === "" ||
        inputValues.gender.trim() === "" ||
        inputValues.email.trim() === "" ||
        inputValues.password.trim() === "" ||
        inputValues.rePassword.trim() === "" ||
        inputValues.password !== inputValues.rePassword
      ) {
        setCheck(check + 1);
        setIsNull(true);
        return;
      }
      const response = await axios.post(
        `https://afootballleague.ddns.net/api/v1/auth/send-verify-code?email=${inputValues.email}&toDo=1`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response.data);
      setPopUp(true);
      toast.success("Một mã xác thực đã được gửi đến eamil của bạn", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      if (error.response.data.message == "Tài khoản đã tồn tại") {
        setCheck(check + 1);
        setDuplicate(true);
      }
    }
  };

  const checkVerifyCode = async () => {
    try {
      if (inputValues.verify.trim() === "") {
        setVerifyStatus("Vui lòng nhập mã xác nhận");
        return;
      }

      const response = await axios.post(
        `https://afootballleague.ddns.net/api/v1/auth/check-verify-code?email=${inputValues.email}&code=${inputValues.verify}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      await postNewAccount();
      setVerifyStatus("");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      if (error.response.data == "Xác nhận thất bại")
        setVerifyStatus(error.response.data);
    }
  };

  const postNewAccount = async () => {
    try {
      if (
        inputValues.firstName.trim() === "" ||
        inputValues.phone.trim() === "" ||
        inputValues.gender.trim() === "" ||
        inputValues.email.trim() === "" ||
        inputValues.password.trim() === "" ||
        inputValues.rePassword.trim() === "" ||
        inputValues.password !== inputValues.rePassword
      ) {
        setCheck(check + 1);
        setIsNull(true);
        return;
      }

      const data = {
        Email: inputValues.email,
        Password: inputValues.password,
        Username: inputValues.firstName,
        Gender: inputValues.gender,
        Phone: inputValues.phone,
        RoleId: 4,
      };
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/users",
        data,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      navigate("../login", { replace: true });
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message == "Email này đã tồn tại trông hệ thống")
        setCheck(check + 1);
      setDuplicate(true);
    }
  };

  return (
    <div className={styles.signup}>
      <ScrollToTop />
      {popUp ? (
        <div className={styles.popup}>
          <form action="" method="post" className={styles.verifyForm}>
            <h4>Nhập mã xác minh</h4>
            <div>
              <input
                type="number"
                autoComplete="none"
                className={styles.verify}
                placeholder="Mã xác minh *"
                name="verify"
                onChange={handleOnChange}
              />
            </div>
            <p className={styles.error}>{verifyStatus}</p>
            <p className={styles.remind}>
              Lưu ý mã xác minh tồn tại trong 2 phút
            </p>
            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                onClick={(e) => {
                  getVerifyCode();
                  e.preventDefault();
                }}
              >
                Gửi lại mã
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  checkVerifyCode();
                  e.preventDefault();
                }}
              >
                Hoàn tất
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      <div className={styles.container__wrap}>
        <div className={styles.sign__sub}>
          <img
            src="assets/img/login/signup.jpg"
            alt="cornor"
            className={styles.imgBack}
          />
          <Link to="/" className={styles.logo}>
            <img src="assets/img/homepage/logo.png" alt="logo" />
          </Link>
          <div className={styles.sign__sub__text}>
            <h3>Đăng ký</h3>
            <h2>Để trở thành một thành viên của Amateur Football League</h2>
          </div>
        </div>
        <div className={styles.sign__main}>
          <div className={styles.sign__signup}>
            <p>Bạn đã có tài khoản ?</p>
            <Link to="/login">Đăng nhập</Link>
          </div>
          <form
            action=""
            method="POST"
            className={styles.signup__form}
            onSubmit={(e) => {
              getVerifyCode();
              e.preventDefault();
            }}
          >
            <h4>Đăng ký</h4>
            <div className={styles.wrapLog}>
              <img src="/assets/icons/user-icon.svg" alt="lock" />
              <input
                type="text"
                autoComplete="none"
                className={styles.firstname}
                placeholder="Họ và Tên *"
                name="firstName"
                onChange={handleOnChange}
              />
            </div>
            {isNull ? <p className={styles.error}>{firstNameErr}</p> : ""}
            <div className={styles.wrapLog}>
              <img src="/assets/icons/sex.png" alt="lock" className="aaa" />
              <select
                className={styles.gender}
                id=""
                name="gender"
                onChange={handleOnChange}
              >
                <option value=""></option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
            </div>
            {isNull ? <p className={styles.error}>{genderErr}</p> : ""}
            <div className={styles.wrapLog}>
              <img src="/assets/icons/mail-icon.svg" alt="lock" />
              <input
                type="text"
                autoComplete="none"
                className={styles.email}
                placeholder="Địa chỉ email *"
                name="email"
                onChange={handleOnChange}
              />
            </div>
            {isNull ? <p className={styles.error}>{emailErr}</p> : ""}
            {duplcate ? (
              <p className={styles.error}>Email đã tồn tại trong hệ thống</p>
            ) : (
              ""
            )}
            <div className={styles.wrapLog}>
              <img src="/assets/icons/telephone.png" alt="lock" />
              <input
                type="number"
                autoComplete="none"
                className={styles.email}
                placeholder="Số điện thoại *"
                name="phone"
                onChange={handleOnChange}
              />
            </div>
            {isNull ? <p className={styles.error}>{phoneErr}</p> : ""}
            <div className={styles.wrapLog}>
              <img src="/assets/icons/lock-icon.svg" alt="lock" />
              <input
                type={passwordShown ? "text" : "password"}
                className={styles.pass}
                placeholder="Mật khẩu *"
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
            {isNull ? <p className={styles.error}>{passwordErr}</p> : ""}
            <div className={styles.wrapLog}>
              <img src="/assets/icons/lock-icon.svg" alt="lock" />
              <input
                type={passwordShown ? "text" : "password"}
                className={`${styles.pass} ${styles.repass}`}
                placeholder="Xác nhận lại mật khẩu *"
                name="rePassword"
                onChange={handleOnChange}
              />
              <img
                src="/assets/icons/eye-close-up.png"
                alt="eye"
                className={styles.eyesPass}
                onClick={toggleRePass}
              />
            </div>
            {isNull ? <p className={styles.error}>{rePasswordErr}</p> : ""}
            <button type="submit" className={styles.btn_login}>
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
