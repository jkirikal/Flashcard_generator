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

async function uploadFile(file: File) {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("http://localhost:8080/api/file/upload", {
      method: "POST",
      body: formData as any,
      headers: {},
    })

    if (!res.ok) throw new Error("Failed to upload file")
    return data
  } catch (error) {
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
  const [file, setFile] = useState<File | undefined>()

  async function handleSubmit() {
    setLoading(true)
    const verified = verifyFile(file)
    if (verified.correct) {
      const data = await uploadFile(file!) // verifyFile() checks if file is undefined
      if (data == null) setError("Error generating questions and answers")
      else handleAddData(data)
      // server side checks -> display error
    } else setError(verified.error)
    setLoading(false)
  }

  function handleFileAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files && e.target.files[0]
    if (!selectedFile) return
    setFile(selectedFile)
  }

  return (
    <>
      <input type="file" name="file" id="fileInput" className="mt-8 text-[1.1em]" onChange={handleFileAdd} accept=".pdf" />

      <section className="w-full flex justify-between items-center h-12 ">
        {error ? <div className="text-[1.1em] font-semibold text-red-500">Error uploading file: {error}</div> : <div></div>} {/* empty div for flex placement */}
        <button
          disabled={loading || !file}
          className={"bg-emerald-300 px-10 py-3 font-semibold text-emerald-700 rounded-[50px] flex justify-center items-center h-full w-32 " + (!file && " bg-gray-100 text-slate-300")}
          onClick={handleSubmit}
        >
          {loading ? <ScaleLoader margin={1} height={15} color="#065f46" /> : "Submit"}
        </button>
      </section>
    </>
  )
}

export default NewMaterialForm
