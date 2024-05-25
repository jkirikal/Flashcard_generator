import QuestionsCard from "./QuestionsCard"

const Questions = ({ data }: { data: flashcardType[] }) => {
  return (
    <div>
      {data.map((flashcard, index) => (
        <QuestionsCard key={index} flashcard={flashcard} index={index + 1} />
      ))}
    </div>
  )
}

export default Questions
