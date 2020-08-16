import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA8jfAd-4WdUtf9tUKdaavw7fwO64Btafw",
    authDomain: "test-ec924.firebaseapp.com",
    databaseURL: "https://test-ec924.firebaseio.com",
    projectId: "test-ec924",
    storageBucket: "test-ec924.appspot.com",
    messagingSenderId: "203164576120",
    appId: "1:203164576120:web:4d4488b217a977fefac08d"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();
export const firestore = firebase.firestore();