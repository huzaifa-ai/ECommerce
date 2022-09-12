import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA2cPraRnOu13eZujKJSLJNaTLydl9TwM4',
  authDomain: 'mern-108a6.firebaseapp.com',
  projectId: 'mern-108a6',
  storageBucket: 'mern-108a6.appspot.com',
  messagingSenderId: '241821042289',
  appId: '1:241821042289:web:6af7a6f91c5a0fcf727dd0',
  measurementId: 'G-CGEV0Q38YH',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleauth = new firebase.auth.GoogleAuthProvider();
export { auth, googleauth };
