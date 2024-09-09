import React from "react";
import Image from "next/image";
import AppPreview from "/public/assets/AppPreview.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Features from "../components/Landing/Features";
import Navbar from "../components/Landing/Navbar";

import Arena from "/public/assets/Arena.png";
import Task from "/public/assets/Task.png";
import Battleground from "/public/assets/Battleground.png";
import Whiteboard from "/public/assets/Whiteboard.png";
import Profile from "/public/assets/Profile.png";

const LandingPage = ({ setIsAuthenticated }) => {
  const [fontSize, setFontSize] = useState(3);
  const router = useRouter();
  const dummyToken = "duywedywjbdgdywgydugwdvdhed";

  const handleSignIn = () => {
    alert("Signing in with a dummy token for demo purposes.");
    localStorage.setItem("authToken", dummyToken);
    setIsAuthenticated(true);
    router.push("/Home");
  };

  useEffect(() => {
    const sectionTitle = document.querySelector(".sectionTitle");
    const originalFontSize = 3;

    let isInView = false;
    let lastScrollPos = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInView = entry.isIntersecting;
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(sectionTitle);

    const handleScroll = () => {
      const rect = sectionTitle.getBoundingClientRect();
      console.log(rect);
      const scrollPos = window.scrollY;

      if (isInView) {
        let newFontSize = originalFontSize + scrollPos / 500;
        newFontSize = Math.min(newFontSize, originalFontSize + 4);
        setFontSize(newFontSize);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="landing-container">
      <div className="header">
        <Navbar handleSignIn={handleSignIn} />
      </div>

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

      <div className="sectionTitle">
        <h1 className="sectionHeader" style={{ fontSize: `${fontSize}rem` }}>
          Why CompileX?
        </h1>
        <p className="section-para">
          Where bugs meet their worst nightmare, and coders become legends (or
          at least, slightly less frustrated). Ready for some code-crushing
          action?
        </p>
      </div>

      <section className="features-section">
        <Features />
        <div className="features-bg-shapes">
          <div className="first">
            <div className="second">
              <div className="third"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="product-section-header">
        <h1 className="sectionHeader" style={{ fontSize: `${fontSize}rem` }}>
          What are you waiting for? Dive into the Code!
        </h1>
      </div>

      <section className="cta-products">
        <div className="layout-container">
          <div className="first">
            <div className="card medium-card">
              <Image src={Arena} layout="responsive" />
            </div>
            <div className="card small-card">
              <Image src={Task} layout="responsive" />
            </div>
          </div>

          <div className="second">
            <div className="card small-card">
              <Image src={Battleground} layout="responsive" />
            </div>
            <div className="card medium-card">
              <Image src={Whiteboard} layout="responsive" />
            </div>
          </div>

          <div className="card large-card">
            <Image src={Profile} layout="responsive" />
          </div>
        </div>
      </section>

      {/* <div className="transparent-container"></div> */}

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
