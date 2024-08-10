// components/OutputPanel.js
const OutputPanel = ({index}) => {
    return (
        <div className="containerStyle">
            <div className="customTestCasesStyle">
                <h2>Custom Test Cases</h2>
                <div className="contentStyle">
                    <textarea className="textAreaStyle" placeholder="Enter your test cases here..."></textarea>
                </div>
            </div>
            <div className="outputStyle">
                <h2>Console Output</h2>
                <div className="contentStyle">
                    <div className="outputAreaStyle">// Your output will appear here...</div>
                </div>
            </div>
        </div>
    );
};

export default OutputPanel;
