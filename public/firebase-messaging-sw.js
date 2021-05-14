//file for firebase service worker register


//scripts for firebase cdn
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAxO8V_p9s6BWXF6PhYS6uagXkW68qn3x0",
  authDomain: "quiz-app-9e939.firebaseapp.com",
  projectId: "quiz-app-9e939",
  storageBucket: "quiz-app-9e939.appspot.com",
  messagingSenderId: "145459099500",
  appId: "1:145459099500:web:2968bbb7526c3f56212549"
  })

 firebase.messaging()