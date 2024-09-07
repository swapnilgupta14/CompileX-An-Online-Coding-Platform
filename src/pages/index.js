import React from "react";
import Image from "next/image";
import AppPreview from "/public/assets/AppPreview.png";
import { useRouter } from "next/router";

import Features from "../components/Landing/Features";
import Navbar from "../components/Landing/Navbar";

const LandingPage = ({ setIsAuthenticated }) => {
  const router = useRouter();
  const dummyToken = "duywedywjbdgdywgydugwdvdhed";

  const handleSignIn = () => {
    alert("Signing in with a dummy token for demo purposes.");
    localStorage.setItem("authToken", dummyToken);
    setIsAuthenticated(true);
    router.push("/Home");
  };

  return (
    <div className="landing-container">
      {/* Jii haan navbar hai ye */}
      <div className="header">
        <Navbar handleSignIn={handleSignIn} />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title header--shadow">
            Ready to Code? Bring Your A-Game to Compilex!
          </h1>
          <p className="hero-subtitle">
            Where code battles, leaderboards, and problem-solving prowess come
            together. Join now and level up your coding skills!
          </p>
        </div>
        <div className="faded-utility-wrapper">
          <div className="app-preview">
            <Image src={AppPreview}></Image>
          </div>
          <div className="empty-div"></div>
        </div>
      </section>

      {/* Feature Section */}
      <h1 className="section-title">Why Compilex?</h1>
      <section className="features-section">
        <Features />
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2 className="cta-title">
          What are you waiting for? Dive into the Code!
        </h2>
        <p className="cta-subtitle">
          Join Compilex today and start your journey towards coding greatness.
          It’s time to level up!
        </p>
        <button className="cta-button-large">Join the Battle</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Support</a>
          </div>
          <div className="footer-social">
            <img src="/images/icon-twitter.png" alt="Twitter" />
            <img src="/images/icon-facebook.png" alt="Facebook" />
            <img src="/images/icon-github.png" alt="GitHub" />
          </div>
          <p className="footer-copyright">
            © 2024 Compilex. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
