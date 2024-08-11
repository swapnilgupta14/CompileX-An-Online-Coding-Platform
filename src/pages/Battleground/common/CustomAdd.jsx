import React, { useState } from 'react';

const CustomAdd = ({ onSubmit, onRemove, index }) => {
    const [questionData, setQuestionData] = useState({
        title: '',
        question: '',
        author: '',
        difficulty: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({
            ...questionData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (questionData.title && questionData.question && questionData.author) {
            onSubmit(questionData, index);
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="question-block p-4 border border-gray-300 rounded-lg shadow-md mb-4">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={questionData.title}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <textarea
                name="question"
                placeholder="Question"
                value={questionData.question}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="text"
                name="author"
                placeholder="Author"
                value={questionData.author}
                onChange={handleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <select
                name="difficulty"
                value={questionData.difficulty}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
            </select>
            <div className="flex justify-between">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-black rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    Submit
                </button>
                <button
                    onClick={() => onRemove(index)}
                    className="px-4 py-2 text-black rounded hover:bg-red-600 transition-colors duration-300"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CustomAdd;
