import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProblemAPI from '../utils/ProblemAPI';
import { QUESTION_DIFFICULTY } from '../utils/Static';
import path from 'path';
import Header from '../components/common/Header';
import { FaCode, FaTasks, FaUser, FaCog, FaGamepad } from 'react-icons/fa';
import ProblemStats from '../components/common/ProblemStats';

const Home = () => {
  const [questionArr, setQuestionArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ProblemAPI.problemGet().then((data) => {
      setQuestionArr(data.responseData.results);
      setIsLoading(false);
    });
  }, []);


  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>
      <div className='home-content'>
        <HomeSection title="Problems" />
        <ProblemList questionArr={questionArr} isLoading={isLoading} />
      </div>
    </div>
  );
};

const ProblemList = ({ questionArr, isLoading }) => {
  const columnAttributes = ["Problem Title", "Actions"];


  const HomeCards = [
    {
      title: "Arena",
      path: '/Arena/p_b8128f2286de1f731211bccbd0463786',
      Icon: <FaCode />,
      Description: 'Solve DSA problems and enhance your skills',
      bg: '#FFD199',
    },
    {
      title: "Battleground",
      path: '/Battleground/Battles',
      Icon: <FaGamepad />,
      Description: 'Battle with others and improve your ranking & skills',
      bg: '#D6EBAD',
    },
    {
      title: "Playground",
      path: '/Editor',
      Icon: <FaCog />,
      Description: 'Practice coding with various languages with the code editor',
      bg: '#F19499',
    }
  ];

  return (
    <div className='problem-home-container'>
      <div className='home-cards'>
        {HomeCards.map((card, index) => (
          <Link key={index} href={card.path}>
            <div className='card' style={{ background: card.bg }}>
              <div className='card-content'>
                <h3>{card.title}</h3>
                <p>{card.Description}</p>
              </div>
              <div className='card-icon'>
                {card.Icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="problem-list">
        <div className='problem-bar'>
          {columnAttributes.map((it, index) => (
            <div key={index} className='attribute'>
              {it}
            </div>
          ))}
        </div>
        {questionArr.length !== 0 ? (
          questionArr.map((question, index) => (
            <div className="problem-header">
              <div className="problem-info">
                <span>{index + 1 + ". "}</span> <span>{" "}</span>
                <span className="problem-title">{question.p_title}</span>
              </div>
              <div className="problem-actions">
                <span className={`difficulty-badge ${QUESTION_DIFFICULTY[question.p_difficulty].style}`}>
                  {QUESTION_DIFFICULTY[question.p_difficulty].Title}
                </span>
                <Link href={`Arena/${question.p_id}`} className="solve-link">
                  Solve Problem
                </Link>
              </div>
            </div>))
        ) : isLoading ? (
          <div className="loading-container">
            <span>Loading</span>
          </div>
        ) : (
          <div className="no-questions-container">
            <span>No questions to show</span>
          </div>
        )}
      </div>
    </div>
  );
};

const HomeSection = () => {

  const renderCalendarDays = () => {
    let days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(<div key={i} className="day">{i}</div>);
    }
    return days;
  };

  const tasks = [
    {
      title: 'Finish React Component',
      description: 'Finish the component for the dashboard',
    },
    {
      title: 'Update Documentation',
      description: 'Update the documentation for the project',
    },
    {
      title: 'Meet with Design Team',
      description: 'Meet with the design team to discuss the new project',
    },
  ];

  return (
    <div className='home-section-wrapper'>
      <div className='user-stats'>
        <>
          <h4>Total Problem Solved</h4>
          <ProblemStats />
        </>
      </div>
      <div className='home-section'>
        <div className='calendar'>
          <h4>Calendar</h4>
          <div className="calendar-grid">
            {renderCalendarDays()}
          </div>
        </div>
        <div className='lists'>
          <h4>Tasks</h4>
          {
            tasks.map((task, index) => (
              <div key={index} className="task-card">
                {/* <h4>{task.title}</h4> */}
                <p>{task.title}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
