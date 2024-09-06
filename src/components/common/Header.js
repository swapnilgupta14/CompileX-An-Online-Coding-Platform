import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Handle Dark Mode Toggle and Persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else if (systemPrefersDark) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userName = "swapnilgupta14";

  const handleRouteToProfile = () => {
    router.push(`/Profile/${userName}`);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/Battleground/Battles">Battles</a>
        </li>
        <li>
          <a href="#">Leaderboard</a>
        </li>
        <li>
          <a href="#">Store</a>
        </li>
      </ul>
      <div className="nav-actions">
        <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
          {darkMode ? "🌞 Light Mode" : "🌜 Dark Mode"}
        </button>
        <div className="profile" onClick={toggleDropdown}>
          <Image
            src="/images/profile-pic.png"
            alt="profile"
            width={40}
            height={40}
            className="profile-pic"
          />
        </div>
        {isDropdownOpen && (
          <div
            className={`dropdown-overlay ${isDropdownOpen ? "visible" : ""}`}
          >
            <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
              <div className="user-info">
                <Image
                  src="/images/profile-pic.png"
                  alt="profile"
                  width={60}
                  height={60}
                  className="dropdown-profile-pic"
                  onClick={handleRouteToProfile}
                />
                <div className="user-details">
                  <span className="user-name">Swapnil Gupta</span>
                  <button
                    className="close-button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="dropdown-links">
                <div className="dropdown-item">
                  <a href="#">My Lists</a>
                </div>
                <div className="dropdown-item">
                  <Link href="https://chalkpad-web.vercel.app/">
                    Whiteboard
                  </Link>
                </div>
                <div className="dropdown-item">
                  <a href="#">Submissions</a>
                </div>
                <div className="dropdown-item">
                  <a href="#">Points</a>
                </div>
                <div className="dropdown-item">
                  <button
                    className="signout-btn"
                    onClick={() => alert("Soon to be available")}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
