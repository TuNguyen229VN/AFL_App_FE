import { useEffect, useState } from "react";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import app from "../firebase/firebase";

export default function useAuthListener() {
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
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [userGG, setUserGG] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  useEffect(() => {
    const listener = app.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUserGG(authUser);
      } else {
        setUserGG(null);
      }
    });

    return () => listener();
  }, []);
  return { user,userGG};
}
