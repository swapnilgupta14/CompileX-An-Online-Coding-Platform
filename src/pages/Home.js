import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ProblemAPI from "../utils/ProblemAPI";
import { QUESTION_DIFFICULTY } from "../utils/Static";
import path from "path";
import Header from "../components/common/Header";
import { FaCode, FaTasks, FaUser, FaCog, FaGamepad } from "react-icons/fa";
import ProblemStats from "../components/common/ProblemStats";
import { ArrowIcon, ExpandIcon, PlusIcon, TrashIcon } from "../assets/icon";
import Calender from "../components/Calender";

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
      <div className="home-content">
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
      path: "/Arena/p_b8128f2286de1f731211bccbd0463786",
      Icon: <FaCode />,
      Description: "Solve DSA problems and enhance your skills",
      bg: "#FFD199",
    },
    {
      title: "Battleground",
      path: "/Battleground/Battles",
      Icon: <FaGamepad />,
      Description: "Battle with others and improve your ranking & skills",
      bg: "#D6EBAD",
    },
    {
      title: "Playground",
      path: "/Editor",
      Icon: <FaCog />,
      Description:
        "Practice coding with various languages with the code editor",
      bg: "#F19499",
    },
  ];

  return (
    <div className="problem-home-container">
      <div className="home-cards">
        {HomeCards.map((card, index) => (
          <Link key={index} href={card.path}>
            <div className="card" style={{ background: card.bg }}>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.Description}</p>
              </div>
              <div className="card-icon">{card.Icon}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="problem-list">
        <div className="problem-bar">
          {columnAttributes.map((it, index) => (
            <div key={index} className="attribute">
              {it}
            </div>
          ))}
        </div>
        {questionArr.length !== 0 ? (
          questionArr.map((question, index) => (
            <div className="problem-header">
              <div className="problem-info">
                <span>{index + 1 + ". "}</span> <span> </span>
                <span className="problem-title">{question.p_title}</span>
              </div>
              <div className="problem-actions">
                <span
                  className={`difficulty-badge ${QUESTION_DIFFICULTY[question.p_difficulty].style
                    }`}
                >
                  {QUESTION_DIFFICULTY[question.p_difficulty].Title}
                </span>
                <Link href={`Arena/${question.p_id}`} className="solve-link">
                  Solve Problem
                </Link>
              </div>
            </div>
          ))
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
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const [tasks, setTasks] = useState([
    { title: 'Learn TypeScript', description: 'Complete the assignment given by the mentor' },
    { title: 'Learn WebSockets', description: 'ncjdc ' },
    { title: 'Complete Task 1 & 2', description: 'ncjdc ' },
  ]);

  const renderCalendarDays = () => {
    let days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(
        <div key={i} className="day">
          {i}
        </div>
      );
    }
    return days;
  };

  const handleTitleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim() === '') return;
    setTasks([...tasks, newTask]);
    setNewTask({ title: '' });
    setIsAddingTask(false);
  };


  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  return (
    <div className="home-section-wrapper">
      <div className="home-section">
        <div className="calendar">
          <div className="calender-header">
            <h4>Calender</h4>
            {/* <Link href={`/Profile/swapnilgupta14`}>
              {" "}
              <ArrowIcon width={22} height={22} color={"#0066ff"} />
            </Link> */}
          </div>
          <div className="calendar-grid">
            <Calender />
          </div>
        </div>
        <div className="task-list-container">
          <div className={`tasks ${isAddingTask ? 'adding-task' : ''}`}>
            {!isAddingTask ? (
              <>
                <div className="tasks-header">
                  <h4>Daily Tasks</h4>
                  <span
                    onClick={() => setIsAddingTask(true)}
                  >
                    <PlusIcon width={22} height={22} color="#0066ff" />
                  </span>
                </div>
                <div className="tasks-content">
                  {tasks.map((task, index) => (
                    <div key={index} className="task-card">
                      <h3>{task.title}</h3>
                      <div className="delete-icon" onClick={() => handleDeleteTask(index)}><TrashIcon width={14} height={16} /></div>
                    </div>
                  ))}
                  <p className="more-text">More...</p>
                </div>
              </>
            ) : (
              <>
                <div className="tasks-header">
                  <h4>Add a task</h4>
                </div>
                <form className="add-task-form" onSubmit={handleAddTask}>
                  <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newTask.title}
                      onChange={handleTitleChange}
                      placeholder="Enter title"
                      required
                    />
                    <label htmlFor="title">Task Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={newTask.description}
                      onChange={handleDescriptionChange}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="add-button">
                      <PlusIcon width={16} height={16} color="#fff" />
                      Add Task
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setIsAddingTask(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="user-stats">
        <>
          <div className="user-stats-header">
            <h4>Total Problem Solved</h4>
            <Link href={`/Profile/swapnilgupta14`}>
              {" "}
              <ArrowIcon width={22} height={22} color={"#0066ff"} />
            </Link>
          </div>
          <ProblemStats />
        </>
      </div>
    </div>
  );
};

export default Home;
