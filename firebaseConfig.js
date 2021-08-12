// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA13FwGJ6i-lo2Ocb6-fZtGn_C6j0OqgCQ",
    authDomain: "scnufood-4f431.firebaseapp.com",
    databaseURL: "https://scnufood-4f431-default-rtdb.firebaseio.com",
    projectId: "scnufood-4f431",
    storageBucket: "scnufood-4f431.appspot.com",
    messagingSenderId: "218477231195",
    appId: "1:218477231195:web:bdfef738ef9efe95ec537e",
    //measurementId: "G-R90KJ8X3YK"
};

firebase.initializeApp(firebaseConfig);

export default firebase;