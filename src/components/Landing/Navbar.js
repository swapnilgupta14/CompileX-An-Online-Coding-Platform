import React from "react";
import Logo from "/public/assets/Logo(1).png";
import Image from "next/image";

const Navbar = ({handleSignIn}) => {
  return (
    <nav className="navbar-landing">
      <div className="logo">
        <Image src={Logo} alt="logo" className="w-9 h-8" draggable="false" />
        Compilex
      </div>
      <ul className="nav-links with-border">
        <li>Product</li>
        <li>Features</li>
        <li>Whiteborad</li>
        <li>About Us</li>
        <li className="cta-pricing">Premium</li>
      </ul>
      <ul className="nav-links button-wrapper">
        <button onClick={handleSignIn} className="cta-login">
          Sign In
        </button>
        <button
          onClick={() => localStorage.setItem("authToken", dummyToken)}
          className="cta-login"
        >
          Register
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
