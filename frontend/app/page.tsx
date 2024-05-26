"use client"

import NewMaterialForm from "@/components/NewMaterialForm"
import Flashcards from "@/components/Flashcards"
import { useState } from "react"
import { IoReloadCircle } from "react-icons/io5"

const demoData: flashcardType[] = [
  { question: "Question 1", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 2", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 3", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 4", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 5", answer: "Ansewerer sfg a sdf s" },
]

export default function Home() {
  const [flashcardData, setFlashcardData] = useState<flashcardType[] | null>(null)

  const handleAddData = (newData: flashcardType[]) => {
    setFlashcardData(newData)
  }

  return (
    <main className="w-[95%] m-auto sm:w-[70%] max-w-[800px] mt-16 mb-48">
      {flashcardData == null ? (
        <div className="bg-white rounded-2xl p-8">
          <div className="flex w-full justify-between mb-6">
            <h1 className="font-semibold text-[1.3em]">Upload Files</h1>
            <button className="py-2 px-6 bg-indigo-400 text-white font-semibold text-[0.8em] rounded-[50px]" onClick={() => setFlashcardData(demoData)}>
              Try Demo
            </button>
          </div>
          <p className="text-[0.95em] ">Please upload two files. The first file should contain the subject material and the second file should include the practise questions.</p>
          <p className="mt-3 text-[0.95em] ">
            The maximum file size is <span className="font-bold">300 MB</span>. The material file type should be <span className="font-bold">.pdf</span> and the questions file type should be{" "}
            <span className="font-bold">.txt</span>.{" "}
          </p>
          <NewMaterialForm handleAddData={handleAddData} />
        </div>
      ) : (
        <>
          <div className="font-medium  mb-8 flex items-center cursor-pointer text-indigo-500 hover:text-indigo-300" onClick={() => setFlashcardData(null)}>
            Choose new files <IoReloadCircle size={24} className="ml-2" />
          </div>
          <Flashcards data={flashcardData} />
        </>
      )}
    </main>
  )
}
