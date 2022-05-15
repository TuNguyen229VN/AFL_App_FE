import React, { useState, useEffect } from "react";
// import "../Signup/styles/style.css";
import "./styles/style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUpGoogle(props) {
  const navigate = useNavigate();
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [check, setCheck] = useState(0);
  const [isNull, setIsNull] = useState(false);

  useEffect(() => {
    if (inputValues.firstName.trim() == "") {
      setFirstNameErr("Vui lòng nhập Tên");
    } else {
      setFirstNameErr("");
    }
    if (inputValues.lastName.trim() == "") {
      setLastNameErr("Vui lòng nhập họ");
    } else {
      setLastNameErr("");
    }
    if (inputValues.phone.trim() == "") {
      setPhoneErr("Vui lòng nhập số điện thoại");
    } else {
      setPhoneErr("");
    }
    if (inputValues.gender.trim() == "") {
      setGenderErr("Vui lòng chọn giới tính");
    } else {
      setGenderErr("");
    }
  }, [check]);
  const [inputValues, setInputValues] = useState({
    lastName: "",
    firstName: props.userInfo.displayName,
    phone: "",
    gender: "",
  });

  useEffect(() => {
    console.log(props.userInfo.displayName);
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });

    setCheck(check + 1);
  };

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  const postNewAccount = async () => {
    try {
      if (
        inputValues.firstName.trim() == "" ||
        inputValues.lastName.trim() == "" ||
        inputValues.phone.trim() == "" ||
        inputValues.gender.trim() == ""
      ) {
        setCheck(check + 1);
        setIsNull(true);
        return;
      }
      const data = {
        Email: props.userInfo.email.toString(),
        Username: inputValues.lastName + " " + inputValues.firstName,
        Gender: inputValues.gender,
        Phone: inputValues.phone,
        RoleId: 1,
      };
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/users/CreateWithGoogle",
        data,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      const login = await axios.post(
        "https://afootballleague.ddns.net/api/v1/auth/login-with-google",
        {
          tokenId: `${props.token}`,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("../home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`signupgg ${props.newAcc ? "active" : ""}`}>
      <div className="signUpggInfo">
        <div className="container__wrap">
          <form
            action=""
            method="POST"
            className="signupgg__form"
            onSubmit={(e) => {
              postNewAccount();
              e.preventDefault();
            }}
          >
            <h4>Bổ sung thông Tin Tài Khoản</h4>
            <div>
              <img src="/assets/icons/user-icon.svg" alt="lock" />
              <input
                type="text"
                autoComplete="none"
                className="lastname"
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
                className="firstname"
                placeholder="Tên *"
                name="firstName"
                onChange={handleOnChange}
                value={inputValues.firstName}
              />
            </div>
            {isNull ? <p className="error">{firstNameErr}</p> : ""}

            <div>
              <img src="/assets/icons/telephone.png" alt="lock" />
              <input
                type="number"
                autoComplete="none"
                className="email"
                placeholder="Số điện thoại *"
                name="phone"
                onChange={handleOnChange}
              />
            </div>
            {isNull ? <p className="error">{phoneErr}</p> : ""}

            <div>
              <h2>Giới tính</h2>
              <select
                className="gender"
                id=""
                name="gender"
                onChange={handleOnChange}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {isNull ? <p className="error">{genderErr}</p> : ""}

            <button type="submit" className="btn_login">
              Hoàn Tất
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpGoogle;
