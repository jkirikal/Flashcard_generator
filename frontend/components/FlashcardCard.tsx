import { useEffect, useState } from "react"
import AudioButton from "./AudioButton"
import MicrophoneRecorder from "./MicrophoneRecorder"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const FlashcardCard = ({ flashcard, index }: { flashcard: flashcardType; index: number }) => {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setRevealed(false)
  }, [flashcard])

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
          <AudioButton text={revealed ? flashcard.answer : flashcard.question} />
        </div>
      </div>
      <div
        onClick={() => setRevealed(!revealed)}
        className="unselectable bg-white pb-20 pt-5 w-full mb-8 px-8 cursor-pointer rounded-2xl min-h-[15em] flex items-center justify-center lg:text-[1.2em]"
      >
        {revealed ? flashcard.answer : flashcard.question}
      </div>
    </div>
  )
}

export default FlashcardCard
