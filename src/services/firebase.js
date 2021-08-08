import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
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
const settings = { timestampsInSnapshots: true };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().settings(settings);

window.firebase = firebase;
export const firestore = firebase.firestore();
export const auth = firebase.auth();

firestore.enablePersistence().catch(function (err) {
  if (err.code === "failed-precondition") {
    console.log("persistance failed");
  } else if (err.code === "unimplemented") {
    console.log("persistance not available");
  }
});

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch((error) => {
    console.log("setPersistence error", error);
  });

export const provider = new firebase.auth.GoogleAuthProvider();
export const firebaseSignWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};
export const firebaseSignOut = (
  callback = () => {},
  errorCallback = () => {}
) => {
  auth
    .signOut()
    .then(() => {
      console.log("Sign-out successful.");

      callback();
    })
    .catch((error) => {
      console.log("An error happened.");
      errorCallback();
    });
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return getUserDocument(user.uid);
};

export default firebase;
