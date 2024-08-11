import dynamic from 'next/dynamic';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {BattleGroundAPIS, BattleGroundQues} from "../../../utils/battlefield-apis/play";
import {FaArrowLeft} from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown";
import OutputPanel from "../../../components/common/OutputPanel";
import {testcaseType} from "../../../types/API";
import {
    ArenaCodeRes, BattleCodeRes,
    BattlegroundCodeReq,
    PlaygroundCodeReq,
    PlaygroundCodeRes
} from "../../../types/Socket";

import useWebSocket from "../../../utils/useWebSocket";
import {ProblemDisplay} from "../../Arena/[id]";
import LocalstorageHelper from "../../../utils/localstorage";
import useLeaderBoardSocket from "../../../utils/useLeaderBoardSocket";
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface leaderboard {
    rank : number,
    uid_name : string,
    total_testcases_passed : number
}

const Arena = () => {
    const router = useRouter();
    const [questionArr, setQuestionArr] = useState<BattleGroundQues[]>([])
    const [currentQuesIndex, setCurrentQuesIndex] = useState(0)

    const [leaderboardList, setLeaderboardList] = useState<leaderboard[]>([])

    const [room_id, setRoom_id] = useState(undefined)
    const [user_id, setUser_id] = useState(undefined)

    useEffect(() => {
        if(router.query.slugs && router.query.slugs.length === 2){
            setRoom_id(router.query.slugs[0])
            setUser_id(router.query.slugs[1])
        }
    }, [router.query]);

    const [codeArr, setCodeArr] = useState<string[]>([]);
    const [theme, setTheme] = useState("vs-dark");
    const [language, setLanguage] = useState("cpp");
    const [fontSize, setFontSize] = useState(16);
    const [activeTab, setActiveTab] = useState("output");
    const [activeTestTab, setActiveTestTab] = useState(1);

    const [testcases, setTestcases] = useState<testcaseType[]>([]);

    const [runningCasesArr, setRunningCasesArr] = useState<
        ArenaCodeRes["responseData"]
    >([]);
    const [customInput, setCustomInput] = useState("");

    const [codeOutput, setCodeOutput] = useState<string>();
    const [outputState, setOutputState] = useState<string>();

    const [runningTestcaseState, setRunningTestcaseState] = useState<
        "INITIAL" | "LOADING" | "OUTPUT"
    >("INITIAL");

    const [detailsTabSelected, setDetailsTabSelected] = useState<"QUESTION"|"LEADERBOARD">("QUESTION")

    const { sendMessage: playgroundExecCode, messages: playgroundResult } =
        useWebSocket<PlaygroundCodeReq, PlaygroundCodeRes>(`/pg/code_execute`);

    const { sendMessage: battleExecCode, messages: questionResult } =
        useWebSocket<BattlegroundCodeReq, BattleCodeRes>(`/battle/code_execute/${room_id}/`);

    useEffect(() => {
        const data = playgroundResult;
        if (data) {
            console.log("details" in data.responseData.data);
            console.log("output" in data.responseData.data);

            if (data.responseData.error && "details" in data.responseData.data) {
                setCodeOutput(data.responseData.data.message);
                setOutputState("ERROR");
            } else if (data.responseData && "output" in data.responseData.data) {
                setCodeOutput(data.responseData.data.output);
                setOutputState("SUCCESS");
            } else {
                setCodeOutput("Some error occurred");
                setOutputState("ERROR");
            }
        }
    }, [playgroundResult]);

    useEffect(() => {
        console.log("RESULT",questionResult)
        if(questionResult && questionResult.event === "runner"){
            if (!questionResult.error && questionResult.responseData instanceof Array) {
                setRunningTestcaseState("OUTPUT");
                setRunningCasesArr(questionResult.responseData);
            }else if(typeof questionResult.responseData === "string"){
                setRunningTestcaseState("INITIAL");
                setCodeOutput(questionResult.responseData);
                setOutputState("ERROR");
            }
        }
    }, [questionResult]);

    const handleThemeChange = (e) => setTheme(e.target.value);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
    };

    const handleFontSizeChange = (e) => setFontSize(parseInt(e.target.value));

    const languageOptions = [{ value: "cpp", label: "C++" }];

    const themeOptions = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
        { value: "hc-black", label: "High Contrast" },
        { value: "vs", label: "Visual Studio" },
    ];

    const fontSizeOptions = [
        { value: 14, label: "14px" },
        { value: 16, label: "16px" },
        { value: 18, label: "18px" },
        { value: 20, label: "20px" },
        { value: 22, label: "22px" },
        { value: 24, label: "24px" },
    ];

    const handleCodeChange = (value,indexTarget) => setCodeArr((prev)=>{
        return prev.map((single,index)=>{
            if(indexTarget === index)
                return value
            else
                return single
        })
    });

    const handleRun = () => {
        if (activeTab === "customInput") {
            setCodeOutput("Running custom input");
            setOutputState("LOADING");
            playgroundExecCode({
                code: codeArr[currentQuesIndex],
                input: customInput,
            });
            setActiveTab("output");
        } else {
            setRunningTestcaseState("LOADING");
            setActiveTab("testOutput")
            setCodeOutput("Loading")

            console.log({
                code: codeArr[currentQuesIndex],
                p_id: questionArr[currentQuesIndex].p_id as string,
                uid : user_id
            })

            battleExecCode({
                code: codeArr[currentQuesIndex],
                p_id: questionArr[currentQuesIndex].p_id as string,
                uid : user_id
            });
        }
    };



    useEffect(() => {
        if(room_id){
            BattleGroundAPIS.getQuestion({room_id}).then(res=>{
                console.log(res.responseData)
                if (res.responseData && res.responseData.length >= 1)
                    setQuestionArr(res.responseData);
                else{
                    router.push("/")
                }
            })
        }
    }, [room_id]);

    const { sendMessage : leaderBoardGet , messages : leaderBoardData , isConnected} = useLeaderBoardSocket<any,any>(`/battle/code_execute/${room_id}/`);

    useEffect(() => {
        leaderBoardGet({
            "event": "leaderboard"
        })
    }, []);

    useEffect(() => {
        if(leaderBoardData && leaderBoardData.event === "leaderboard"){
            console.log("leaderboard ",leaderBoardData.responseData)
            setLeaderboardList(leaderBoardData.responseData as undefined as leaderboard[])
        }
    }, [leaderBoardData]);

    useEffect(() => {
        if(questionArr[currentQuesIndex]) {
            console.log("TESTCASE")
            setTestcases([]);
            BattleGroundAPIS.getTestcase({
                p_id: questionArr[currentQuesIndex].p_id,
            }).then((res) => {
                console.log("TESTCASE", res)
                if (res.responseData && res.responseData.length >= 1) {
                    setTestcases(res.responseData)
                }
            })
        }
    }, [currentQuesIndex , questionArr]);

    useEffect( () => {
        if(codeArr[currentQuesIndex] && questionArr[currentQuesIndex]){
            const { setKey } = LocalstorageHelper(room_id);
            setKey(codeArr);
            console.log("CodeChanged")
        }
    }, [codeArr]);

    useEffect(() => {
        if(room_id){
            const { getKey } = LocalstorageHelper(room_id);
            const data = getKey()
            if(data instanceof Array){
                console.log(data)
                setCodeArr(data)
            }else{
                const arr = questionArr.map((_)=>"// Start coding here!")
                console.log(arr)
                setCodeArr(arr)
            }
        }
    }, [room_id,questionArr]);

    if(!router.query.slugs || router.query.slugs.length !== 2){
        return <>
            Page invalid
        </>
    }

    if(questionArr.length === 0){
        return <>
            <div>
                Loading...
            </div>
        </>
    }

    return (
        <div className={``}>
            <div className="arena-container">
                <header className="header">
                    <FaArrowLeft size={15} onClick={() => router.push("/Home")}/>
                    <h1>BattleGround</h1>
                </header>
                <div className={`flex`}>
                    <div className={`ml-5 flex flex-col mt-10 gap-2`}>
                        {
                            questionArr.map((_, index) => (
                                <button key={`question-${index}`} className={`bg-sky-100 p-1 rounded-md min-w-[40px] text-center ${index === currentQuesIndex ? "bg-amber-200" : ""}`} onClick={()=>{
                                    setCurrentQuesIndex(index)
                                    setRunningCasesArr([]);
                                }}>{index+1}</button>
                            ))
                        }
                    </div>

                    <div className="content">
                        <div className="problem-column h-[85vh] overflow-y-auto">

                            <div className={`flex gap-2 pb-5`}>
                                <button onClick={()=>{setDetailsTabSelected("QUESTION")}}>Question</button>
                                <button onClick={()=>{
                                    leaderBoardGet({
                                        "event": "leaderboard"
                                    })
                                    setDetailsTabSelected("LEADERBOARD")
                                }}>Leaderboard</button>
                            </div>

                            {
                                detailsTabSelected === "QUESTION" ? <>
                                    {questionArr[currentQuesIndex] && <ProblemDisplay problem={questionArr[currentQuesIndex]}/>}

                                    <h3>Public Test Cases</h3>
                                    {testcases.map((problem, index) => (
                                        <div key={index} className="test-case">
                                            <h4>Test Case {index + 1}</h4>
                                            <div>
                                                <p>Input: </p>
                                                <textarea
                                                    className={`flex bg-amber-50 w-full p-2 rounded-md resize-none`}
                                                    defaultValue={problem.input_case || "N//A"}
                                                    rows={
                                                        problem.input_case
                                                            ? problem.input_case.split("\n").length
                                                            : 1
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <p>Output: </p>
                                                <textarea
                                                    className={`flex bg-amber-50 w-full p-2 rounded-md resize-none`}
                                                    defaultValue={problem.output_case || "N//A"}
                                                    rows={
                                                        problem.output_case
                                                            ? problem.output_case.split("\n").length
                                                            : 1
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {/*<h3>Constraints</h3>*/}
                                    {/*<p>{questionData.p_constraints || 'No constraints provided.'}</p>*/}
                                </>
                                    :
                                <>
                                    <div className={`flex flex-col gap-2`}>
                                        {
                                            leaderboardList.length >=1 ?
                                                leaderboardList.map((data)=> (<div className={`bg-sky-100 px-2 py-1 rounded-md flex justify-between`}>
                                                   <span> {data.uid_name}</span>
                                                   <span> {data.total_testcases_passed}</span>
                                                </div>)): (
                                                    <span>Leaderboard</span>)
                                        }
                                    </div>
                                </>
                            }
                        </div>

                        <div className="editor-column">
                            <div className="top-bar-arena">
                                <div className="controls-arena">
                                    <Dropdown
                                        options={themeOptions}
                                        value={theme}
                                        onChange={handleThemeChange}
                                    />
                                    <Dropdown
                                        options={languageOptions}
                                        value={language}
                                        onChange={handleLanguageChange}
                                    />
                                    <Dropdown
                                        options={fontSizeOptions}
                                        value={fontSize}
                                        onChange={handleFontSizeChange}
                                    />
                                </div>
                                <div className="execution-button">
                                    <button className="submit" onClick={handleRun}>
                                        Run
                                    </button>
                                </div>
                            </div>
                            <div className="editor">
                                <MonacoEditor
                                    width="100%"
                                    value={codeArr[currentQuesIndex]}
                                    theme={theme}
                                    language={language}
                                    options={{
                                        fontSize,
                                        minimap: {enabled: false},
                                        automaticLayout: true,
                                    }}
                                    onChange={(code)=>{
                                        handleCodeChange(code,currentQuesIndex)
                                    }}
                                />
                            </div>
                            {/* <div className="output"> */}
                            <div className="containerStyle-arena">
                                <div className="tabContent h-full overflow-auto">
                                    <div className="tabs">
                                        <button
                                            className={`tabButton ${
                                                activeTab === "output" ? "active" : ""
                                            }`}
                                            onClick={() => setActiveTab("output")}
                                        >
                                            Console Output
                                        </button>
                                        <button
                                            className={`tabButton ${
                                                activeTab === "customInput" ? "active" : ""
                                            }`}
                                            onClick={() => setActiveTab("customInput")}
                                        >
                                            Custom Test Cases
                                        </button>
                                        <button
                                            className={`tabButton ${
                                                activeTab === "testOutput" ? "active" : ""
                                            }`}
                                            onClick={() => setActiveTab("testOutput")}
                                        >
                                            TestOutput
                                        </button>
                                    </div>
                                    {activeTab === "output" && (
                                        <OutputPanel
                                            type={"arena"}
                                            value={codeOutput}
                                            outputState={outputState}
                                        />
                                    )}

                                    {activeTab === "customInput" && (
                                        <div className="customTestCases-arena">
                                              <textarea
                                                  rows={4}
                                                  className={`resize-none p-2 flex w-full h-full rounded-md`}
                                                  placeholder={"custom"}
                                                  onChange={(e) => setCustomInput(e.target.value)}
                                              />
                                        </div>
                                    )}

                                    {activeTab === "testOutput" && (
                                        <div className="p-2 flex flex-col gap-2 h-full overflow-auto max-h-[200px]">
                                            {runningTestcaseState === "OUTPUT" &&
                                            runningCasesArr.length >= 1 ? (
                                                runningCasesArr.map((testcase, index) => (
                                                    <TestCaseCard key={index} data={testcase} index={index} />
                                                ))
                                            ) : runningTestcaseState === "LOADING" ? (
                                                <div>
                                                    <span>Loading...</span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span>run code to see test cases</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Arena;

const TestCaseCard = ({data, index}:{data:ArenaCodeRes["responseData"][0],index:number}) => {

    const [isOpened, setIsOpened] = useState(false)

    return <div
        className={`${data.passed ? "bg-blue-100" : "bg-red-100"} p-2 rounded-md flex justify-between flex-col`}
        key={index}
        onClick={()=>{setIsOpened(prev=>!prev)}}
    >
        <div className={`flex justify-between`}>
            <div className={``}>
                <span>TESTCASE : {index + 1}</span>
            </div>

            {
                !data.expected_out && (
                    <span className={`p-1 bg-white rounded-md`}>
                    <i className="fi fi-rr-lock"></i>
                </span>
                )
            }
        </div>

        {
            isOpened && data.expected_out ? (
                <div className={`flex flex-col gap-2`}>
                    <div className={`flex flex-col gap-2`}>
                        <span>Input :</span>
                        <textarea defaultValue={data.user_input} rows={data.user_input.split("\n").length}
                                  className={`resize-none px-1 py-1 rounded-md`}/>
                    </div>
                    <div className={`flex flex-col gap-2`}>
                        <span>Output :</span>
                        <textarea defaultValue={data.expected_out} rows={data.expected_out.split("\n").length}
                                  className={`resize-none px-1 py-1 rounded-md`}/>
                    </div>
                    <div className={`flex gap-2`}>
                        <span>Runtime :</span>
                        <textarea defaultValue={data.data.exec_time} rows={1} className={`resize-none px-1 py-1 rounded-md`}/>
                    </div>
                </div>
            ) : (
                <></>
            )
        }
    </div>
}