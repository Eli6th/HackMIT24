import { MicrophoneIcon, StopIcon } from '@heroicons/react/outline';
import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [recording, setRecording] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (recording && !listening) {
    setTimeout(() => {
      SpeechRecognition.startListening();
    }, 500);
  }


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
        <p>{transcript.split(' ').slice(-10).join(' ')}</p>
      </div>
    </div>
  );
};
export default Dictaphone;
