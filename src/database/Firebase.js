import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCEZogrC4g3IA2-2R5QC3pF7Luzry3nDns",
    authDomain: "reactproject-66fb1.firebaseapp.com",
    databaseURL: "https://reactproject-66fb1.firebaseio.com",
    projectId: "reactproject-66fb1",
    storageBucket: "reactproject-66fb1.appspot.com",
    messagingSenderId: "868292842145",
    appId: "1:868292842145:web:ae895c4ee31fe589"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
