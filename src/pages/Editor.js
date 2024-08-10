import React, { useState } from 'react';
import Dropdown from '../components/common/Dropdown';
import OutputPanel from '../components/common/OutputPanel';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const CodeEditor = () => {
  const router = useRouter();
  const [filename, setFilename] = useState('main.cpp');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('cpp');
  const [fontSize, setFontSize] = useState(16);
  const [outputVisible, setOutputVisible] = useState(true);

  const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'vs-dark', label: 'Dark' },
    { value: 'hc-black', label: 'High Contrast' },
    { value: 'vs', label: 'Visual Studio' },
    { value: 'kimbie.dark', label: 'Kimbie Dark' },
    { value: 'monokai', label: 'Monokai' },
    { value: 'solarized-light', label: 'Solarized Light' },
    { value: 'solarized-dark', label: 'Solarized Dark' },
    { value: 'github', label: 'GitHub' },
    { value: 'twilight', label: 'Twilight' },
    { value: 'romantica', label: 'Romantica' },
    { value: 'dracula', label: 'Dracula' },
    { value: 'nord', label: 'Nord' },
    { value: 'one-dark-pro', label: 'One Dark Pro' },
    { value: 'cobalt', label: 'Cobalt' },
    { value: 'ayu-light', label: 'Ayu Light' },
    { value: 'ayu-dark', label: 'Ayu Dark' },
    { value: 'material', label: 'Material' },
    { value: 'material-darker', label: 'Material Darker' },
    { value: 'oceanic-next', label: 'Oceanic Next' }
  ];

  const fontSizeOptions = [
    { value: 14, label: '14px' },
    { value: 16, label: '16px' },
    { value: 18, label: '18px' },
    { value: 20, label: '20px' },
    { value: 22, label: '22px' },
    { value: 24, label: '24px' },
  ];

  const handleThemeChange = (e) => setTheme(e.target.value);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    switch (selectedLanguage) {
      case 'cpp':
        setFilename('main.cpp');
        break;
      case 'python':
        setFilename('main.py');
        break;
      case 'javascript':
        setFilename('main.js');
        break;
      default:
        setFilename('main.cpp');
    }
  };

  const handleFontSizeChange = (e) => setFontSize(parseInt(e.target.value));
  const toggleOutput = () => setOutputVisible(!outputVisible);

  return (
    <div className="code-editor-container">
      <header>
        <FaArrowLeft size={15} onClick={() => router.push('/Dashboard/Home')} />
        <h1>Playground</h1>
      </header>

      <div className="top-bar">
        <div className="filename">{filename}</div>
        <div className="controls">
          <Dropdown options={themeOptions} value={theme} onChange={handleThemeChange} />
          <Dropdown options={languageOptions} value={language} onChange={handleLanguageChange} />
          <Dropdown options={fontSizeOptions} value={fontSize} onChange={handleFontSizeChange} />
        </div>
      </div>

      <div className={`editor-section ${outputVisible ? 'with-output' : ''}`}>
        <MonacoEditor
          height="50vh"
          width="100%"
          theme={theme}
          language={language}
          value="// Start coding here!"
          options={{ fontSize }}
        />
      </div>

      <div className="bottom-bar">
        <div className="bottom-bar-left">
          <button onClick={toggleOutput}>
            {outputVisible ? 'Hide Output' : 'Show Output'}
          </button>
        </div>
        <div className="bottom-bar-right">
          <button onClick={() => alert('Run code')}>Run</button>
          <button onClick={() => alert('Submit code')}>Submit</button>
        </div>
      </div>

      {outputVisible && (
        <>
          <OutputPanel
            index={1}
          />
        </>
      )}

    </div>
  );
};

export default CodeEditor;
