import AudioButton from "@/components/AudioButton"
import MicrophoneRecorder from "@/components/MicrophoneRecorder"
import NewMaterialForm from "@/components/NewMaterialForm"
import Image from "next/image"

export default function Home() {
  return (
    <main>
      <h1>Lisa Fail</h1>
      <NewMaterialForm />
      <AudioButton src="/frontend/public/example_bossa_nova.ogg" />
      <MicrophoneRecorder />
    </main>
  )
}
