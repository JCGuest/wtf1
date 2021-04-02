import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import axios from 'axios';

const Dictaphone = () => {
  const { transcript0, resetTranscript } = useSpeechRecognition();
  const [transcript, transcribe] = useState(
    'who won the 2005 Japanese grand prix'
  );
  const [result, setResult] = useState('');

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  function query() {
    const config = {
      headers: {
        'Contenet-Type': 'application/json'
      }
    };
    const body = { query: transcript };

    axios
      .post('http://localhost:5000/search', body, config)
      .then((json) => {
        // console.log(json.data.string);
        setResult(`${json.data.string}`);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <button onClick={() => query()}>Send</button>
      <p>{result}</p>
    </div>
  );
};
export default Dictaphone;
