import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from "firebase/messaging";
var firebaseConfig = {
  apiKey: "AIzaSyCYXpUYy_KK1FjtBjz19gY2QTWi4sBcsgU",
  authDomain: "amateurfoooballleague.firebaseapp.com",
  projectId: "amateurfoooballleague",
  storageBucket: "amateurfoooballleague.appspot.com",
  messagingSenderId: "765175452190",
  appId: "1:765175452190:web:3e01517d116d4777c9140f",
  measurementId: "G-7Z7LB0W52J",
};
// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const messaging = getMessaging(app);

export const getTokenFirebase = async () => {
  let currentToken = "";

  try {
    currentToken = await getToken(messaging, {
      vapidKey:
        "BH0CWH_6kUOnUoExjRuRYtZvlMySvJJqaHSJ2CPAoZsRCd7dzSlUhTD14oOk01fXdeoaBXJpNBm_oa9au1X8o5Q",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const db = getFirestore();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
export default app;
