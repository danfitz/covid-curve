import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCqbuHv6z3EhAMab9KimE-Ub3K2LSt2k4w',
    authDomain: 'covidcurve.firebaseapp.com',
    databaseURL: 'https://covidcurve.firebaseio.com',
    projectId: 'covidcurve',
    storageBucket: 'covidcurve.appspot.com',
    messagingSenderId: '397422040538',
    appId: '1:397422040538:web:d2b1b9fa8da48d289fdce3',
    measurementId: 'G-PXKZXK1K2X'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const db = firebase.firestore()