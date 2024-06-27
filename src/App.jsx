
import React, { useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';
import useClipboard from "react-use-clipboard";

function App() {
  const [TextToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(TextToCopy);
  const [copy_btn_text, setcopy_btn_text] = useState('copy');
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser does not support speech recognition.</div>;
  }
  const handleClear = () => {
    resetTranscript();
    SpeechRecognition.stopListening();
    setTextToCopy(''); 
    setcopy_btn_text("copy");
  };
  const handleCopy = () => {
    setTextToCopy(transcript);
    setcopy_btn_text("copied");
    setCopied();
  };
  const handleListen=()=>{
    startListening();
    setcopy_btn_text("copy");
  }
  return (
    <div className="container">
      <h2>WRITE A NEW NOTE</h2>
      <br />
      <h3>(*please double tap to copy*)</h3>
      <br/>
      <div className="main-content" onClick={() => setTextToCopy(transcript)}>{transcript}</div>
      <div className="btn-style">
        <button onClick={handleCopy}>
          {copy_btn_text}
        </button>
        <button onClick={handleListen}>start listening</button>
        <button onClick={SpeechRecognition.stopListening}>stop listening</button>
        <button onClick={handleClear}>clear</button>
      </div>
    </div>
  );
}

export default App;
