import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import pes from "../signup-page/assets/pes.png";
import password from "../signup-page/assets/password.png";
import person from "../signup-page/assets/person.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [srn, setSrn] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const lclick = () => setAction("Login");
  const sclick = () => setAction("Sign Up");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (action === "Sign Up" && (name.trim() === "" || srn.trim() === "" || pass.trim() === "")) {
      setError("Please fill in all the details");
      return;
    }

    if (action === "Login" && (srn.trim() === "" || pass.trim() === "")) {
      setError("Please fill in all the details");
      return;
    }

    const srnRegex = /^PES2UG(1[5-9]|2[0-4])(CSE|ECE|AM)\d{3}$/;
    if (!srnRegex.test(srn)) {
      setError("Please fill in the right SRN");
      return;
    }

    navigate('./heropage/hero.js');
    // If all validations pass, you can submit the form or do further processing here
    console.log("Form submitted successfully");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={person} alt="" />
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="input">
            <img src={pes} alt="" />
            <input 
              type="text" 
              placeholder="SRN" 
              value={srn}
              onChange={(e) => setSrn(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password} alt="" />
            <input 
              type="password" 
              placeholder="Password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="submit-buttons">
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={lclick}
          >
            Login
          </div>
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={sclick}
          >
            Sign Up
          </div>
        </div>
      </form>
    </div>
  );
}