import firebase from "firebase/app";
import "firebase/firestore";
const env = process.env;

const firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_DATABASE_URL,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
  measurementId: env.REACT_APP_MEASUREMENT_ID,
};
const settings = {timestampsInSnapshots: true};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

window.firebase = firebase;

export default firebase;
