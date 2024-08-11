import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import Add from "../Question/add";

const AddProblem = ({ RoomId, BattleName }) => {
    const router = useRouter();
    const id = router.query.RoomId;
    const [questions, setQuestions] = useState([{}]);

    const handleAddQuestion = () => {
        if (questions.length < 4) {
            setQuestions([...questions, {}]);
        }
    };

    const handleRemoveQuestion = (index) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((_, i) => i !== index));
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
                    {true && (
                        <button>Submit Questions</button>
                    )}
                </div>
            </header>
            <div className='add-question'>
                {questions.map((_, index) => (
                    <div key={index} className="question-block">
                        <Add />
                        {questions.length > 1 && (
                            <button className="remove-button" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AddProblem;
