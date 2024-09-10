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

import useLenis from "../utils/CustomHooks/useLenis";

const LandingPage = ({ setIsAuthenticated }) => {
  useLenis();
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
            Ready to Code? Bring Your A-Game to CompileX!
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
              <Image src={Arena} />
            </div>
            <div className="card small-card">
              <Image src={Task} />
            </div>
          </div>

          <div className="second">
            <div className="card small-card">
              <Image src={Battleground} />
            </div>
            <div className="card medium-card">
              <Image src={Whiteboard} />
            </div>
          </div>

          <div className="card large-card">
            <Image src={Profile} />
          </div>
        </div>
      </section>

      {/* <div className="transparent-container"></div> */}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-left">
              <h2>We would love to hear from you.</h2>
              <p>
                Feel free to reach out if you want to collaborate with us, or
                simply have a chat.
              </p>
              <a href="#" className="cta-button">
                Become a Client <span>→</span>
              </a>
              <p className="footer-contact-email">info@compilex.com</p>
            </div>

            <div className="footer-right">
              <div className="footer-section contact-us">
                <h3>Contact Us</h3>
                <p>
                  Our Email:{" "}
                  <a href="mailto:info@compilex.com">contact@compilex.com</a>
                </p>
                <p>Our Phone: +91-7345532677</p>
                <p>Kanpur, India</p>
              </div>

              <div className="footer-section follow-us">
                <h3>Follow Us</h3>
                <a href="#">Github →</a>
                <a href="#">Linkedin →</a>
                <a href="#">Twitter →</a>
                <a href="#">Instagram →</a>
              </div>

              <div className="footer-section services">
                <h3>Meet The Team</h3>
                <a href="#">Rishabh Didwania</a>
                <a href="#">Sanat Kumar Mishra</a>
                <a href="#">Swapnil Gupta</a>
                <a href="#">About The Product</a>
                <a href="#">Docs</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2024 CompileX. All Rights Reserved.{" "}
              <a href="#">Privacy Policy</a>
            </p>
            <a href="#" className="back-to-top">
              Back to the top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
