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
  const [result, setResult] = useState();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  function query() {
    // debugger;
    axios
      .post(
        'http://localhost:5000/search',
        {
          query: transcript
        },
        { withCredentials: true }
      )
      .then((json) => {
        setResult(json.data.result);
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
