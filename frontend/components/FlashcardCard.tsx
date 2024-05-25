import { useState } from "react"
import AudioButton from "./AudioButton"
import MicrophoneRecorder from "./MicrophoneRecorder"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const FlashcardCard = ({ flashcard, index }: { flashcard: flashcardType; index: number }) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="rounded-2xl bg-white">
      <div className="h-16 pt-4 flex items-center justify-between pl-8 pr-6">
        <div className="font-semibold text-[1.1em]">
          {revealed ? "Answer for question " : "Question "} {index}:{" "}
        </div>
        <div className="flex items-center">
          {revealed ? (
            <FaEyeSlash className="mr-4 text-slate-700 cursor-pointer" onClick={() => setRevealed(false)} size={24} />
          ) : (
            <FaEye className="mr-4 text-slate-700 cursor-pointer" onClick={() => setRevealed(true)} size={24} />
          )}
          <AudioButton src="/frontend/public/example_bossa_nova.ogg" />
        </div>
      </div>
      <div onClick={() => setRevealed(!revealed)} className="bg-white pb-24 pt-8 w-full mb-4 px-8 cursor-pointer rounded-2xl min-h-[17em] flex items-center justify-center">
        {revealed ? flashcard.answer : flashcard.question}
      </div>
    </div>
  )
}

export default FlashcardCard
