import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Testcase = ({ onTestcaseUpdate, testcases, problemIndex }) => {
    const [currentTestcase, setCurrentTestcase] = useState({ input_case: '', output_case: '', is_public: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentTestcase({
            ...currentTestcase,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddTestcase = () => {
        if (!currentTestcase.input_case || !currentTestcase.output_case) {
            alert('Please provide both input and output for the testcase.');
            return;
        }
        const updatedTestcases = [...testcases, currentTestcase];
        onTestcaseUpdate(problemIndex, updatedTestcases);
        setCurrentTestcase({ input_case: '', output_case: '', is_public: false });
    };

    const handleRemoveTestcase = (index) => {
        const updatedTestcases = testcases.filter((_, i) => i !== index);
        onTestcaseUpdate(problemIndex, updatedTestcases);
    };

    return (
        <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Test Cases:</h3>
            {testcases.map((testcase, index) => (
                <div key={index} className="mb-2 p-2 border border-gray-200 rounded-md bg-gray-100">
                    <p className="text-sm"><strong>Input:</strong> {testcase.input_case}</p>
                    <p className="text-sm"><strong>Output:</strong> {testcase.output_case}</p>
                    <p className="text-sm"><strong>Public:</strong> {testcase.is_public ? 'Yes' : 'No'}</p>
                    <button
                        onClick={() => handleRemoveTestcase(index)}
                        className="mt-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="flex flex-col mt-4">
                <input
                    type="text"
                    name="input_case"
                    placeholder="Input Case"
                    value={currentTestcase.input_case}
                    onChange={handleChange}
                    className="mb-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="output_case"
                    placeholder="Output Case"
                    value={currentTestcase.output_case}
                    onChange={handleChange}
                    className="mb-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        name="is_public"
                        checked={currentTestcase.is_public}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Public
                </label>
                <button
                    type="button"
                    onClick={handleAddTestcase}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                    Add Test Case
                </button>
            </div>
        </div>
    );
};

Testcase.propTypes = {
    onTestcaseUpdate: PropTypes.func.isRequired,
    testcases: PropTypes.arrayOf(
        PropTypes.shape({
            input_case: PropTypes.string.isRequired,
            output_case: PropTypes.string.isRequired,
            is_public: PropTypes.bool.isRequired,
        })
    ).isRequired,
    problemIndex: PropTypes.number.isRequired,
};

export default Testcase;
