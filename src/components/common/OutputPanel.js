import PropTypes from 'prop-types';
import React, { useState } from 'react';

const OutputPanel = ({ type, input, width, height, customStyles, value, outputState, onCodeInputChange }) => {
    const [localInput, setLocalInput] = useState(input);

    const handleInputChange = (e) => {
        const newInput = e.target.value;
        setLocalInput(newInput);
        onCodeInputChange(newInput);
    };

    return (
        <div className="containerStyle">
            {type === 'playground' && (
                <div className="customTestCasesStyle">
                    <h2>Enter Input</h2>
                    <div className="contentStyle">
                        <textarea
                            value={localInput}
                            onChange={handleInputChange}
                            className="w-full bg-gray-100 p-2 rounded-md border-2"
                            rows={3}
                            placeholder='// Enter your input here...'
                            style={{ resize: 'none' }}
                        />
                    </div>
                </div>
            )}
            <div className="outputStyle">
                {type !== 'arena' && (<h2>Console Output</h2>)}
                <div className="contentStyle">
                    <textarea
                        className={`outputAreaStyle ${outputState === "SUCCESS" ? 'bg-sky-100' : outputState === "ERROR" ? 'bg-red-100' : 'bg-gray-100'}`}
                        placeholder="// Your output will appear here..."
                        value={value}
                        rows={value ? Math.min(10, value.split("\n").length) : 2}
                    >
                    </textarea>
                </div>
            </div>
        </div>
    );
};

OutputPanel.propTypes = {
    type: PropTypes.string,
    input: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    customStyles: PropTypes.object,
    onCodeInputChange: PropTypes.func,
};

export default OutputPanel;
