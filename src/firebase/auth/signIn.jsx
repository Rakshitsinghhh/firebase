import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRef } from "react";

function signinUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function SignIn(){

  const emailRef = useRef();
  const passRef = useRef();

  const handleSignin = async () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;

    try {
      const userCredential = await signinUser(email, password); // corrected
      console.log("User created:", userCredential.user);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

return (
    <>
      <input placeholder='Email' ref={emailRef} />
      <input placeholder='Password' type="password" ref={passRef} />
      <button onClick={handleSignin}>Submit</button>
    </>
  );

}