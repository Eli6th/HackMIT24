import { MicrophoneIcon, StopIcon } from '@heroicons/react/outline';
import React, {useState, useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (opts: {
  onChange: (text: string) => void;
}) => {

  const { onChange } = opts;
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  

  const [recording, setRecording] = useState(false);

  let transcribedText = '';

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  useEffect(() => {
    if (recording && !listening) {
      setTimeout(() => {
        SpeechRecognition.startListening();
        transcribedText += transcript;
        onChange(transcribedText);
      }, 1000); // small delay before restarting
    }
  }, [listening, recording]);


  return (
    <div
      className='flex flex-col items-center justify-center'
    >

      {
        recording ? (
          <StopIcon
              className="h-16 w-16 text-red-600 hover:text-red-800 cursor-pointer"
              onClick={() => {
                SpeechRecognition.stopListening()
                setRecording(false)
              }}
            /> 
        ) : (
          <MicrophoneIcon
            className="h-16 w-16 text-red-600 hover:text-red-800 cursor-pointer"
            onClick={() => {
            SpeechRecognition.startListening()
            setRecording(true)
        }}
        />
          )
      }            
      <div 
      className="mt-5 p-2 text-center bg-slate-600 rounded-md text-white" 
      >
        <p>{transcript}</p>
      </div>
    </div>
  );
};
export default Dictaphone;
