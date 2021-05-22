const firebaseConfig = {
    apiKey: "AIzaSyAWoRfQ5cfS4TaOQDTzATaXY1JxUzrtKtg",
    authDomain: "expenseapp-9f277.firebaseapp.com",
    projectId: "expenseapp-9f277",
    storageBucket: "expenseapp-9f277.appspot.com",
    messagingSenderId: "299148626160",
    appId: "1:299148626160:web:cf2f2e0c0f908835f41a35"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// console.log(firebase.app());

const db = firebase.firestore();