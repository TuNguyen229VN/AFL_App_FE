import React, { useState, useEffect } from "react";
import styles from "./styles/style.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  useEffect(() => {
    if (inputValues.firstName.trim() == "") {
      setFirstNameErr("Vui lòng nhập tên*");
    } else {
      setFirstNameErr("");
    }
    if (inputValues.lastName.trim()=== "") {
      setLastNameErr("Vui lòng nhập họ*");
    } else {
      setLastNameErr("");
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
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    gender: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    console.log(inputValues);
    setCheck(check + 1);
    setDuplicate(false);
  };
  const postNewAccount = async () => {
    try {
      if (
        inputValues.firstName.trim() === "" ||
        inputValues.lastName.trim() === "" ||
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
        Username: inputValues.lastName + " " + inputValues.firstName,
        Gender: inputValues.gender,
        Phone: inputValues.phone,
        RoleId: 1,
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
              postNewAccount();
              e.preventDefault();
            }}
          >
            <h4>Đăng ký</h4>
            <div>
              <img src="/assets/icons/user-icon.svg" alt="lock" />
              <input
                type="text"
                autoComplete="none"
                className={styles.lastname}
                placeholder="Họ *"
                name="lastName"
                onChange={handleOnChange}
              />
            </div>
            {isNull ? <p className="error">{lastNameErr}</p> : ""}
            <div>
              <img src="/assets/icons/user-icon.svg" alt="lock" />
              <input
                type="text"
                autoComplete="none"
                className={styles.firstname}
                placeholder="Tên *"
                name="firstName"
                onChange={handleOnChange}
              />
            </div>
            {isNull ? <p className={styles.error}>{firstNameErr}</p> : ""}
            <div>
            <img src="/assets/icons/sex.png" alt="lock" className="aaa"/>
              <select
                className={styles.gender}
                id=""
                name="gender"
                onChange={handleOnChange}
              >
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
            </div>
            {isNull ? <p className={styles.error}>{genderErr}</p> : ""}
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div className={styles.remember__pass}>
              <a href="#">Quên mật khẩu?</a>
            </div>
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
