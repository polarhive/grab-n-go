import "./hero_nav.css";

export default function Heronav() {
  return (
    <div className="h-nav">
      <div className="h-nav-logo">Grab n Go</div>
        <div className="auth-button">
          <button className="s-in">Sign In</button>
          <button className="reg">Register</button>
      </div>
    </div>
  );
}
