const QuestionsCard = ({ flashcard, index }: { flashcard: flashcardType; index: number }) => {
  return (
    <div className="bg-white md:flex mb-3 rounded-[4px] shadow2">
      <h2 className="md:w-[30%] p-7">
        {index}. {flashcard.question}
      </h2>
      <p className="md:w-[70%] pl-7 pb-8 md:p-7">{flashcard.answer}</p>
    </div>
  )
}

export default QuestionsCard
