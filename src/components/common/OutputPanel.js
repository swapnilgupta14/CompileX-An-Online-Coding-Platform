const OutputPanel = () => {
    return (
        <div className="containerStyle">
            <div className="customTestCasesStyle" >
                <h2>Custom Test Cases</h2>
                <div className="contentStyle">
                    <p>Enter Test Cases</p>
                </div>
            </div>
            <div className="outputStyle" >
                <h2>Console Output</h2>
                <div className="contentStyle">
                    <p>// Your output will appear here...</p>
                </div>
            </div>
        </div>
    );
};

export default OutputPanel;