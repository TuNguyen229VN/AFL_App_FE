
// import {initializeApp} from "firebase/app"
// import {getStorage} from  'firebase/storage'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
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
  const storage = firebase.storage();
  export {storage, firebase as default} ;

//   const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);