import PropTypes from 'prop-types';

const OutputPanel = ({ type, width, height, customStyles , value , outputState}) => {
    return (
        <div className="containerStyle">
            {type !== 'playground' && (
                <div className="customTestCasesStyle">
                    <h2>Custom Test Cases</h2>
                    <div className="contentStyle">
                        <textarea
                            className="textAreaStyle"
                            placeholder="Enter your test cases here..."
                        ></textarea>
                    </div>
                </div>
            )}
            <div className="outputStyle">
                <h2>Console Output</h2>
                <div className="contentStyle">
                    <textarea 
                        className={`outputAreaStyle ${outputState === "SUCCESS" ? 'bg-sky-100' : outputState === "ERROR" ? 'bg-red-100' : 'bg-gray-100'}`}
                        placeholder="// Your output will appear here..."
                        value={value}
                        rows={value ? Math.min(10 ,value.split("\n").length) : 2}
                    >
                    </textarea>
                </div>
            </div>
        </div>
    );
};

OutputPanel.propTypes = {
    type: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    customStyles: PropTypes.object
};

export default OutputPanel;
