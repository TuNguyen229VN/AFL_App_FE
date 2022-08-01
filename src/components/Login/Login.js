import React, { useState, useEffect } from "react";
import styles from "./styles/style.module.css";
import { Link, useNavigate } from "react-router-dom";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import SignUpGoogle from "../SignUpGoogle/SignUpGoogle";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import LoadingAction from "../LoadingComponent/LoadingAction";
import { getAPI } from "../../api";
import app from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const [checkLoading, setCheckLoading] = useState(false);
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCYXpUYy_KK1FjtBjz19gY2QTWi4sBcsgU",
  //   authDomain: "amateurfoooballleague.firebaseapp.com",
  //   databaseURL: "gs://amateurfoooballleague.appspot.com",
  //   projectId: "amateurfoooballleague",
  //   storageBucket: "amateurfoooballleague.appspot.com",
  //   messagingSenderId: "765175452190",
  //   appId: "1:765175452190:web:3e01517d116d4777c9140f",
  //   measurementId: "G-7Z7LB0W52J",
  // };

  // !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };

  const [newAcc, setNewAcc] = useState(false);
  const [token, setToken] = useState("");
  const [failMessage, setFailMessage] = useState("");
  let navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState([]);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const loginWithPass = async () => {
    setCheckLoading(true);
    try {
      if (
        inputValues.username.trim() === "" ||
        (inputValues.password.trim() == null &&
          inputValues.password.trim() == "") ||
        inputValues.password.trim() == null
      ) {
        setUserNameErr("Vui lòng nhập tên đăng nhập");
        setPasswordErr("Vui lòng nhập mật khẩu");
        return;
      } else if (
        inputValues.username.trim() == "" ||
        inputValues.password.trim() == null
      ) {
        setUserNameErr("Vui lòng nhập tên đăng nhập");
        setPasswordErr("");
        return;
      } else if (
        inputValues.password.trim() === "" ||
        inputValues.password.trim() == null
      ) {
        setPasswordErr("Vui lòng nhập mật khẩu");
        setUserNameErr("");
        return;
      } else {
        setUserNameErr("");
        setPasswordErr("");
      }

      const data = {
        email: inputValues.username,
        password: inputValues.password,
      };
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/auth/login-email-password",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const playerUser = await getPlayer(response.data.userVM.id);
      const teamUser = await getTeam(response.data.userVM.id);
      const userData = response.data;
      userData.teamInfo = teamUser === undefined ? null : teamUser;
      userData.playerInfo = playerUser === undefined ? null : playerUser;
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setCheckLoading(false);
      window.location.reload();
      navigate("../home", { replace: true });
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      setCheckLoading(false);
      if (err.response.data === "Tài khoản không tồn tại") {
        setUserNameErr(err.response.data);
        setPasswordErr("");
        return;
      }
      if (err.response.data === "Sai mật khẩu") {
        setUserNameErr("");
        setPasswordErr(err.response.data);
        return;
      }
      toast.error(`${err.response.data}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = app
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("user not loggin");
          setNewAcc(false);
          return;
        }
        const token = await user.getIdToken();
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const checkLoginGG = async (token) => {
    setCheckLoading(true);
    try {
      const response = await axios.post(
        "https://afootballleague.ddns.net/api/v1/auth/login-with-google",
        {
          tokenId: `${token}`,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const playerUser = await getPlayer(response.data.userVM.id);
      const teamUser = await getTeam(response.data.userVM.id);
      const userData = response.data;
      userData.teamInfo = teamUser === undefined ? null : teamUser;
      userData.playerInfo = playerUser === undefined ? null : playerUser;

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setCheckLoading(false);
      window.location.reload();
      navigate("../home", { replace: true });
    } catch (err) {
      setCheckLoading(false);
      if (err.response.data === "Tài khoản không tồn tại") {
        setNewAcc(true);
      }
    }
  };

  const getPlayer = async (id) => {
    try {
      const response = await axios.get(
        `https://afootballleague.ddns.net/api/v1/football-players/${id}`
      );
      if (response.status === 200) {
        return response.data;
        //localStorage.setItem("playerInfo", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTeam = async (id) => {
    try {
      const response = await axios.get(
        `https://afootballleague.ddns.net/api/v1/teams/${id}`
      );
      if (response.status === 200) {
        return response.data;
        //localStorage.setItem("teamInfo", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const provider = new GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/user.gender.read');
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // provider.addScope('https://www.googleapis.com/auth/user.addresses.read');
  // provider.addScope('https://www.googleapis.com/auth/user.emails.read');
  // provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
  // provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  const auth = getAuth();

  return (
    <div className={styles.login}>
      <ScrollToTop />
      {checkLoading ? <LoadingAction /> : null}
      {newAcc ? (
        <SignUpGoogle newAcc={newAcc} userInfo={userInfo} token={token} />
      ) : (
        ""
      )}
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
          <form action="" method="POST" className={styles.login__form}>
            <h4>Đăng nhập</h4>
            <div className={styles.wrapLog}>
              <img src="/assets/icons/mail-icon.svg" alt="lock" />
              <input
                type="text"
                required
                autoComplete="off"
                className={styles.email}
                name="username"
                onChange={handleOnChange}
              />
            </div>
            <p className={styles.error}>{userNameErr}</p>
            <div className={styles.wrapLog}>
              <img src="/assets/icons/lock-icon.svg" alt="lock" />
              <input
                type={passwordShown ? "text" : "password"}
                required
                className={styles.pass}
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
            <p className={styles.error}>{passwordErr}</p>
            <div className={styles.remember__pass}>
              <Link to={"/resetPassword"}>Quên mật khẩu?</Link>
            </div>
            <button
              type="submit"
              className={styles.btn_login}
              onClick={(e) => {
                loginWithPass();
                e.preventDefault();
              }}
            >
              Đăng nhập
            </button>
          </form>
          <div className={styles.other_login}></div>
          <div className={styles.social__share}>
            <div
              className={`${styles.social__share__item} ${styles.twitter}`}
              onClick={() => {
                signInWithPopup(auth, provider)
                  .then(async (result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                      GoogleAuthProvider.credentialFromResult(result);

                    // The signed-in user info.

                    const user = result.user;
                    const token = await user.getIdToken();
                    // console.log("token down" , token);
                    // console.log(user);
                    setUserInfo(user);
                    await checkLoginGG(token);
                    setToken(token);
                    // ...
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential =
                      GoogleAuthProvider.credentialFromError(error);
                    // ...
                  });
              }}
            >
              <i className={styles.social__share__icon}>
                <img src="/assets/img/login/google.png" alt="fb" />
              </i>
              <span className={styles.social__share__text}>
                Đăng nhập bằng tài khoản Google
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
