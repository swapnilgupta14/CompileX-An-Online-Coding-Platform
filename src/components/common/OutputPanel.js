import PropTypes from 'prop-types';

const OutputPanel = ({ type, width, height, customStyles }) => {
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
                    <div className="outputAreaStyle">
                        // Your output will appear here...
                    </div>
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
