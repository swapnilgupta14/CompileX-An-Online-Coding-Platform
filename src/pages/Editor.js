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
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' },
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

      <>
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
            options={{
              fontSize, 
              minimap: { enabled: false },
              automaticLayout: true,
            }}
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
          </div>
        </div>
      </>

      {outputVisible && (
        <>
          <OutputPanel
            type={'playground'}
          />
        </>
      )}

    </div>
  );
};

export default CodeEditor;
