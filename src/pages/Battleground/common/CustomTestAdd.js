import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Testcase = ({ onTestcaseUpdate, testcases, problemIndex }) => {
    const [inputCase, setInputCase] = useState('');
    const [outputCase, setOutputCase] = useState('');
    const [visibility, setVisibility] = useState('true');

    const handleAddTestcase = (e) => {
        e.preventDefault();

        if (!inputCase || !outputCase) {
            return alert("Please enter both input and output cases");
        }

        const newTestcase = {
            input_case: inputCase,
            output_case: outputCase,
            is_public: visibility === 'true',
        };

        const updatedTestcases = [...testcases, newTestcase];
        onTestcaseUpdate(problemIndex, updatedTestcases);
        setInputCase('');
        setOutputCase('');
        setVisibility('true');
    };

    return (
        <div className="testcase-container p-4 bg-white rounded-lg shadow-md">
            <form className="space-y-4" onSubmit={handleAddTestcase}>
                <div className="flex flex-col">
                    <label htmlFor="input_case" className="font-medium text-gray-700">Input Case:</label>
                    <textarea
                        id="input_case"
                        value={inputCase}
                        onChange={(e) => setInputCase(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-md p-2 resize-none"
                        placeholder="Input case"
                        rows={4}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="output_case" className="font-medium text-gray-700">Output Case:</label>
                    <textarea
                        id="output_case"
                        value={outputCase}
                        onChange={(e) => setOutputCase(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-md p-2 resize-none"
                        placeholder="Output case"
                        rows={4}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="visibility" className="font-medium text-gray-700">Visibility:</label>
                    <select
                        id="visibility"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-md p-2"
                        required
                    >
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Add Test Case
                </button>
            </form>

            {testcases.length > 0 && (
                <div className="mt-6">
                    {testcases.map((testcase, index) => (
                        <div key={index} className="border-b-2 border-gray-200 pb-4 mb-4">
                            <div className="flex flex-col mb-4">
                                <strong className="text-gray-800">Input:</strong>
                                <textarea
                                    className="bg-yellow-50 w-full border border-gray-300 p-2 rounded-md resize-none"
                                    value={testcase.input_case}
                                    disabled
                                    rows={testcase.input_case.split("\n").length}
                                />
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-gray-800">Output:</strong>
                                <textarea
                                    className="bg-yellow-50 w-full border border-gray-300 p-2 rounded-md resize-none"
                                    value={testcase.output_case}
                                    disabled
                                    rows={testcase.output_case.split("\n").length}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

Testcase.propTypes = {
    onTestcaseUpdate: PropTypes.func.isRequired,
    testcases: PropTypes.arrayOf(PropTypes.shape({
        input_case: PropTypes.string.isRequired,
        output_case: PropTypes.string.isRequired,
        is_public: PropTypes.bool.isRequired,
    })).isRequired,
    problemIndex: PropTypes.number.isRequired,
};

export default Testcase;
