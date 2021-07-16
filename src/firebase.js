import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCennm_8497jB1j1sH-0mSx5E7Tn-CzIt8",
    authDomain: "linked-in-clone-d570f.firebaseapp.com",
    projectId: "linked-in-clone-d570f",
    storageBucket: "linked-in-clone-d570f.appspot.com",
    messagingSenderId: "507848342760",
    appId: "1:507848342760:web:99a82ae76999da437c9d5d",
    measurementId: "G-3Y1DX5KX0J"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();

  const auth=firebase.auth();

  const provider=new firebase.auth.GoogleAuthProvider();

  const storage=firebase.storage();

  export {auth,provider,storage};
  export default db;
