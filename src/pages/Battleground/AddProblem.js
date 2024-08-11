import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import CustomAdd from "./common/CustomAdd";
import Testcase from './common/CustomTestAdd';
import { addProblem } from "../../utils/battlefield-apis/b-api";
import { addTestcase } from "../../utils/battlefield-apis/b-api";

const AddProblem = () => {
    const router = useRouter();
    const id = router.query.RoomId;
    const [questions, setQuestions] = useState([{ testcases: [] }]);

    const handleAddQuestion = () => {
        if (questions.length < 4) {
            setQuestions([...questions, { testcases: [] }]);
        }
    };

    const handleQuestionSubmit = (questionData, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = questionData;
        setQuestions(updatedQuestions);
    };

    const handleQuestionRemove = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const handleTestcaseUpdate = (problemIndex, updatedTestcases) => {
        const updatedQuestions = [...questions];
        updatedQuestions[problemIndex].testcases = updatedTestcases;
        setQuestions(updatedQuestions);
    };

    const handleSubmitAllQuestions = async () => {
        try {
            for (const question of questions) {
                const { title, content, author, difficulty, roomId, testcases } = question;
                const result = await addProblem(title, content, author, difficulty, roomId);
                const problemId = result.responseData.p_id;

                if (testcases && testcases.length > 0) {
                    await Promise.all(testcases.map(async (testcase) => {
                        await addTestcase(problemId, testcase.input_case, testcase.output_case, testcase.is_public);
                    }));
                }
            }
            alert('All problems and test cases submitted successfully!');
        } catch (error) {
            console.error('Error submitting all questions:', error);
            alert('Error submitting problems or test cases.');
        }
    };

    return (
        <div className="add-contest-container">
            <header className="header">
                <div className='title'>
                    <FaArrowLeft size={15} onClick={() => router.push("/Battleground/Battles")} />
                    <h1>Add Problem And Test Cases for Battle ID: {id}</h1>
                </div>
                <div className='buttons'>
                    {questions.length < 4 && (
                        <button onClick={handleAddQuestion}>Add Another Question</button>
                    )}
                    <button onClick={handleSubmitAllQuestions}>Submit Questions</button>
                </div>
            </header>
            <div className='add-question'>
                {questions.map((question, index) => (
                    <div key={index} className="question-block">
                        <CustomAdd
                            onSubmit={(data) => handleQuestionSubmit(data, index)}
                            onRemove={() => handleQuestionRemove(index)}
                            index={index}
                        />
                        <Testcase
                            problemIndex={index}
                            testcases={question.testcases}
                            onTestcaseUpdate={handleTestcaseUpdate}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddProblem;
