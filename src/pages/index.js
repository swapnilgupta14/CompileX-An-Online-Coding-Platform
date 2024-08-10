// src/App.js
import React from 'react';
import CodeEditor from '../components/Editor';
import Sidebar from '../components/Sidebar';

function App() {
  return (
    <div className = "main-container">
      <Sidebar />
      <CodeEditor />
    </div>
  );
}

export default App;
