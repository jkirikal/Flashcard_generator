"use client"

import { useEffect, useState } from "react"
import Questions from "./Questions"
import FlashcardCard from "./FlashcardCard"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"

const Flashcards = ({ data }: { data: flashcardType[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selected, setSelected] = useState<flashcardType>(data[selectedIndex])
  const [questionsRevealed, setQuestionsRevealed] = useState(false)

  useEffect(() => {
    setSelected(data[selectedIndex])
  }, [selectedIndex, data])

  return (
    <>
      <FlashcardCard flashcard={selected} index={selectedIndex + 1} />
      <div className="justify-center flex text-[1.3em] items-center mb-20">
        <FaCircleChevronLeft
          className={selectedIndex > 0 ? " cursor-pointer text-indigo-400 hover:text-indigo-300" : " text-indigo-100"}
          size={36}
          onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
        />
        <p className="mx-6 w-8 flex justify-center font-medium unselectable">
          {selectedIndex + 1}/{data.length}
        </p>
        <FaCircleChevronRight
          className={selectedIndex < data.length - 1 ? " cursor-pointer text-indigo-400 hover:text-indigo-300" : "text-indigo-100"}
          size={36}
          onClick={() => setSelectedIndex(Math.min(data.length - 1, selectedIndex + 1))}
        />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="mb-8 font-semibold text-[1.3rem]">Questions and Answers:</h2>
        <button className="bg-indigo-400 text-white w-24 py-2 rounded-[50px] text-[0.9em] font-semibold hover:bg-indigo-300 mb-8" onClick={() => setQuestionsRevealed(!questionsRevealed)}>
          {questionsRevealed ? "Hide" : "Reveal"}
        </button>
      </div>
      {questionsRevealed && <Questions data={data} />}
    </>
  )
}

export default Flashcards
