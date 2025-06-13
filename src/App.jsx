import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "./firebase/auth/signUp";
import { SignIn } from "./firebase/auth/signIn";

function Home() {
  
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/signUp")}>Sign Up</button>
      <button onClick={() => navigate("/signIn")}>Sign In</button>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
