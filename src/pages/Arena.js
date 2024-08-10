import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Dropdown from '../components/common/Dropdown';
import dynamic from 'next/dynamic';
import OutputPanel from '../components/common/OutputPanel';
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
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('cpp');
    const [fontSize, setFontSize] = useState(16);

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
            p_output: '[0,1]'
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
                            <p>Input: {problem.p_input || 'N/A'}</p>
                            <p>Output: {problem.p_output || 'N/A'}</p>
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
                            value="// Start coding here!"
                            theme={theme}
                            language={language}
                            options={{
                                fontSize,
                                minimap: { enabled: false },
                                automaticLayout: true,
                            }}
                        />
                    </div>
                    {/* <div className="output"> */}
                    <div className="containerStyle-arena">
                        <div className="customTestCases-arena" id="customTestCases">
                            <h2>Custom Test Cases</h2>
                            <div className="contentStyle">
                                <textarea
                                    className="outputAreaStyle"
                                    placeholder="Enter your test cases here..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="outputStyle">
                            <h2>Console Output</h2>
                            <div className="contentStyle">
                                <div className="outputAreaStyle">
                                    Your output will appear here...
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Arena;
