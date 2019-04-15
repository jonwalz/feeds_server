const firebase = require("firebase-admin");
import serviceAccount from "./mixcloud-favorites-firebase";

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount as object),
    databaseURL: "https://mixcloud-favorites.firebaseio.com",
});

export default firebase;
