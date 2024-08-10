import React from 'react'

const MonacoEditor = () => {
    return (
        <>
            <div className="top-bar">
                <div className="filename">{filename}</div>
                <div className="controls">
                    <Dropdown options={themeOptions} value={theme} onChange={handleThemeChange} />
                    <Dropdown options={languageOptions} value={language} onChange={handleLanguageChange} />
                    <Dropdown options={fontSizeOptions} value={fontSize} onChange={handleFontSizeChange} />
                </div>
            </div>

            <div className={`editor-section ${outputVisible ? 'with-output' : ''}`}>
                <MonacoEditor
                    height="50vh"
                    width="100%"
                    theme={theme}
                    language={language}
                    value="// Start coding here!"
                    options={{ fontSize }}
                />
            </div>

            <div className="bottom-bar">
                <div className="bottom-bar-left">
                    <button onClick={toggleOutput}>
                        {outputVisible ? 'Hide Output' : 'Show Output'}
                    </button>
                </div>
                <div className="bottom-bar-right">
                    <button onClick={() => alert('Run code')}>Run</button>
                    <button onClick={() => alert('Submit code')}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default MonacoEditor;