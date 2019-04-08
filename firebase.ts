import firebase from "firebase-admin";

import serviceAccount from "./mixcloud-favorites-firebase.js";

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://mixcloud-favorites.firebaseio.com'
});

export default firebase;
