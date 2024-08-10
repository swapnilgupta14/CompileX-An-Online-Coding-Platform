import React, { useState, useEffect } from 'react';
import Dropdown from '../components/common/Dropdown';
import OutputPanel from '../components/common/OutputPanel';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
import useWebSocket from "../utils/useWebSocket";
import {SocketCodeReq, SocketCodeRes} from "../types/Socket";
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const CodeEditor = () => {
  const router = useRouter();
  const [filename, setFilename] = useState('main.cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('cpp');
  const [fontSize, setFontSize] = useState(16);
  const [outputVisible, setOutputVisible] = useState(false);
  const [code, setCode] = useState('// Start coding here!');
  const [codeInput, setCodeInput] = useState("")
  const [codeOutput, setCodeOutput] = useState<string>()
  const [outputState, setOutputState] = useState<string>()
  
  const { sendMessage , messages } = useWebSocket<SocketCodeReq,SocketCodeRes>("/pg/code_execute")

  //  make  a comp later
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
  const toggleOutput = () =>{
    setOutputVisible(!outputVisible)
  };

  // 

  const handleCodeChange = (value) => setCode(value);

  useEffect( () => {
      console.log(JSON.stringify(code));
  }, [code]);

  const handleSubmit = () =>{
    console.log(code,codeInput);
    setCodeOutput("Loading")
    setOutputState("LOADING")
    sendMessage({
      code: code,
      input : codeInput
    })
  }

  useEffect(() => {
    const data = messages;
    if(data){
      console.log("details" in data.responseData.data)
      console.log("output" in data.responseData.data)

      if(data.responseData.error && "details" in data.responseData.data){
        setCodeOutput(data.responseData.data.message)
        setOutputState("ERROR")
      }else if(data.responseData && "output" in data.responseData.data){
        setCodeOutput(data.responseData.data.output)
        setOutputState("SUCCESS")
      }else{
        setCodeOutput("Some error occurred")
        setOutputState("ERROR")
      }
    }
  }, [messages]);


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

        <div className={`editor-section px-4 flex flex-col gap-2`}>
          <MonacoEditor
            height="50vh"
            width="100%"
            theme={theme}
            language={language}
            value={code}
            onChange={setCode}
            options={{
              fontSize, 
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
          <div>
            <textarea placeholder={"input"} className={`w-full bg-gray-100 p-2 rounded-md border-2`} onChange={(e)=>{setCodeInput(e.target.value)}} rows={3} style={{
              resize: 'none',
            }}/>
          </div>
        </div>

        <div className="bottom-bar">
          <div className="bottom-bar-left">
            <button onClick={toggleOutput}>
              {outputVisible ? 'Hide Output' : 'Show Output'}
            </button>
          </div>
          <div className="bottom-bar-right">
            <button onClick={handleSubmit}>Run</button>
          </div>
        </div>
      </>

      {outputVisible && (
        <>
          <OutputPanel
            type={'playground'}
            value={codeOutput}
            outputState={outputState}
          />
        </>
      )}

    </div>
  );
};

export default CodeEditor;
