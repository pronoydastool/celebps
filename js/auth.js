// js/auth.js

// IMPORTANT: PASTE YOUR FIREBASE CONFIG OBJECT HERE
const firebaseConfig = {
  apiKey: "AIzaSyD7neq3mrHHDPNbUza1eVPcpi59wbjW9uo",
  authDomain: "unit-convarator-f7f67.firebaseapp.com",
  databaseURL: "https://unit-convarator-f7f67-default-rtdb.firebaseio.com",
  projectId: "unit-convarator-f7f67",
  storageBucket: "unit-convarator-f7f67.firebasestorage.app",
  messagingSenderId: "563150242024",
  appId: "1:563150242024:web:f88a27df0d2e0f2bd9095d",
  measurementId: "G-QV9QS91E12"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp(email, password, displayName) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // After user is created, update their profile with the display name
            return userCredential.user.updateProfile({
                displayName: displayName
            });
        });
}

function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

function logOut() {
    return auth.signOut();
}

function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

function getCurrentUser() {
    return auth.currentUser;
}
