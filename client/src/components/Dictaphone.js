import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import axios from 'axios';

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  // const [transcript, transcribe] = useState(
  //   'who won the 2019 austrian grand prix'
  // );
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
    let body = { query: transcript };

    axios
      .post('http://localhost:5000/search', body, config)
      .then((json) => {
        return json.data;
      })
      .then((answer) => setResult(answer))
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
