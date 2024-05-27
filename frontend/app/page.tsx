"use client"

import NewMaterialForm from "@/components/NewMaterialForm"
import Flashcards from "@/components/Flashcards"
import { useState } from "react"
import { IoReloadCircle } from "react-icons/io5"

const dataData: flashcardType[] = [
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
