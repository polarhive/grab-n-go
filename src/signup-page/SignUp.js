import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../signup-page/SignUp.css";
import pes from "../signup-page/assets/pes.png";
import password from "../signup-page/assets/password.png";
import person from "../signup-page/assets/person.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [srn, setSrn] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (name.trim() === "" || srn.trim() === "" || pass.trim() === "") {
      alert("Please fill in all the details");
      return;
    }

    const srnRegex = /^PES2UG(1[5-9]|2[0-4])(CS|ECE|AM)\d{3}$/;
    if (!srnRegex.test(srn)) {
      alert("Please fill in the right SRN");
      return;
    }

    navigate('/heropage/hero.js');
    console.log("Sign-up form submitted successfully");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={person} alt="" />
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
        <div className="submit-container">
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}