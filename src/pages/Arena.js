import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Dropdown from '../components/common/Dropdown';
import dynamic from 'next/dynamic';
import OutputPanel from '../components/common/OutputPanel';
import { BsTextarea } from 'react-icons/bs';
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const ProblemDisplay = ({ problem }) => (
    <div className="problem">
        <div className="problem-header">
            <h2>{problem.p_title}</h2>
            <span className="problem-stats">
                <p>Likes: {problem.p_likes}</p>
                <p>Difficulty: {problem.p_difficulty}</p>
            </span>
        </div>
        <p>{problem.p_content}</p>
        <div className="problem-footer">
            <p>Author: {problem.p_author}</p>
        </div>
    </div>
);

const Arena = () => {
    const router = useRouter();
    const [code, setCode] = useState('// Start coding here!');
    const [theme, setTheme] = useState('vs-dark');
    const [language, setLanguage] = useState('cpp');
    const [fontSize, setFontSize] = useState(16);
    const [activeTab, setActiveTab] = useState('output');
    const [activeTestTab, setActiveTestTab] = useState(1);

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

    const dummyProblem = [
        {
            p_title: 'Two Sum',
            p_content: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
            You may assume that each input would have exactly one solution, and you may not use the same element twice.
            Example:
            Input: nums = [2,7,11,15], target = 9
            Output: [0,1]
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
            p_author: 'LeetCoder',
            p_likes: 250,
            p_difficulty: 0,
            p_constraints: '1 <= nums.length <= 10^4',
            p_input: 'nums = [2,7,11,15], target = 9',
            p_output: '[0,1]',
        },
    ];

    const dummyTestCases = [
        {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            expected: '[0,1]',
        },
        {
            input: 'nums = [3,2,4], target = 6',
            output: '[1,2]',
            expected: '[1,2]',
        },
        {
            input: 'nums = [3,3], target = 6',
            output: '[0,1]',
            expected: '[0,1]',
        },
    ];

    const languageOptions = [
        { value: 'cpp', label: 'C++' },
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'JavaScript' },
    ];

    const themeOptions = [
        { value: 'vs-dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
        { value: 'hc-black', label: 'High Contrast' },
        { value: 'vs', label: 'Visual Studio' },
    ];

    const fontSizeOptions = [
        { value: 14, label: '14px' },
        { value: 16, label: '16px' },
        { value: 18, label: '18px' },
        { value: 20, label: '20px' },
        { value: 22, label: '22px' },
        { value: 24, label: '24px' },
    ];

    const handleCodeChange = (value) => setCode(value);
    useEffect(() => {
        console.log(JSON.stringify(code));
    }, [code]);

    return (
        <div className="arena-container">
            <header className="header">
                <FaArrowLeft size={15} onClick={() => router.push('/Dashboard/Home')} />
                <h1>Arena</h1>
            </header>

            <div className="content">
                <div className="problem-column">
                    {dummyProblem.map((problem, index) => (
                        <ProblemDisplay key={index} problem={problem} />
                    ))}

                    <h3>Public Test Cases</h3>
                    {dummyProblem.map((problem, index) => (
                        <div key={index} className="test-case">
                            <h4>Test Case {index + 1}</h4>
                            <p>Input: {problem.p_input || 'N//A'}</p>
                            <p>Output: {problem.p_output || 'n/a'}</p>
                        </div>
                    ))}

                    <h3>Constraints</h3>
                    <p>{dummyProblem[0].p_constraints || 'No constraints provided.'}</p>
                </div>

                <div className="editor-column">
                    <div className="top-bar-arena">
                        <div className="controls-arena">
                            <Dropdown options={themeOptions} value={theme} onChange={handleThemeChange} />
                            <Dropdown options={languageOptions} value={language} onChange={handleLanguageChange} />
                            <Dropdown options={fontSizeOptions} value={fontSize} onChange={handleFontSizeChange} />
                        </div>
                        <div className="execution-button">
                            <button className="run" onClick={() => alert('Run code')}>Run</button>
                            <button className="submit" onClick={() => alert('Submit code')}>Submit</button>
                        </div>
                    </div>
                    <div className="editor">
                        <MonacoEditor
                            width="100%"
                            value={code}
                            theme={theme}
                            language={language}
                            options={{
                                fontSize,
                                minimap: { enabled: false },
                                automaticLayout: true,
                            }}
                            onChange={handleCodeChange}
                        />
                    </div>
                    {/* <div className="output"> */}
                    <div className="containerStyle-arena">

                        <div className="tabContent">
                            <div className="tabs">
                                <button
                                    className={`tabButton ${activeTab === 'output' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('output')}
                                >
                                    Console Output
                                </button>
                                <button
                                    className={`tabButton ${activeTab === 'testcases' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('testcases')}
                                >
                                    Custom Test Cases
                                </button>
                            </div>
                            {activeTab === 'output' && (
                                <div className="outputStyle">
                                    {/* <div>
                                    // <p>
                                    // </p>
                                    </div> */}
                                    <div className="contentStyle">
                                        <textarea className="outputAreaStyle">
                                            Your output will appear here...
                                        </textarea>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'testcases' && (
                                <div className="customTestCases-arena">
                                    <div className="tabs">
                                        {dummyTestCases.map((item, index) => (
                                            <div key={index} className="tab" onClick={() => setActiveTestTab(index)}>
                                                <input
                                                    type="radio"
                                                    id={`tab-${index}`}
                                                    name="testCaseTabs"
                                                    defaultChecked={index === 1}
                                                />
                                                <label>Test Case {index + 1}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div key={activeTestTab} className="tab-content" style={{ display: `tab-${activeTestTab}` === `tab-1` ? 'block' : 'none' }}>
                                        <div className="testCaseField">
                                            <label>Input:</label>
                                            <input type="text" value={dummyTestCases[activeTestTab].input} />
                                        </div>
                                        <div className="testCaseField">
                                            <label>Code Output:</label>
                                            <input type="text" value={dummyTestCases[activeTestTab].output} />
                                        </div>
                                        <div className="testCaseField">
                                            <label>Expected Result:</label>
                                            <input type="text" value={dummyTestCases[activeTestTab].expected} />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Arena;
