import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBqLECRAEaO9Ior1S4V5rmFkEBI8sIkjCc",
  authDomain: "create-react-app-76517.firebaseapp.com",
  databaseURL: "https://create-react-app-76517.firebaseio.com",
  projectId: "create-react-app-76517",
  storageBucket: "create-react-app-76517.appspot.com",
  messagingSenderId: "143771104679",
  appId: "1:143771104679:web:7b94a98b13cc1b89653282",
  measurementId: "G-1BPH3PCRQE"
};

firebase.initializeApp(firebaseConfig);
export default firebase;