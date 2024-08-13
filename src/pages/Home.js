import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProblemAPI from '../utils/ProblemAPI';
import { QUESTION_DIFFICULTY } from '../utils/Static';

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
        <h1 className="header-title">Compilex - </h1>
        <p className="header-subtitle">Solve challenges, enhance your skills</p>
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

  return (
    <div className='problem-home-container'>
      <div className="problem-list">
        <div className='problem-bar'>
          {columnAttributes.map((it, index) => (
            <div key={index} className='attribute'>
              {it}
            </div>
          ))}
        </div>
        {questionArr.length !== 0 ? (
          questionArr.map((question) => (
            <div className="problem-header">
              <div className="problem-info">
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

  return (
    <div className='home-section-wrapper'>
      <div className='user-stats'>
        <div className="stat-card">
          <h4>Total Logins</h4>
          <p>150</p>
        </div>
        <div className="stat-card">
          <h4>Projects Completed</h4>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h4>Active Sessions</h4>
          <p>3</p>
        </div>
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
          <div className="task-card">
            <p>Finish React Component</p>
          </div>
          <div className="task-card">
            <p>Update Documentation</p>
          </div>
          <div className="task-card">
            <p>Meet with Design Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
