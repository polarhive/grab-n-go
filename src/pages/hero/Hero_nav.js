import { useNavigate } from "react-router-dom";
import "./Hero_nav.css";

export default function Heronav() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/auth/Login.js');
  }

  const handleSignUp = (s) => {
    s.preventDefault();
    navigate('/auth/SignUp.js');
  }

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
