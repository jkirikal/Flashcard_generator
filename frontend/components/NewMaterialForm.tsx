"use client"

import { useState } from "react"
import { ScaleLoader } from "react-spinners"
import { byteToMegabyte } from "@/utils/conversions"
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"

const supportedMaterialFileTypes = ["application/pdf"]
const supportedQuestionsFileTypes = ["text/plain"]
const supportedFileTypesShort = ["pdf"]
const supportedQuestionsFileTypesShort = ["txt"]
const maxFileSize_MB = 300

const data: flashcardType[] = [
  { question: "Miks on rakujagunemine eluoluline?", answer: "Rakkude jagunemine on organismile eluküsimus, kuna see tagab paljunemise, kasvu ja kudede uuenemise." },
  {
    question: "Mis võib juhtuda, kui raku jagunemise etapid ei kulge korrektselt?",
    answer: "Vigade korral jagunemisprotsessis tekivad vigased kromosoomid, mis võivad rakule surma või anomaaliaid põhjustada, näiteks kontrollimatu pooldumine vähkkasvaja puhul.",
  },
  { question: "Mis üldiselt toimub interfaasis?", answer: "Interfaasis toimub kõigi rakukomponentide sünteesimine, et tagada tekkivale tütarrakule kõik vajalik uue rakutsükli alustamiseks." },
  { question: "Milleks on rakutsüklis G1 ja G2 faas olulised?", answer: "G1 ja G2 faas annavad rakule vajaliku aja kasvamiseks ja muude rakukomponentide kordistamiseks." },
  {
    question: "Mis toimub G1 faasis?",
    answer: "G1 faasis akumuleerivad rakud kromosomaalse DNA ja sellega seotud valkude ehitusplokke ning koguvad piisavalt energiavarusid, et läbi viia tuumas iga kromosoomi replikatsioon.",
  },
  {
    question: "Mis toimub G2 faasis?",
    answer:
      "G2 faasis täiendab rakk oma energiavarusid ja sünteesib valke, mis on vajalikud kromosoomide liigutamiseks mitoosi käigus. Mõned rakuorganellid dubleeritakse ja tsütoskelett demonteeritakse.",
  },
  { question: "Millises rakutsükli faasis paljundatakse raku organelle?", answer: "Rakkude organellide paljunemine toimub kogu interfaasi vältel." },
  { question: "Milleks on S-faas oluline?", answer: "S-faasis tagab DNA replikatsioon identsete DNA molekulide paaride – õdekromatiidide – moodustumise." },
  { question: "Mis toimub S faasis?", answer: "S-faasis ehk DNA sünteesi faasis toimub kromosoomide duplitseerimine ehk DNA kahekordistumine." },
  {
    question: "Milleks on M-faas oluline?",
    answer: "M-faasis ehk mitootilises faasis toimub raku jagunemine, mille käigus dubleeritud kromosoomid joondatakse, eraldatakse ja jagatakse kahe uue, identse tütarraku vahel.",
  },
  { question: "Mis toimub üldiselt M-faasis?", answer: "M-faasis toimub tuuma jagunemine ja tsütoplasma jaotus kahe tütarraku vahel." },
  { question: "Kuidas nimetatakse mitoosi etappe?", answer: "Mitoosi etapid on profaas, prometafaas, metafaas, anafaas ja telofaas." },
  {
    question: "Milliseid muutusi on võimalik täheldada mitoosi erinevates etappides?",
    answer:
      "Mitoosi erinevates etappides on võimalik täheldada kromosoomide kondenseerumist ja lahutamist, tuumamembraani lagunemist ja uue tuumamembraani moodustumist, tsütoskeleti ümberkorraldust ja õdekromatiidide liikumist raku pooluste suunas.",
  },
  { question: "Mis saab mitoosi ajal tuumakesest?", answer: "Profaasis kaob tuumake, sest kondenseerunud kromatiinilt ei toimu enam RNA transkriptsiooni." },
  { question: "Mis saab mitoosi ajal rakutuumast?", answer: "Prometafaasis laguneb tuumamembraan fragmentideks. Uus tuumamembraan moodustub telofaasis." },
  { question: "Millised tsütoskeleti ümberkorraldusi tehakse mitoosi eel?", answer: "Mitoosi eel lagunevad tsütoplasmaatilised mikrotuubulid ja hakkab moodustuma mitoosikääv." },
  {
    question: "Kirjelda rakulisi protsesse profaasi ajal.",
    answer: "Profaasis kondenseerub kromatiin kompaktseteks kromosoomideks. Lagunevad tsütoplasmaatilised mikrotuubulid ja hakkab moodustuma mitoosikääv.",
  },
  {
    question: "Mis toimub prometafaasis?",
    answer: "Prometafaasis laguneb tuumamembraan fragmentideks, kääviniidid levivad üle rakuosa, kus enne oli tuum. Moodustuvad kinetohoorid, mille külge kinnituvad mikrotuubulid.",
  },
  {
    question: "Millest tuleneb metafaasis nähtavaks ilmunud kromosoomidele iseloomulik X tähe kuju?",
    answer: "Metafaasis on kromosoomid X tähe kujulised, sest õdekromatiidid on tsentromeeri abil ühendatud.",
  },
  {
    question: "Mis toimub prometafaasis?",
    answer: "Prometafaasis laguneb tuumamembraan fragmentideks, kääviniidid levivad üle rakuosa, kus enne oli tuum. Moodustuvad kinetohoorid, mille külge kinnituvad mikrotuubulid.",
  },
  {
    question: "Kuidas on mikrotuubulid organiseeritud mitoosi ajal?",
    answer: "Mitoosi ajal on mikrotuubulid organiseeritud mitoosikääviks, mis koosneb kolme tüüpi mikrotuubulist: kinetohoorsed mikrotuubulid, kattuvad mikrotuubulid ja astraalsed mikrotuubulid.",
  },
  { question: "Kirjelda anafaasis toimuvaid muutusi rakus.", answer: "Anafaasis alustavad õdekromatiidid liikumist pooluste suunas. Liikumise kiirus on ca 1 µm/min." },
  {
    question: "Kirjelda metafaasis toimuvaid muutusi rakus.",
    answer: "Metafaasis reastatakse kromosoomid kinetohoorsete mikrotuubulite abil ühele tasapinnale kahe pooluse vahel. Kromosoomid on valmis liikumiseks, nende kinetohoorid on aktiivsed.",
  },
  {
    question: "Kirjelda telofaasis toimuvaid muutusi rakus.",
    answer:
      "Telofaasis lahknevad õdekromatiidid (kromosoomid) jõuavad poolustele, kinetohoorsed mikrotuubulid kaovad. Tütartuumade ümber moodustub uus tuumaümbris. Kromatiin dekondenseerub, ilmuvad uuesti tuumakesed.",
  },
  {
    question: "Kirjelda tsütokineesis toimuvaid muutusi rakus.",
    answer:
      "Tsütokineesis toimub tsütoplasma jaotus kahe tütarraku vahel. Aktiinist ja müosiinist moodustub kontraktiilne struktuur – aktiini rõngas, mis paigutub raku keskele käävi teljega risti. See struktuur tekitab jõu, mis on vajalik plasmamembraani sissenöördumiseks.",
  },
  {
    question: "Kirjelda raku sissenöördumise protsessi.",
    answer: "Raku sissenöördumise protsessi käigus hakkab rakumembraan sissepoole voltuma, moodustades lünka, mis jagab raku lõpuks kaheks osaks.",
  },
  { question: "Millises faasi toimub tuumamembraani lagunemine?", answer: "Tuumamembraani lagunemine toimub prometafaasis." },
  { question: "Millisel kujul on tuumamembraan mitoosi ajal?", answer: "Mitoosi ajal on tuumamembraan fragmentide kujul." },
  {
    question: "Mis on kääviniidid?",
    answer: "Kääviniidid on mitoosi ajal moodustuvad valgulistest mikrotuubulist koosnevad struktuurid, mis aitavad kromosoomide õigesti jagada kahe tütarraku vahel.",
  },
  { question: "Millal algab mitoosikäävi moodustumine?", answer: "Mitoosikäävi moodustumine algab profaasis." },
  { question: "Millal duplitseeruvad tsentrosoomid?", answer: "Tsentrosoomid duplitseeruvad interfaasis, G2 faasi eel." },
  { question: "Millises mitoosi faasis reastatakse kromosoomid ühele tasapinnale kahe raku pooluse vahel?", answer: "Kromosoomid reastatakse ühele tasapinnale metafaasis." },
  { question: "Millises mitoosi faasis alustavad kromosoomid liikumist raku pooluste suunas?", answer: "Kromosoomid alustavad liikumist anafaasis." },
  { question: "Millises mitoosi faasis jõuavad kromosoomid raku poolustele?", answer: "Kromosoomid jõuavad poolustele telofaasis." },
]

async function uploadFile(materialFile: File, questionFile: File) {
  try {
    const formData = new FormData()
    formData.append("file1", materialFile)
    formData.append("file2", questionFile) // Append questionFile second

    const res = await fetch("http://13.49.229.251:8080/api/file/upload", {
      method: "POST",
      body: formData as any,
      headers: {},
    })
    if (!res.ok) throw new Error("Failed to upload file")
    const data = await res.json() // Assuming the response is JSON
    return data.q_a_pairs
  } catch (error) {
    console.error("Error uploading files:", error)
    return null
    //return null
  }
}

function verifyMaterialFile(file: File | undefined): { correct: boolean; error: string | null } {
  if (!file) return { correct: false, error: "file not found" }
  if (byteToMegabyte(file.size) > maxFileSize_MB) return { correct: false, error: "file size should not exceed " + maxFileSize_MB + " MB" }
  if (!supportedMaterialFileTypes.includes(file.type)) return { correct: false, error: "incorrect file type, supported file types are: " + supportedFileTypesShort.join(", ") }
  return { correct: true, error: null }
}
function verifyQuestionsFile(file: File | undefined): { correct: boolean; error: string | null } {
  if (!file) return { correct: false, error: "file not found" }
  if (byteToMegabyte(file.size) > maxFileSize_MB) return { correct: false, error: "file size should not exceed " + maxFileSize_MB + " MB" }
  if (!supportedQuestionsFileTypes.includes(file.type)) return { correct: false, error: "incorrect file type, supported file types are: " + supportedQuestionsFileTypesShort.join(", ") }
  return { correct: true, error: null }
}

const NewMaterialForm = ({ handleAddData }: { handleAddData: (newData: flashcardType[]) => void }) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [materialFile, setMaterialFile] = useState<File | undefined>()
  const [questionsFile, setQuestionsFile] = useState<File | undefined>()

  async function handleSubmit() {
    setLoading(true)
    const verifiedMaterial = verifyMaterialFile(materialFile)
    const verifiedQuestions = verifyQuestionsFile(questionsFile)
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
      <h3 className="font-semibold mb-3 flex items-center mt-10">
        {materialFile ? <FaCheckCircle className="text-emerald-400" size={20} /> : <FaRegCircle className="text-slate-300" size={20} />}{" "}
        <p className="ml-3 text-[1.1em]">Add file containing subject material</p>
      </h3>
      <input type="file" name="file" id="fileInput" className="text-[1.1em] mb-8 ml-8" onChange={handleMaterialFileAdd} accept=".pdf" />
      <h3 className="font-semibold mb-3 flex items-center">
        {questionsFile ? <FaCheckCircle className="text-emerald-400" size={20} /> : <FaRegCircle className="text-slate-300" size={20} />}{" "}
        <p className="ml-3 text-[1.1em]">Add file containing practise questions</p>
      </h3>
      <input type="file" name="file2" id="fileInput2" className="text-[1.1em] ml-8" onChange={handleQuestionsFileAdd} accept=".txt" />

      <section className="w-full flex justify-between items-center h-12 mt-12">
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
