import React, { useState } from 'react';

const ProblemStats = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const totalProblems = 3269;
    const solvedProblems = 312;
    const attemptingProblems = 15;

    const easyProblems = { solved: 127, total: 821 };
    const mediumProblems = { solved: 153, total: 1712 };
    const hardProblems = { solved: 30, total: 736 };

    const easyProportion = (easyProblems.total / totalProblems) * 100;
    const mediumProportion = (mediumProblems.total / totalProblems) * 100;
    const hardProportion = (hardProblems.total / totalProblems) * 100;

    const easySolvedProportion = (easyProblems.solved / easyProblems.total) * easyProportion;
    const mediumSolvedProportion = (mediumProblems.solved / mediumProblems.total) * mediumProportion;
    const hardSolvedProportion = (hardProblems.solved / hardProblems.total) * hardProportion;

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className={`problem-stats-card ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="circular-progress">
                    <svg>
                        <circle cx="80" cy="70" r="56" strokeDasharray="226.2" strokeDashoffset="0" />
                        <circle cx="80" cy="70" r="56" strokeDasharray="226.2" strokeDashoffset={`-${226.2 - (226.2 * easyProportion) / 100}`} />
                        <circle cx="80" cy="70" r="56" strokeDasharray="226.2" strokeDashoffset={`-${226.2 - (226.2 * (easyProportion + mediumProportion)) / 100}`} />

                        <circle cx="80" cy="70" r="56" style={{ strokeDasharray: 226.2, strokeDashoffset: 226.2 - (226.2 * easySolvedProportion) / 100 }} />
                        <circle cx="80" cy="70" r="56" style={{ strokeDasharray: 226.2, strokeDashoffset: 226.2 - (226.2 * (easySolvedProportion + mediumSolvedProportion)) / 100 }} />
                        <circle cx="80" cy="70" r="56" style={{ strokeDasharray: 226.2, strokeDashoffset: 226.2 - (226.2 * (easySolvedProportion + mediumSolvedProportion + hardSolvedProportion)) / 100 }} />
                    </svg>
                    <div className="progress-text">
                        <h2>{solvedProblems}/{totalProblems}</h2>
                        <p>Solved</p>
                    </div>
                </div>
                <h3 style={{ fontWeight: '600' }}>{attemptingProblems} Attempting</h3>
            </div>

            <div className="difficulty-stats">
                <div className="difficulty-item easy">
                    <p>Easy</p>
                    <p>{easyProblems.solved}/{easyProblems.total}</p>
                </div>
                <div className="difficulty-item medium">
                    <p>Medium</p>
                    <p>{mediumProblems.solved}/{mediumProblems.total}</p>
                </div>
                <div className="difficulty-item hard">
                    <p>Hard</p>
                    <p>{hardProblems.solved}/{hardProblems.total}</p>
                </div>
            </div>
        </div>
    );
};

export default ProblemStats;
