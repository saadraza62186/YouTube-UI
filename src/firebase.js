import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyB1uIKxVGt8Txag8FxFxBjn_vBZD7e9cAg",
  authDomain: "video-62186.firebaseapp.com",
  projectId: "video-62186",
  storageBucket: "video-62186.firebasestorage.app",
  messagingSenderId: "706996946087",
  appId: "1:706996946087:web:33fe4e0de5127cc7968782",
  measurementId: "G-3651C0DL35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app;