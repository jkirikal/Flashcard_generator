"use client"

import { useRef, useState } from "react"
import { FaPlay, FaSquareFull } from "react-icons/fa6"

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
      <button onClick={() => (playing ? stopAudio() : playAudio())} className="bg-indigo-400 h-12 w-12 flex justify-center items-center rounded-[50px]">
        {playing ? <FaSquareFull className="text-white" size={12} /> : <FaPlay className="text-white ml-1" />}
      </button>
      <audio ref={audioRef} src={"/example_bossa_nova.ogg"} />
    </div>
  )
}

export default AudioButton
