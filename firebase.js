import firebase from 'firebase-admin';

var serviceAccount = require('./mixcloud-favorites-firebase.js');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://mixcloud-favorites.firebaseio.com'
});

module.exports = firebase;
