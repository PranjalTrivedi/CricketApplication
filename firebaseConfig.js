import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHSesQ7BqRXSpXjf8SfobTHaY5yG2OJiE",
  authDomain: "cricket-ed667.firebaseapp.com",
  projectId: "cricket-ed667",
  storageBucket: "cricket-ed667.firebasestorage.app",
  messagingSenderId: "638139218780",
  appId: "1:638139218780:web:7e0c687f6a3a5e30951f99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Use AsyncStorage to persist authentication state
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  popupRedirectResolver: undefined, // Fix possible error related to auth resolver
});

const db = getFirestore(app);

export { auth, db };
