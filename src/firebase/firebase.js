import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDozc7sXqMlWtp8BsuybwLKfO6FaP5nqKk",
  authDomain: "sjpberkhidmat-8fcb3.firebaseapp.com",
  projectId: "sjpberkhidmat-8fcb3",
  storageBucket: "sjpberkhidmat-8fcb3.appspot.com",
  messagingSenderId: "719390179751",
  appId: "1:719390179751:web:6d27d013a8741c42207682",
};

export const app = initializeApp(firebaseConfig);

// export const messaging = getMessaging(app);
