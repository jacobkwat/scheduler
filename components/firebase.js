import * as firebase from 'firebase';

import "firebase/database";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAaJO0m_RA0eg-xT55ix_lOKJwn-rj-T48",
    authDomain: "scheduler-7f187.firebaseapp.com",
    databaseURL: "https://scheduler-7f187-default-rtdb.firebaseio.com",
    projectId: "scheduler-7f187",
    storageBucket: "scheduler-7f187.appspot.com",
    messagingSenderId: "791995858704",
    appId: "1:791995858704:web:7ef6adac8243b32f95ef95",
    measurementId: "G-SGN1Q45N3Y"
};

firebase.initializeApp(firebaseConfig);

export default firebase;