"use client"

import { useRef, useState } from "react"

interface AudioButtonProps {
  src: string
}

const AudioButton: React.FC<AudioButtonProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState<boolean>(false)

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlaying(false)
    }
  }

  return (
    <div>
      <button onClick={() => (playing ? stopAudio() : playAudio())} className="bg-blue-300 px-6 py-4">
        {playing ? "Stop" : "Play"}
      </button>
      <audio ref={audioRef} src={"/example_bossa_nova.ogg"} />
    </div>
  )
}

export default AudioButton
