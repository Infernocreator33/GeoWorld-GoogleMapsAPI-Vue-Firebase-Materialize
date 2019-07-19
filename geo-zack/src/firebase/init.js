  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB9l3rXVYgMyAtmnNXBA8qkPdhz2-nRwTg",
    authDomain: "geo-zack.firebaseapp.com",
    databaseURL: "https://geo-zack.firebaseio.com",
    projectId: "geo-zack",
    storageBucket: "",
    messagingSenderId: "428181040641",
    appId: "1:428181040641:web:2bfb0947b7efc883"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  export default firebaseApp.firestore()
