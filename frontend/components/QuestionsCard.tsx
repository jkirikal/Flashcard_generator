const QuestionsCard = ({ flashcard, index }: { flashcard: flashcardType; index: number }) => {
  return (
    <div className="bg-white flex mb-4 rounded-[7px]">
      <h2 className="w-[30%] p-8">
        {index}. {flashcard.question}
      </h2>
      <p className="w-[70%] p-8">{flashcard.answer}</p>
    </div>
  )
}

export default QuestionsCard
