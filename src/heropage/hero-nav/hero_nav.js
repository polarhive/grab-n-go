import { useNavigate } from "react-router-dom";
import "./hero_nav.css";
import { useState } from "react";

export default function Heronav() {

  const navigate = useNavigate();
  const [action,setAction] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // setError("");
    navigate('/signup-page/Login.js');
  }

  const handleSignUp = (s) => {
    s.preventDefault();
    // setError("");
    navigate('/signup-page/SignUp.js');
  }
      //   navigate('/signup-page/SignUp.js');


  return (
    <div className="h-nav">
      <div className="h-nav-logo">Grab n Go</div>
      <form onSubmit={handleLogin}>
        <div className="auth-button">
          <button className="login" onClick={handleLogin}>Login</button>
          <button className="signup" onClick={handleSignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
