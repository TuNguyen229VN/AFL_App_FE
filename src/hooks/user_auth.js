import { useEffect,useState } from "react";
import "firebase/compat/auth";

export default function useAuthListener() {
    // const firebaseConfig = {
    //     apiKey: "AIzaSyCYXpUYy_KK1FjtBjz19gY2QTWi4sBcsgU",
    //     authDomain: "amateurfoooballleague.firebaseapp.com",
    //     databaseURL: "gs://amateurfoooballleague.appspot.com",
    //     projectId: "amateurfoooballleague",
    //     storageBucket: "amateurfoooballleague.appspot.com",
    //     messagingSenderId: "765175452190",
    //     appId: "1:765175452190:web:3e01517d116d4777c9140f",
    //     measurementId: "G-7Z7LB0W52J",
    //   };
    
    //   firebase.initializeApp(firebaseConfig);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
//   useEffect(() => {
//     const listener = firebase.auth().onAuthStateChanged((authUser) => {
//       if (authUser) {
//         localStorage.setItem("authUser", JSON.stringify(authUser));
//         setUser(authUser);
//       } else {
//         localStorage.removeItem("authUser");
//         setUser(null);
//       }
//     });

//     return () => listener();
//   }, []);
  return { user };
}
