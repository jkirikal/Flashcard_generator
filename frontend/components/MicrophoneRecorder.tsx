"use client"

import { useState, useEffect, useRef } from "react"
import { FaMicrophone } from "react-icons/fa6"

const MicrophoneRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [audioURL, setAudioURL] = useState<string>("")
  const [transcription, setTranscription] = useState<string>("")
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream)
          mediaRecorderRef.current = mediaRecorder

          mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data)
          }

          mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
            const audioUrl = URL.createObjectURL(audioBlob)
            setAudioURL(audioUrl)
            audioChunksRef.current = []

            // Send audio blog to server for speech recognition
            const formData = new FormData()
            formData.append("file", audioBlob, "recording.wav")
            try {
              const response = await fetch("http://localhost:8080/api/recognize", {
                method: "POST",
                body: formData,
              })

              if (response.ok) {
                const result = await response.json()
                setTranscription(result.text)
              } else console.error("Failed to recognize speech")
            } catch (error) {
              console.error("Error during speech recognition:", error)
            }
          }

          mediaRecorder.start()
        })
        .catch((err) => {
          console.error("Error accessing the microphone: ", err)
        })
    } else {
      mediaRecorderRef.current?.stop()
    }
  }, [isRecording])

  const handleRecordClick = () => {
    setIsRecording(true)
  }

  const handleStopClick = () => {
    setIsRecording(false)
  }

  return (
    <div>
      <button onClick={isRecording ? handleStopClick : handleRecordClick} className={"h-16 w-16  flex items-center justify-center rounded-[50px] " + (isRecording ? " bg-red-200" : " bg-slate-200")}>
        {isRecording ? <FaMicrophone color="red" size={20} /> : <FaMicrophone color="#475569" size={20} />}
      </button>
      {audioURL && <audio src={audioURL} controls />}
      {transcription && <p>Transcription: {transcription}</p>}
    </div>
  )
}

export default MicrophoneRecorder
