import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  // Dummy Data
  const userData = {
    name: "Swapnil Gupta",
    image: "/path-to-dummy-image.jpg",
    currentRole: "Student",
    college: "PSIT",
    location: "Kanpur, India",
    currentStats: {
      rank: 42,
      globalRanking: "Top 1%",
      totalPoints: 1250,
      contestsParticipated: 15,
      contestsWon: 5,
    },
    submissionStats: {
      totalSubmissions: 450,
      totalProblemsSolved: 175,
      successRate: 0.389,
      problemsSolvedByDifficulty: {
        easy: 100,
        medium: 60,
        hard: 15,
      },
    },
    badges: [
      { name: "JavaScript Guru", level: 5 },
      { name: "Problem Solver", level: 4 },
      { name: "Speed Coder", level: 3 },
      { name: "React Expert", level: 4 },
      { name: "Algorithm Master", level: 5 },
    ],
    recentSubmissions: [
      {
        id: 1,
        title: "Two Sum",
        status: "Accepted",
        time: "2 days ago",
        language: "JavaScript",
        runtime: "56ms",
      },
      {
        id: 2,
        title: "Binary Search",
        status: "Accepted",
        time: "3 days ago",
        language: "Python",
        runtime: "48ms",
      },
      {
        id: 3,
        title: "Palindrome Number",
        status: "Accepted",
        time: "5 days ago",
        language: "Java",
        runtime: "120ms",
      },
      {
        id: 4,
        title: "Merge Intervals",
        status: "Accepted",
        time: "7 days ago",
        language: "C++",
        runtime: "32ms",
      },
      {
        id: 5,
        title: "Longest Substring Without Repeating Characters",
        status: "Accepted",
        time: "9 days ago",
        language: "JavaScript",
        runtime: "68ms",
      },
    ],
    contestPerformance: [
      {
        contestName: "LeetCode Weekly Contest 200",
        rank: 20,
        problemsSolved: 3,
        totalPoints: 150,
      },
      {
        contestName: "Codeforces Round 725",
        rank: 35,
        problemsSolved: 4,
        totalPoints: 180,
      },
      {
        contestName: "HackerRank Week of Code 40",
        rank: 10,
        problemsSolved: 5,
        totalPoints: 200,
      },
    ],
    favoriteTopics: [
      "Dynamic Programming",
      "Graph Theory",
      "Binary Search",
      "Two Pointers",
      "Sorting Algorithms",
    ],
    connectedAccounts: {
      github: "https://github.com/johndoe",
      linkedin: "https://www.linkedin.com/in/johndoe",
      leetcode: "https://leetcode.com/johndoe",
      codeforces: "https://codeforces.com/profile/johndoe",
      hackerrank: "https://www.hackerrank.com/johndoe",
    },
    timeline: [
      {
        date: "2024-08-20",
        event: "Promoted to Senior Software Engineer",
      },
      {
        date: "2024-07-10",
        event: "Won 1st place in LeetCode Weekly Contest 200",
      },
      {
        date: "2024-05-15",
        event: "Reached Top 1% in Global Ranking",
      },
      {
        date: "2023-11-05",
        event: "Started working at ABC Corp",
      },
      {
        date: "2023-09-20",
        event: "Completed 100th Problem on LeetCode",
      },
    ],
  };

  return (
    <div className="profile-container">
      <div className="header">
        <FaArrowLeft size={20} onClick={() => router.push("/Home")} className="back-icon" />
        <h1>Profile Card</h1>
      </div>

      <div className="profile-body">
        <div className="profile-upper-container">
          <div className="profile-image">
            <img src={userData.image} alt={`${userData.name}'s Profile`} />
          </div>
          <div className="profile-details">
            <div className="personal-details">
              <h2>{userData.name}</h2>
              <p>{userData.currentRole} at {userData.college}</p>
              <p>{userData.location}</p>
            </div>
            <div className="personal-stats">
              <div className="submission-calendar">
                <h3>Submission Calendar</h3>
                <p>Total Submissions: {userData.submissionStats.totalSubmissions}</p>
                <p>Success Rate: {(userData.submissionStats.successRate * 100).toFixed(2)}%</p>
              </div>
              <div className="numbers">
                <h3>Problem Breakdown</h3>
                <p>Easy: {userData.submissionStats.problemsSolvedByDifficulty.easy}</p>
                <p>Medium: {userData.submissionStats.problemsSolvedByDifficulty.medium}</p>
                <p>Hard: {userData.submissionStats.problemsSolvedByDifficulty.hard}</p>
              </div>
              <div className="badges">
                <h3>Badges</h3>
                <ul>
                  {userData.badges.map((badge, index) => (
                    <li key={index}>{badge.name} (Level {badge.level})</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-lower-container">
          <div className="problem-related-stats">
            <h3>Problem-Related Stats</h3>
            <p>Total Problems Solved: {userData.submissionStats.totalProblemsSolved}</p>
          </div>
          <div className="recent-problem-submissions">
            <h3>Recent Problem Submissions</h3>
            <ul>
              {userData.recentSubmissions.map((submission) => (
                <li key={submission.id}>
                  {submission.title} - {submission.status} ({submission.time})
                  <br />
                  <small>Language: {submission.language} | Runtime: {submission.runtime}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
