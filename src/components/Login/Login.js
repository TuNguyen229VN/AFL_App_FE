import React, { useState,useEffect } from "react";
import styles from "./styles/style.module.css";
import { Link,useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { GoogleAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import SignUpGoogle from '../SignUpGoogle/SignUpGoogle'
function Login() {

  const firebaseConfig = {
    apiKey: "AIzaSyCYXpUYy_KK1FjtBjz19gY2QTWi4sBcsgU",
    authDomain: "amateurfoooballleague.firebaseapp.com",
    databaseURL: "gs://amateurfoooballleague.appspot.com",
    projectId: "amateurfoooballleague",
    storageBucket: "amateurfoooballleague.appspot.com",
    messagingSenderId: "765175452190",
    appId: "1:765175452190:web:3e01517d116d4777c9140f",
    measurementId: "G-7Z7LB0W52J"
  }; 

  firebase.initializeApp(firebaseConfig)

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePass = () => {
    setPasswordShown(!passwordShown);
  };

  const [newAcc, setNewAcc] = useState(false);
  const [token, setToken] = useState("");
  const [failMessage,  setFailMessage] = useState("");
  let navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: '', password: ''
  });
  const [userInfo, setUserInfo] = useState([]);
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [userNameErr, setUserNameErr] = useState('');
  const [passwordErr ,setPasswordErr] = useState('');

  const loginWithPass =async () => {
    try{
      if(inputValues.username.trim() == "" || inputValues.password.trim() == null && inputValues.password.trim() == "" || inputValues.password.trim() == null ){
        setUserNameErr("Vui lòng nhập tên đăng nhập");
        setPasswordErr("Vui lòng nhập mật khẩu");
        return;
      }
      else if(inputValues.username.trim() == "" || inputValues.password.trim() == null
      ){
        setUserNameErr("Vui lòng nhập tên đăng nhập");
        setPasswordErr("");
        return
      }
      else if(inputValues.password.trim() == "" || inputValues.password.trim() == null ){
        setPasswordErr("Vui lòng nhập mật khẩu");
        setUserNameErr("");
        return 
      }
      else{
        setUserNameErr("");
      setPasswordErr("");
      }
   
      
      const data = {
        email : inputValues.username,
        password : inputValues.password
      }
      const response= await axios.post('https://afootballleague.ddns.net/api/v1/auth/login-email-password',data,{
        headers: { 'Content-Type': 'application/json'}});
      console.log(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("../home", { replace: true })
    }
    catch(err){
      console.log(err);
      console.log(err.response.data);
      if(err.response.data == "Tài khoản không tồn tại"){
        setUserNameErr(err.response.data);
        setPasswordErr("");
      }
      if(err.response.data == "Sai mật khẩu"){
        setUserNameErr("");
        setPasswordErr(err.response.data);
      }
      
    }
  }

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      if(!user){
        console.log('user not loggin')
        setNewAcc(false)
        return;
      }
      const token = await user.getIdToken()
      console.log(user)
      console.log('Token ',  token );
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const checkLoginGG =async (token) => {
    try{
      const response = await axios.post('https://afootballleague.ddns.net/api/v1/auth/login-with-google',{
        "tokenId" : `${token}`
      },{
        headers: {
          "Content-type": "application/json"
        }
      })
      console.log(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("../home", { replace: true })
     }
      catch(err){
        if(err.response.data == "Tài khoản không tồn tại"){
          setNewAcc(true);
  
        }
      }
  }
 

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
       {newAcc?<SignUpGoogle newAcc={newAcc} userInfo = {userInfo} token = {token}/>:""}
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
            <div>
              <img src="/assets/icons/mail-icon.svg" alt="lock" />
              <input
                type="text"
                required
                autoComplete="none"
                className={styles.email}
                name="username"
                onChange={handleOnChange}
              />
            </div>
            <p className={styles.error}>{userNameErr}</p>
            <div>
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
              <a href="#">Quên mật khẩu?</a>
            </div>
            <button type="submit" className={styles.btn_login} onClick={(e)=>{
              loginWithPass();
              e.preventDefault();
            }}>
              Đăng nhập
            </button>
          </form>
          <div className={styles.other_login}></div>
          <div className={styles.social__share}>
            <div className={`${styles.social__share__item} ${styles.facebook}`}>
              <i className={styles.social__share__icon}>
                <img src="/assets/img/login/facebook.png" alt="fb" />
              </i>
              <span className={styles.social__share__text}>
                Đăng nhập bằng tài khoản Facebook
              </span>
            </div>
            <div className={`${styles.social__share__item} ${styles.twitter}`} onClick={() => {
                signInWithPopup(auth, provider)
                .then( async (result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  
                  // The signed-in user info.
                  
                  const user = result.user;
                  const token = await user.getIdToken();
                  console.log("token down" , token);
                  console.log(user);
                  setUserInfo(user);
                  await checkLoginGG(token);
                  setToken(token);
                  // ...
                }).catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.email;
                  // The AuthCredential type that was used.
                  const credential = GoogleAuthProvider.credentialFromError(error);
                  // ...
                });
              }}>
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
