import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxNJVo1PuCl7ytKwJy8koS6ZEWTaMoRnc",
    authDomain: "open-source-hr.firebaseapp.com",
    projectId: "open-source-hr",
    storageBucket: "open-source-hr.firebasestorage.app",
    messagingSenderId: "437994091331",
    appId: "1:437994091331:web:c5fb66d5842b1e20ed35f6",
    measurementId: "G-XFPCDNJ3F1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User logged in:", result.user); // ✅ Debugging Log
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert(`Login failed: ${error.message}`);
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, signInWithGoogle, logout };
