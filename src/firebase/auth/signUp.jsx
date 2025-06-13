import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRef } from "react";

function signupUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function SignUp(){

  const emailRef = useRef();
  const passRef = useRef();

  const handleSignup = async () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;

    try {
      const userCredential = await signupUser(email, password); // corrected
      console.log("User created:", userCredential.user);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

return (
    <>
      <input placeholder='Email' ref={emailRef} />
      <input placeholder='Password' type="password" ref={passRef} />
      <button onClick={handleSignup}>Submit</button>
    </>
  );

}