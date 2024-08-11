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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionData.title && questionData.question && questionData.author) {
            onSubmit(questionData, index);
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md mb-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor={`title-${index}`} className="font-medium text-gray-700">Title:</label>
                    <input
                        id={`title-${index}`}
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={questionData.title}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`question-${index}`} className="font-medium text-gray-700">Question:</label>
                    <textarea
                        id={`question-${index}`}
                        name="question"
                        placeholder="Question"
                        value={questionData.question}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`author-${index}`} className="font-medium text-gray-700">Author:</label>
                    <input
                        id={`author-${index}`}
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={questionData.author}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`difficulty-${index}`} className="font-medium text-gray-700">Difficulty:</label>
                    <select
                        id={`difficulty-${index}`}
                        name="difficulty"
                        value={questionData.difficulty}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="1">Easy</option>
                        <option value="2">Medium</option>
                        <option value="3">Hard</option>
                    </select>
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Remove
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomAdd;
