import React from "react";
import ReactDOM from "react-dom/client";
import Heronav from "./hero-nav/hero_nav.js";
import "./hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {

  return (
    <>
      <Heronav />
      <div className="middle">
        <div className="content">
            <h1>Grab n Go</h1>
            <p>Order Ahead, Grab with Friends - That's Grab n Go!</p>
        </div>
      </div>
    </>
  );
}
