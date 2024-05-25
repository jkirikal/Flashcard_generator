"use client"

import { useEffect, useState } from "react"
import Questions from "./Questions"
import FlashcardCard from "./FlashcardCard"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"

const Flashcards = ({ data }: { data: flashcardType[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selected, setSelected] = useState<flashcardType>(data[selectedIndex])
  useEffect(() => {
    setSelected(data[selectedIndex])
  }, [selectedIndex, data])

  return (
    <>
      <FlashcardCard flashcard={selected} index={selectedIndex + 1} />
      <div className="justify-center flex text-[1.3em] items-center mb-20">
        <FaCircleChevronLeft className={selectedIndex > 0 ? " cursor-pointer text-[#7789bf]" : " text-[#bcc6e8]"} size={36} onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))} />
        <p className="mx-6 w-8 flex justify-center font-medium">
          {selectedIndex + 1}/{data.length}
        </p>
        <FaCircleChevronRight
          className={selectedIndex < data.length - 1 ? " cursor-pointer text-[#7789bf]" : "text-[#bcc6e8]"}
          size={36}
          onClick={() => setSelectedIndex(Math.min(data.length - 1, selectedIndex + 1))}
        />
      </div>
      <h2 className="mb-8 font-semibold text-[1.3rem]">Questions and Answers:</h2>
      <Questions data={data} />
    </>
  )
}

export default Flashcards
