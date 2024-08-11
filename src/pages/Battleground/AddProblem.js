import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import CustomAdd from "./common/CustomAdd";
import { addProblem } from "../../utils/battlefield-apis/b-api";

const AddProblem = () => {
    const router = useRouter();
    const id = router.query.RoomId;
    const [questions, setQuestions] = useState([{}]);

    useEffect(() => {
        if (questions.length === 0) {
            setQuestions([{}]);
        }
    }, []);

    const handleAddQuestion = () => {
        if (questions.length < 4) {
            setQuestions([...questions, {}]);
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

    const handleSubmitAllQuestions = async () => {
        try {
            const results = await Promise.all(questions.map(async (question) => {
                const { title, content, author, difficulty, roomId } = question;
                const result = await addProblem(title, content, author, difficulty, roomId);
                return result;
            }));
            console.log('All results:', results);
        } catch (error) {
            console.error('Error submitting all questions:', error);
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
                {questions.map((_, index) => (
                    <div key={index} className="question-block">
                        <CustomAdd
                            onSubmit={handleQuestionSubmit}
                            onRemove={handleQuestionRemove}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddProblem;
