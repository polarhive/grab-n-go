import "./navbar.css";

export default function Navbar() {
  return (
    <div className="nav">
      <div className="nav-logo">Grab&Go</div>
      <ul className="nav-list">
        <li>Home</li>
        <li>About</li>
        <li>Login</li>
        <li>Memu</li>
        <li className="cart">Cart 🛒</li>
      </ul>
    </div>
  );
}
