import React from "react";
import Heronav from "./Hero_nav.js";
import "./Hero.css";

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
