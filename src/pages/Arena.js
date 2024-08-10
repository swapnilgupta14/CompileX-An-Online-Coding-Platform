import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import OutputPanel from '../components/common/OutputPanel';
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const Arena = () => {
    const router = useRouter();

    const languageOptions = [
        { value: 'cpp', label: 'C++' },
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'JavaScript' },
    ];

    return (
        <div className="arena-container">
            <header className="header">
                <FaArrowLeft size={15} onClick={() => router.push('/Dashboard/Home')} />
                <h1>Arena</h1>
            </header>
            <div className="content">
                <div className="problem-column">
                    <h2>Coding Problem</h2>
                    <p>
                        Solve the following problem: Write a function that takes an array of integers and returns the sum of all even numbers.
                    </p>
                    <h3>Public Test Cases</h3>
                    <ul>
                        <li>Input: [1, 2, 3, 4, 5], Output: 6</li>
                        <li>Input: [10, 21, 32, 43], Output: 42</li>
                    </ul>
                    <h3>Constraints</h3>
                    <ul>
                        <li>The input array length will not exceed 1000.</li>
                        <li>Each integer will be between -1000 and 1000.</li>
                    </ul>
                </div>
                <div className="editor-column">
                    <div className="editor">
                        <MonacoEditor
                            width="100%"
                            value="// Start coding here!"
                        />
                    </div>
                    <div className="output">
                        <OutputPanel
                            index={1}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Arena;
