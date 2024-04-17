import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';
import axios from 'axios'

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    const [output, setOutput] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    async function runcpp(code){

        const options = {
        method: 'POST',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '09c66274c4msh5d6a443d46f7ecbp130abcjsn53e5c3e75a18',
            'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        },
        data: {
            language: 'cpp17',
            version: 'latest',
            code: code,
            input: null
        }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function init() {
            if (editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current = null;
            }
        
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: selectedLanguage },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );
        
            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }
        
        init();
    }, [selectedLanguage]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    const handleRun = async () => {
        try {
            const code = editorRef.current.getValue();
            let result;
            if (selectedLanguage === 'javascript') {
                result = eval(code);
            } else {
                const response = await runcpp(code);
                result = `CPU Time: ${response.cpuTime}ms, Memory: ${response.memory} bytes, Output: ${response.output}`;
            }
            setOutput(result);
        } catch (error) {
            setOutput(error.toString());
        }
    };
    
    

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <div>
            <select className='selectLanguage' value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="javascript">JavaScript</option>
                <option value="text/x-c++src">C++</option>
            </select>
            <br />
            <textarea id="realtimeEditor"></textarea>
            <br />
            <button className="btn runBtn" onClick={handleRun}>Run</button>
            <div className='output' >{output}</div>
        </div>
    );
};

export default Editor;
