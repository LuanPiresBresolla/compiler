import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import './App.css';
import './code.css';

import { Lexica } from './analysis/Lexica';

function App() {
  const [code, setCode] = useState('');
  const [log, setLog] = useState('');

  function handleLexica() {
    const lexica = new Lexica();
    setLog(lexica.analysis(code));
  }

  return (
    <div className="app">
      <CodeMirror
        style={{ textAlign: 'left' }}
        value="console.log('hello world!');"        
        height="400px"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          // console.log('value:', value);
          setCode(value);
        }}
      />

      <div className="app content-buttons">
        <button type="button" onClick={handleLexica}>Analise Léxica</button>
        <button type="button">Analise Sintática</button>
        <button type="button">Analise Semântica</button>
      </div>

      <textarea
        readOnly
        value={log}
      />
    </div>
  );
}

export default App;
