import "./navbar.css";

export default function Navbar() {
  return (
    <div className="nav">
      <div className="nav-logo">Grab&Go</div>
      <div className="nav-buttons">
        <button>Home</button>
        <button>About</button>
        <button>Login</button>
        <button>Menu</button>
        <button className="cart">Cart 🛒</button>
      </div>
    </div>
  );
}
