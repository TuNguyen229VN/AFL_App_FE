// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCYXpUYy_KK1FjtBjz19gY2QTWi4sBcsgU",
  authDomain: "amateurfoooballleague.firebaseapp.com",
  projectId: "amateurfoooballleague",
  storageBucket: "amateurfoooballleague.appspot.com",
  messagingSenderId: "765175452190",
  appId: "1:765175452190:web:3e01517d116d4777c9140f",
  measurementId: "G-7Z7LB0W52J",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    // eslint-disable-next-line no-console
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title||'';
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/AFL.jpg",
    };

    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(notificationTitle, notificationOptions);
});
