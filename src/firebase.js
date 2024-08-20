// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import auth and GoogleAuthProvider

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9I0Mz8o57BkRgvJ2bEKeoK_Bw_m1pGLo",
  authDomain: "just650.firebaseapp.com",
  projectId: "just650",
  storageBucket: "just650.appspot.com",
  messagingSenderId: "1028333562240",
  appId: "1:1028333562240:web:971023d04b8e3ccd4a7965",
  measurementId: "G-HN3YD6FG8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export the auth and googleProvider
export { auth, googleProvider };
//