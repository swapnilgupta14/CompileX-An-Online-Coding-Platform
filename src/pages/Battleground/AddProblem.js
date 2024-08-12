import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import CustomAdd from "./common/CustomAdd";
import Testcase from './common/CustomTestAdd';
import { addProblem, addTestcase } from "../../utils/battlefield-apis/b-api";

const AddProblem = () => {
    const router = useRouter();
    const id = router.query.RoomId;
    const [questions, setQuestions] = useState([{ testcases: [] }]);

    const handleAddQuestion = () => {
        if (questions.length < 4) {
            setQuestions([...questions, { testcases: [] }]);
        } else {
            alert('You can only add up to 4 questions.');
        }
    };

    const handleQuestionSubmit = (questionData, index) => {
        if (!questionData.title || !questionData.question || !questionData.author) {
            alert('Please fill in all fields for the question.');
            return;
        }
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], ...questionData };
        setQuestions(updatedQuestions);
    };

    const handleQuestionRemove = (index) => {
        if (questions.length === 1) {
            alert('At least one question must be present.');
            return;
        }
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
                const { title, question: content, author, difficulty, testcases = [] } = question;

                if (!title || !content || !author || !difficulty) {
                    alert('Please fill in all the required fields for each question.');
                    return;
                }

                const result = await addProblem(title, content, author, difficulty, id);
                const problemId = result.responseData.p_id;

                if (!result) {
                    alert('Error submitting problem:', result);
                    return;
                }

                if (testcases.length > 0) {
                    await Promise.all(testcases.map(async (testcase) => {
                        await addTestcase(problemId, testcase.input_case, testcase.output_case, testcase.is_public);
                    }));
                }
            }
            alert('All problems and test cases submitted successfully!');
            router.push("/Battleground/Battles");
        } catch (error) {
            console.error('Error submitting all questions:', error);
            alert('Error submitting problems or test cases.');
        }
    };

    return (
        <div className="add-contest-container p-4 bg-gray-50 min-h-screen">
            <div className="header">
                <div className='title'>
                    <FaArrowLeft size={15} onClick={() => router.push("/Battleground/Battles")} />
                    <h1>Add Problem And Test Cases for Battle ID: {id}</h1>
                </div>
                <div className='buttons'>
                    <button onClick={handleAddQuestion}>Add Another Question</button>
                    <button onClick={handleSubmitAllQuestions}>Submit Questions</button>
                </div>
            </div>

            {/* <div className="bg-transparent-100 p-4 rounded-lg min-h-fit"> */}
                <div className="flex gap-4">
                    <div className="flex-1" style={{ flexBasis: '60%' }}>
                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className="bg-blue-50 p-4 border border-blue-200 rounded-lg shadow-sm h-full"
                            >
                                <CustomAdd
                                    onSubmit={(data) => handleQuestionSubmit(data, index)}
                                    onRemove={() => handleQuestionRemove(index)}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1" style={{ flexBasis: '40%' }}>
                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className="bg-blue-50 p-4 border border-blue-200 rounded-lg shadow-sm h-full"
                            >
                                <Testcase
                                    problemIndex={index}
                                    testcases={question.testcases || []}
                                    onTestcaseUpdate={handleTestcaseUpdate}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            {/* </div> */}


        </div>
    );
};

export default AddProblem;
