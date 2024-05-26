"use client"

import NewMaterialForm from "@/components/NewMaterialForm"
import Flashcards from "@/components/Flashcards"
import { useState } from "react"
import { IoReloadCircle } from "react-icons/io5"

export default function Home() {
  const [flashcardData, setFlashcardData] = useState<flashcardType[] | null>(null)

  const handleAddData = (newData: flashcardType[]) => {
    setFlashcardData(newData)
  }

  return (
    <main className="w-[95%] m-auto sm:w-[70%] max-w-[800px] mt-16 mb-48">
      {flashcardData == null ? (
        <div className="bg-white rounded-2xl p-8">
          <h1 className="font-semibold text-[1.3em]">Add File Containing Materials</h1>
          <NewMaterialForm handleAddData={handleAddData} />
        </div>
      ) : (
        <>
          <div className="font-medium underline mb-8 flex items-center cursor-pointer" onClick={() => setFlashcardData(null)}>
            Choose new file <IoReloadCircle size={24} className="ml-2" />
          </div>
          <Flashcards data={flashcardData} />
        </>
      )}
    </main>
  )
}
