import { useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();

export function GoogleSignIn() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      console.log("✅ Signed in user:", user);
    } catch (error) {
      console.error("❌ Sign-in error:", error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
}
