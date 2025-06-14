import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "./firebase/auth/signUp";
import { SignIn } from "./firebase/auth/signIn";
import { GoogleSignIn } from "./firebase/auth/googleAuth";
import { Facebook } from "./firebase/auth/facebookAuth";
import { PhoneSignIn } from "./firebase/auth/phoneAuth";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/signUp")}>Sign Up</button>
      <button onClick={() => navigate("/signIn")}>Sign In</button>
      <button onClick={() => navigate("/phoneSignIn")}>Phone Sign In</button>
      <GoogleSignIn />
      <Facebook />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/phoneSignIn" element={<PhoneSignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
