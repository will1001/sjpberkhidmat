importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDozc7sXqMlWtp8BsuybwLKfO6FaP5nqKk",
    authDomain: "sjpberkhidmat-8fcb3.firebaseapp.com",
    projectId: "sjpberkhidmat-8fcb3",
    storageBucket: "sjpberkhidmat-8fcb3.appspot.com",
    messagingSenderId: "719390179751",
    appId: "1:719390179751:web:6d27d013a8741c42207682",
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});