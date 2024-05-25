import AudioButton from "@/components/AudioButton"
import MicrophoneRecorder from "@/components/MicrophoneRecorder"
import NewMaterialForm from "@/components/NewMaterialForm"
import Flashcards from "@/components/Flashcards"

const data: flashcardType[] = [
  { question: "Question 1", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 2", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 3", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 4", answer: "Ansewerer sfg a sdf s" },
  { question: "Question 5", answer: "Ansewerer sfg a sdf s" },
]

export default function Home() {
  return (
    <main className="w-[95%] m-auto sm:w-[70%] max-w-[800px]">
      <h1>Lisa Fail</h1>
      <NewMaterialForm />
      <Flashcards data={data} />
    </main>
  )
}
