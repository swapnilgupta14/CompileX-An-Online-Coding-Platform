import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Dropdown from '../../components/common/Dropdown';
import dynamic from 'next/dynamic';
import OutputPanel from '../../components/common/OutputPanel';
import { BsTextarea } from 'react-icons/bs';
import {Problem, testcaseType} from "../../types/API";
import ProblemAPI from "../../utils/ProblemAPI";
import {QUESTION_DIFFICULTY} from "../../utils/Static";
import useWebSocket from "../../utils/useWebSocket";
import {ArenaCodeReq, ArenaCodeRes, PlaygroundCodeReq, PlaygroundCodeRes} from "../../types/Socket";
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const ProblemDisplay = ({ problem }) => (
    <div className="problem">
        <div className="problem-header">
            <h2>{problem.p_title}</h2>
            <span className="problem-stats">
                <p>Difficulty: {" "}
                    <span className={`${QUESTION_DIFFICULTY[problem.p_difficulty].style} px-2 py-1 rounded-md`}>
                        {QUESTION_DIFFICULTY[problem.p_difficulty].Title}
                    </span>
                    </p>
            </span>
        </div>
        <pre>{problem.p_content}</pre>
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

    const [questionData, setQuestionData] = useState<Problem>(undefined)
    const [testcases, setTestcases] = useState<testcaseType[]>([])

    const [runningCasesArr, setRunningCasesArr] = useState<ArenaCodeRes["responseData"]>([])
    const [customInput, setCustomInput] = useState("")

    const [codeOutput, setCodeOutput] = useState<string>()
    const [outputState, setOutputState] = useState<string>()
    const [runningTestcaseState, setRunningTestcaseState] = useState<"INITIAL" | "LOADING" | "OUTPUT">("INITIAL")

    const { sendMessage : playgroundExecCode , messages : playgroundResult } = useWebSocket<PlaygroundCodeReq,PlaygroundCodeRes>("/pg/code_execute")

    const { sendMessage : questionExecCode , messages : questionResult } = useWebSocket<ArenaCodeReq,ArenaCodeRes>("/arena/code_execute")


    useEffect(() => {
        const data = playgroundResult;
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
    }, [playgroundResult]);

    useEffect(() => {
        if(questionResult){
            setRunningTestcaseState("OUTPUT")
            setRunningCasesArr(questionResult.responseData)
        }
    }, [questionResult]);


    const handleThemeChange = (e) => setTheme(e.target.value);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
    };


    useEffect(() => {
        if(router.query.id){
            ProblemAPI.problemGetById({p_id:router.query.id as string}).then((data)=>{
                if(data.responseData && data.status_code===200)
                setQuestionData(data.responseData)
            })
            ProblemAPI.testcaseGet({
                p_id : router.query.id as string,
            }).then((data)=>{
                if(data.responseData && data.responseData.length >= 1)
                    setTestcases(data.responseData)
            })
        }
    }, [router.query.id]);

    const handleFontSizeChange = (e) => setFontSize(parseInt(e.target.value));

    const languageOptions = [
        { value: 'cpp', label: 'C++' },
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

    const handleRun = () =>{
        if(activeTab === 'customInput'){
            setCodeOutput("Running custom input")
            setOutputState("LOADING")
            playgroundExecCode({
                code : code,
                input : customInput
            })
            setActiveTab("output")
        }else{
            setRunningTestcaseState("LOADING")
            questionExecCode({
                code : code,
                p_id : router.query.id as string
            })
        }
    }

    return (
        <div className="arena-container">
            <header className="header">
                <FaArrowLeft size={15} onClick={() => router.push('/Dashboard/Home')} />
                <h1>Arena</h1>
            </header>

            <div className="content">
                <div className="problem-column h-[85vh] overflow-auto">
                    {
                        questionData && <ProblemDisplay problem={questionData} />
                    }

                    <h3>Public Test Cases</h3>
                    {testcases.map((problem, index) => (
                        <div key={index} className="test-case">
                            <h4>Test Case {index + 1}</h4>
                            <div>
                                <p>Input: </p>
                                <textarea className={`flex bg-amber-50 w-full p-2 rounded-md resize-none`} value={problem.input_case || 'N//A'}
                                          rows={problem.input_case ? problem.input_case.split("\n").length : 1}/>
                            </div>
                            <div>
                                <p>Output: </p>
                                <textarea className={`flex bg-amber-50 w-full p-2 rounded-md resize-none`} value={problem.output_case || 'N//A'}
                                          rows={problem.output_case ? problem.output_case.split("\n").length : 1}/>
                            </div>
                        </div>
                    ))}

                    {/*<h3>Constraints</h3>*/}
                    {/*<p>{questionData.p_constraints || 'No constraints provided.'}</p>*/}
                </div>

                <div className="editor-column">
                    <div className="top-bar-arena">
                        <div className="controls-arena">
                            <Dropdown options={themeOptions} value={theme} onChange={handleThemeChange} />
                            <Dropdown options={languageOptions} value={language} onChange={handleLanguageChange} />
                            <Dropdown options={fontSizeOptions} value={fontSize} onChange={handleFontSizeChange} />
                        </div>
                        <div className="execution-button">
                            <button className="submit" onClick={handleRun}>Run</button>
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

                        <div className="tabContent h-full overflow-auto">
                            <div className="tabs">
                                <button
                                    className={`tabButton ${activeTab === 'output' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('output')}
                                >
                                    Console Output
                                </button>
                                <button
                                    className={`tabButton ${activeTab === 'customInput' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('customInput')}
                                >
                                    Custom Test Cases
                                </button>
                                <button
                                    className={`tabButton ${activeTab === 'testOutput' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('testOutput')}
                                >
                                    TestOutput
                                </button>
                            </div>
                            {activeTab === 'output' && (
                                <OutputPanel
                                    type={'playground'}
                                    value={codeOutput}
                                    outputState={outputState}
                                />
                            )}

                            {activeTab === 'customInput' && (
                                <div className="customTestCases-arena">
                                    <textarea rows={4} className={`resize-none p-2 flex w-full h-full rounded-md`} placeholder={"custom"} onChange={e=>setCustomInput(e.target.value)}/>
                                </div>
                            )}

                            {activeTab === 'testOutput' && (
                                <div className="p-2 flex flex-col gap-2 h-full overflow-auto max-h-[200px]">
                                    {
                                        runningTestcaseState === "OUTPUT" && runningCasesArr.length >=1 ? runningCasesArr.map((testcase, index) => (
                                            <div className={`bg-gray-100 p-2 rounded-md flex justify-between`} key={index}>
                                                <div className={``}>
                                                    <span>TESTCASE : {index+1}</span>
                                                </div>
                                                <span className={`p-1 bg-white rounded-md`}>
                                                    {
                                                        testcase.passed ? <i className="fi fi-br-check text-green-500"></i> :
                                                            <i className="fi fi-br-cross text-red-500"></i>
                                                    }
                                                </span>
                                            </div>
                                        )) :

                                            runningTestcaseState === "LOADING" ?(
                                            <div>
                                                <span>Loading...</span>
                                            </div>
                                        ): (
                                                <div>
                                                    <span>run code to see test cases</span>
                                                </div>
                                            )
                                    }
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
