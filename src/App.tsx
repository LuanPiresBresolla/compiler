import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Switch from "react-switch";

import './App.css';
import './code.css';

import { Lexica } from './analysis/Lexica';

function App() {
  const [code, setCode] = useState('');
  const [log, setLog] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  function handleLexica() {
    const lexica = new Lexica();
    setLog(lexica.analysis(code));
  }

  function handleSetTheme() {
    setTheme(state => state === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="app">
      <CodeMirror
        style={{ textAlign: 'left' }}
        value="console.log('hello world!');"        
        height="400px"
        theme={theme}
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          // console.log('value:', value);
          setCode(value);
        }}
      />

      <div className="app content-buttons">
        <Switch onChange={handleSetTheme} checked={theme === 'dark'} />
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
