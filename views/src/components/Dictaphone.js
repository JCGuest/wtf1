import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import axios from 'axios';
import TextArea from './TextArea';
import Result from './Result';

// switch host variable according to environment
let host = '';

process.env.NODE_ENV == 'development'
  ? (host = 'http://localhost:5000/search')
  : (host = '/search');

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [result, setResult] = useState('');
  const [textBox, setBox] = useState(true);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  // remove text box and start microphone
  function startListening() {
    setBox(false);
    setResult('');
    SpeechRecognition.startListening();
  }

  function sendQuery() {
    const config = {
      headers: {
        'Contenet-Type': 'application/json'
      }
    };
    const textInput = document.querySelector('#root > div > div > textarea');
    const body = { query: transcript ? transcript : textInput.value };

    axios
      .post(host, body, config)
      .then((json) => {
        return json.data;
      })
      .then((queryResult) => setResult(queryResult))
      .catch((err) => console.error(err));
  }

  // bring text box back and reset transcript
  function resetResult() {
    resetTranscript();
    setResult('');
    setBox(true);
  }

  return (
    <div className='search'>
      <div className='checkered'></div>
      <h1>
        <em>What the F1? Race and Championship Results Bot</em>
      </h1>
      <div className='button-div'>
        <button className='btn' onClick={startListening}>
          Start
        </button>
        <button className='btn' onClick={() => sendQuery()}>
          Send
        </button>
        <button className='btn' onClick={resetResult}>
          Reset
        </button>
        <h3>
          <em>Enter your question or click Start</em>
        </h3>
      </div>
      {textBox ? <TextArea /> : null}
      {transcript ? <p className='transcript-p'>{transcript + '?'}</p> : null}
      {result ? <Result result={result} /> : null}
      <div className='checkered'></div>
    </div>
  );
};
export default Dictaphone;
