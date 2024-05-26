"use client"

import { useState } from "react"
import { ScaleLoader } from "react-spinners"
import { byteToMegabyte } from "@/utils/conversions"

const supportedFileTypes = ["application/pdf"]
const supportedFileTypesShort = ["pdf"]
const maxFileSize_MB = 300

const data: flashcardType[] = [
  { question: "Question 1", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 2", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 3", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 4", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 5", answer: "Ansewerer sfg a sdf s" },
]

async function uploadFile(materialFile: File, questionFile: File) {
  try {
    const formData = new FormData()
    formData.append("file", materialFile)
    formData.append("file", questionFile) // Append questionFile second

    const res = await fetch("http://localhost:8080/api/file/upload", {
      method: "POST",
      body: formData as any,
      headers: {},
    })

    if (!res.ok) throw new Error("Failed to upload file")
    //const data = await res.json() // Assuming the response is JSON
    return data
  } catch (error) {
    console.error("Error uploading files:", error)
    return data
    //return null
  }
}

function verifyFile(file: File | undefined): { correct: boolean; error: string | null } {
  if (!file) return { correct: false, error: "file not found" }
  if (byteToMegabyte(file.size) > maxFileSize_MB) return { correct: false, error: "file size should not exceed " + maxFileSize_MB + " MB" }
  if (!supportedFileTypes.includes(file.type)) return { correct: false, error: "incorrect file type, supported file types are: " + supportedFileTypesShort.join(", ") }
  return { correct: true, error: null }
}

const NewMaterialForm = ({ handleAddData }: { handleAddData: (newData: flashcardType[]) => void }) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [materialFile, setMaterialFile] = useState<File | undefined>()
  const [questionsFile, setQuestionsFile] = useState<File | undefined>()

  async function handleSubmit() {
    setLoading(true)
    const verifiedMaterial = verifyFile(materialFile)
    const verifiedQuestions = verifyFile(questionsFile)
    if (verifiedMaterial.correct && verifiedQuestions) {
      const data = await uploadFile(materialFile!, questionsFile!) // verifyFile() checks if file is undefined
      if (data == null) setError("Error generating questions and answers")
      else handleAddData(data)
    } else setError(!verifiedMaterial.correct ? verifiedMaterial.error : verifiedQuestions.error)
    setLoading(false)
  }

  function handleMaterialFileAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files && e.target.files[0]
    if (!selectedFile) return
    setMaterialFile(selectedFile)
  }
  function handleQuestionsFileAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files && e.target.files[0]
    if (!selectedFile) return
    setQuestionsFile(selectedFile)
  }

  return (
    <>
      <h3 className="font-semibold mb-3">1. Add file containing subject material</h3>
      <input type="file" name="file" id="fileInput" className="text-[1.1em] mb-8" onChange={handleMaterialFileAdd} accept=".pdf" />
      <h3 className="font-semibold mb-3">2. Add file containing practise questions</h3>
      <input type="file" name="file2" id="fileInput2" className="text-[1.1em]" onChange={handleQuestionsFileAdd} accept=".pdf" />

      <section className="w-full flex justify-between items-center h-12 mt-2">
        {error ? <div className="text-[1.1em] font-semibold text-red-500">Error uploading file: {error}</div> : <div></div>} {/* empty div for flex placement */}
        <button
          disabled={loading || !materialFile || !questionsFile}
          className={
            "bg-emerald-300 px-10 py-3 font-semibold text-emerald-700 rounded-[50px] flex justify-center items-center h-full w-32 " +
            ((!materialFile || !questionsFile) && " bg-gray-100 text-slate-300")
          }
          onClick={handleSubmit}
        >
          {loading ? <ScaleLoader margin={1} height={15} color="#065f46" /> : "Submit"}
        </button>
      </section>
    </>
  )
}

export default NewMaterialForm
