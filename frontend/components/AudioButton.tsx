"use client"

import { useEffect, useRef, useState } from "react"
import { FaPlay, FaSquareFull } from "react-icons/fa6"
import { ScaleLoader } from "react-spinners"

interface AudioButtonProps {
  text: string
}

const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState<boolean>(false)
  const [audioSrc, setAudioSrc] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setLoading(false)
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

  const fetchAudio = async () => {
    setLoading(true)
    const payload = { text: text, speaker: "Albert" }
    const headers = { "Content-Type": "application/json" }
    try {
      const response = await fetch("https://api.tartunlp.ai/text-to-speech/v2", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      })
      const data = await response.arrayBuffer()
      const audioBlob = new Blob([data], { type: "audio/ogg" })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioSrc(audioUrl)
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        playAudio()
      }
    } catch (error) {
      console.error("Error fetching audio:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    const audioElement = audioRef.current
    const handleEnded = () => setPlaying(false)

    if (audioElement) audioElement.addEventListener("ended", handleEnded)

    return () => {
      if (audioElement) audioElement.removeEventListener("ended", handleEnded)
    }
  }, [])

  return (
    <div>
      <button onClick={() => (playing ? stopAudio() : fetchAudio())} className="bg-indigo-400 h-12 w-12 flex justify-center items-center rounded-[50px]">
        {playing ? <FaSquareFull className="text-white" size={12} /> : loading ? <ScaleLoader color="white" height={15} width={3} margin={1} /> : <FaPlay className="text-white ml-1" />}
      </button>
      <audio ref={audioRef} src={"/example_bossa_nova.ogg"} />
    </div>
  )
}

export default AudioButton
