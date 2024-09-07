import React, { useState } from "react";

const Features = () => {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setGlowPosition({ x, y });
  };

  return (
    <div
      className="features"
      onMouseMove={handleMouseMove}
      style={{ position: "relative" }}
    >
      <div
        className="glow-effect"
        style={{
          top: `${glowPosition.y}px`,
          left: `${glowPosition.x}px`,
        }}
      />
      <div className="first-row">
        <div id="first">
          <div className="content-wrapper">
            <h3>Compilex</h3>
            <p>
              Face off against coders worldwide in real-time coding battles.
              Show them who’s the real ‘script’ master!
            </p>
          </div>
          <div className="btn-bg">
            <button>Register Now</button>
          </div>
        </div>
        <div id="second">
          <h3>Battles & Global Leaderboards</h3>
          <p>
            Climb the ranks and see how you stack up against the competition.
            Bragging rights included.
          </p>
        </div>
        <div id="third">
          <h3>Code Playground</h3>
          <p>
            Need to warm up before the big battle? Our playground is packed with
            challenges to sharpen your skills.
          </p>
        </div>
      </div>
      <div className="second-row">
        <div id="first">
          <h3>Statistics</h3>
          <p>
            Track your coding progress with detailed statistics and insights.
          </p>
        </div>
        <div id="second">
          <div className="content-wrapper">
            <h3>Whiteboard</h3>
            <p>
              Collaborate and sketch out your ideas visually with our integrated
              whiteboard. Collaborate and sketch out your ideas visually with
              our integrated whiteboard.
            </p>
          </div>
          <div className="btn-bg">
            <button>Try now</button>
          </div>
        </div>
        <div id="third">
          <h3>Tasks Manager</h3>
          <p>
            Organize your projects and tasks with our built-in task management
            system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
