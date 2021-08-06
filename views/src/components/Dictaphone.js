import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import axios from 'axios';

// switch host variable according to environment
let host = '';

process.env.NODE_ENV == 'development'
  ? (host = 'http://localhost:5000/search')
  : (host = '/search');

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  // const transcript = 'who was second place 1994 italian';
  const [result, setResult] = useState('');

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  // remove text box and start microphone
  function startListening() {
    const textInput = document.querySelector('#root > div > div > textarea');
    textInput.style.display = 'none';
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
    const textInput = document.querySelector('#root > div > div > textarea');
    textInput.style.display = 'inline';
    textInput.value = '';
  }

  return (
    <div className='search'>
      <div className='checkered'></div>
      <h1>What the F1? Race Results Bot</h1>
      <div className='button-div'>
        <button onClick={startListening}>Start</button>
        <button onClick={() => sendQuery()}>Send</button>
        <button onClick={resetResult}>Reset</button>
      </div>
      <textarea
        className='text-input'
        placeholder='click here to type or click Start to record'
      ></textarea>
      <p>{transcript ? transcript + '?' : ''}</p>
      <p>{result ? 'Answer: ' + result : ''}</p>
      <div className='checkered'></div>
    </div>
  );
};
export default Dictaphone;
