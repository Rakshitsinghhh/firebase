import { useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, FacebookAuthProvider  } from "firebase/auth";


const provider = new FacebookAuthProvider ();

export function Facebook() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new FacebookAuthProvider ());
      const user = result.user;
      console.log("✅ Signed in user:", user);
    } catch (error) {
      console.error("❌ Sign-in error:", error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Facebook</button>;
}
