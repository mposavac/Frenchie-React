import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB83WLHsayKNa4pD_aZRuO7Bwk-owoUHc4',
  authDomain: 'frenchie-6b026.firebaseapp.com',
  databaseURL: 'https://frenchie-6b026.firebaseio.com',
  projectId: 'frenchie-6b026',
  storageBucket: 'frenchie-6b026.appspot.com',
  messagingSenderId: '780129257201',
  appId: '1:780129257201:web:31b314039374cb8bdc8b50',
  measurementId: 'G-S9061GRF4L',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
