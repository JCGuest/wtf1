import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import axios from 'axios';

const Dictaphone = () => {
  // const { transcript, resetTranscript } = useSpeechRecognition();
  const [transcript, resetTranscript] = useState(
    'who won the 2021 austrian grand prix'
  );
  const [result, setResult] = useState('');

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  function sendQuery() {
    const config = {
      headers: {
        'Contenet-Type': 'application/json'
      }
    };
    let body = { query: transcript };

    axios
      .post('http://localhost:5000/search', body, config)
      .then((json) => {
        return json.data;
      })
      .then((queryResult) => setResult(queryResult))
      .catch((err) => console.error(err));
  }

  function resetResult() {
    resetTranscript();
    setResult('');
  }

  return (
    <div className='main'>
      <div>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetResult}>Reset</button>
      </div>

      <p>{transcript}</p>
      <button onClick={() => sendQuery()}>Send</button>
      <p>{result}</p>
    </div>
  );
};
export default Dictaphone;
